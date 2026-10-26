import { CdklabsConstructLibrary } from 'cdklabs-projen-project-types';
import { Gitpod, DevEnvironmentDockerImage, ReleasableCommits, javascript } from 'projen';
import { JobPermission } from 'projen/lib/github/workflows-model';
import { WorkflowNoDockerPatch } from './projenrc/workflow-no-docker-patch';

// the version of k8s this branch supports
const SPEC_VERSION = '36';
const releaseWorkflowName = `release-kubectl-v${SPEC_VERSION}`;
const defaultReleaseBranchName = `kubectl-v${SPEC_VERSION}/main`;

// v20 must be support because aws-cdk-lib depends on it
const V20_BRANCH_MUST_BE_SUPPORTED = 'kubectl-v20/main';
const CURRENT_BRANCH = `kubectl-v${SPEC_VERSION}/main`;

// Define supported branches for reuse across the configuration
const SUPPORTED_BRANCHES = [
  V20_BRANCH_MUST_BE_SUPPORTED,
  CURRENT_BRANCH,
  `kubectl-v${Number(SPEC_VERSION)-1}/main`,
  `kubectl-v${Number(SPEC_VERSION)-2}/main`,
];

// Get backport target branches (supported branches excluding v20 and current version)
const BACKPORT_TARGET_BRANCHES = SUPPORTED_BRANCHES
  .filter(branch => !(branch == V20_BRANCH_MUST_BE_SUPPORTED || branch === CURRENT_BRANCH));

const project = new CdklabsConstructLibrary({
  projenrcTs: true,
  author: 'Amazon Web Services',
  authorAddress: 'aws-cdk-dev@amazon.com',
  cdkVersion: '2.224.0',
  name: `@aws-cdk/lambda-layer-kubectl-v${SPEC_VERSION}`,
  packageName: `@aws-cdk/lambda-layer-kubectl-v${SPEC_VERSION}`,
  description: `A Lambda Layer that contains kubectl v1.${SPEC_VERSION}`,
  repositoryUrl: 'https://github.com/cdklabs/awscdk-asset-kubectl.git',
  homepage: 'https://github.com/cdklabs/awscdk-asset-kubectl#readme',
  private: false,
  setNodeEngineVersion: false,
  npmAccess: javascript.NpmAccess.PUBLIC,
  autoApproveOptions: {
    allowedUsernames: ['aws-cdk-automation', 'mergify[bot]'],
    secret: 'GITHUB_TOKEN',
  },
  autoApproveUpgrades: true,
  // We support the last 3 minor versions just like Kubernetes
  // We also need to keep supporting v20 since it is a hard dependency of aws-cdk-lib
  depsUpgradeOptions: {
    workflowOptions: {
      branches: SUPPORTED_BRANCHES,
      labels: ['auto-approve'],
    },
  },
  majorVersion: 2,
  releaseTagPrefix: `kubectl-v${SPEC_VERSION}`,
  releaseWorkflowName: releaseWorkflowName,
  // If we don't do this we release the devDependency updates that happen every day, which blows out
  // our PyPI storage budget even though there aren't any functional changes.
  releasableCommits: ReleasableCommits.featuresAndFixes(),
  defaultReleaseBranch: defaultReleaseBranchName,
  publishToPypi: {
    distName: `aws-cdk.lambda-layer-kubectl-v${SPEC_VERSION}`,
    module: `aws_cdk.lambda_layer_kubectl_v${SPEC_VERSION}`,
  },
  publishToMaven: {
    javaPackage: `software.amazon.awscdk.cdk.lambdalayer.kubectl.v${SPEC_VERSION}`,
    mavenGroupId: 'software.amazon.awscdk',
    mavenArtifactId: `cdk-lambda-layer-kubectl-v${SPEC_VERSION}`,
    mavenServerId: 'central-ossrh',
  },
  publishToNuget: {
    dotNetNamespace: `Amazon.CDK.LambdaLayer.KubectlV${SPEC_VERSION}`,
    packageId: `Amazon.CDK.LambdaLayer.KubectlV${SPEC_VERSION}`,
    trustedPublishing: false,
  },
  publishToGo: {
    moduleName: 'github.com/cdklabs/awscdk-kubectl-go',
    packageName: `kubectlv${SPEC_VERSION}`,
    gitBranch: `kubectl.${SPEC_VERSION}`,
    gitUserName: 'AWS CDK Team',
    gitUserEmail: 'aws-cdk@amazon.com',
    githubTokenSecret: 'PROJEN_GITHUB_TOKEN',
  },
  githubOptions: {
    mergifyOptions: {
      rules: [{
        name: 'backport patches to supported branches',
        conditions: [
          'label=backport-to-supported-branches',
          `base=${CURRENT_BRANCH}`, // Current version branch
        ],
        actions: {
          backport: {
            branches: BACKPORT_TARGET_BRANCHES,
            labels: ['auto-approve'],
          },
        },
      }],
    },
  },
});

// Daily check that each supported branch bundles the newest kubectl patch and a
// helm release that supports it. Opens one pull request per branch that is behind.
// Scheduled workflows only run on the default branch, so the newest branch drives
// the check for every supported branch.
const updateToolVersions = project.github?.addWorkflow('update-tool-versions');
updateToolVersions?.on({
  schedule: [{ cron: '0 6 * * *' }],
  workflowDispatch: {},
});
updateToolVersions?.addJobs({
  update: {
    name: 'Update kubectl and helm on ${{ matrix.branch }}',
    runsOn: ['ubuntu-latest'],
    permissions: { contents: JobPermission.READ },
    strategy: {
      failFast: false,
      matrix: {
        domain: {
          branch: SUPPORTED_BRANCHES.filter(branch => branch !== V20_BRANCH_MUST_BE_SUPPORTED),
        },
      },
    },
    steps: [
      {
        name: 'Checkout target branch',
        uses: 'actions/checkout@v5',
        with: { ref: '${{ matrix.branch }}' },
      },
      {
        // Use the script from the default branch so every supported branch is
        // checked with the same logic, including branches that predate the script.
        name: 'Checkout update script',
        uses: 'actions/checkout@v5',
        with: {
          'ref': '${{ github.event.repository.default_branch }}',
          'path': '.update-tool-versions',
          'sparse-checkout': 'scripts/update-tool-versions.sh',
          'sparse-checkout-cone-mode': false,
        },
      },
      {
        name: 'Find newest kubectl and helm',
        id: 'versions',
        run: './.update-tool-versions/scripts/update-tool-versions.sh && rm -rf .update-tool-versions',
        env: { GH_TOKEN: '${{ github.token }}' },
      },
      {
        name: 'Setup Node.js',
        if: "steps.versions.outputs.changed == 'true'",
        uses: 'actions/setup-node@v5',
        with: { 'node-version': 'lts/*' },
      },
      {
        name: 'Install dependencies',
        if: "steps.versions.outputs.changed == 'true'",
        run: 'yarn install --check-files --frozen-lockfile',
      },
      {
        // Builds the layer with the new binaries and updates the integ snapshot,
        // whose asset hash comes from the Dockerfile.
        name: 'Build layer and update snapshot',
        if: "steps.versions.outputs.changed == 'true'",
        run: 'npx projen compile && npx projen integ:kubectl-layer:snapshot',
      },
      {
        name: 'Create Pull Request',
        if: "steps.versions.outputs.changed == 'true'",
        uses: 'peter-evans/create-pull-request@v7',
        with: {
          'token': '${{ secrets.PROJEN_GITHUB_TOKEN }}',
          'base': '${{ matrix.branch }}',
          'branch': 'github-actions/update-tool-versions/${{ matrix.branch }}',
          'add-paths': [
            'layer/Dockerfile',
            'README.md',
            'src/kubectl-layer.ts',
            'test/kubectl-layer.test.ts',
            'test/kubectl-layer.integ.snapshot/**',
          ].join('\n'),
          'commit-message': 'fix: update kubectl to ${{ steps.versions.outputs.kubectl }} and helm to ${{ steps.versions.outputs.helm }}',
          'title': 'fix: update kubectl to ${{ steps.versions.outputs.kubectl }} and helm to ${{ steps.versions.outputs.helm }}',
          'body': [
            'Updates the binaries bundled in the layer on `${{ matrix.branch }}`:',
            '',
            '- kubectl `${{ steps.versions.outputs.kubectl }}`, the latest patch from https://dl.k8s.io/release/',
            '- helm `${{ steps.versions.outputs.helm }}`, the newest release that supports this Kubernetes version per https://helm.sh/docs/topics/version_skew/',
            '',
            '*Automatically created by the "update-tool-versions" workflow*',
          ].join('\n'),
          'author': 'github-actions[bot] <41898282+github-actions[bot]@users.noreply.github.com>',
          'committer': 'github-actions[bot] <41898282+github-actions[bot]@users.noreply.github.com>',
          'signoff': true,
        },
      },
    ],
  },
});

// Fix Docker on GitHub
new WorkflowNoDockerPatch(project, { workflow: 'build' });
new WorkflowNoDockerPatch(project, { workflow: 'release', workflowName: `release-kubectl-v${SPEC_VERSION}` });

project.preCompileTask.exec('layer/build.sh');
project.addPackageIgnore('/scripts/');

// For gitpod users, use jsii/superchain as the dockerImage for the workspace.
const gitpod = new Gitpod(project, {
  dockerImage: DevEnvironmentDockerImage.fromImage('public.ecr.aws/jsii/superchain:1-buster-slim-node18'),
});

gitpod.addVscodeExtensions(
  'dbaeumer.vscode-eslint',
  'AmazonWebServices.aws-toolkit-vscode',
);

project.synth();
