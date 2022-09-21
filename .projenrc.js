const { awscdk, JsonPatch } = require('projen');
const { NpmAccess } = require('projen/lib/javascript');

// the version of k8s this branch supports
const SPEC_VERSION = '20';
const releaseWorkflowName = `release-kubectl-v${SPEC_VERSION}`;
const defaultReleaseBranchName = `kubectl-v${SPEC_VERSION}/main`;

const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Amazon Web Services',
  cdkVersion: '2.0.0',
  name: `@aws-cdk/asset-kubectl-v${SPEC_VERSION}`,
  description: 'An Asset construct that contains kubectl, for use in Lambda Layers',
  repositoryUrl: 'https://github.com/cdklabs/awscdk-asset-kubectl.git',
  homepage: 'https://github.com/cdklabs/aws-asset-awscli#readme',
  autoApproveOptions: {
    allowedUsernames: ['cdklabs-automation'],
    secret: 'GITHUB_TOKEN',
  },
  autoApproveUpgrades: true,
  workflowBootstrapSteps: [
    {
      // This step is required to allow the build workflow to build docker images.
      name: 'Change permissions on /var/run/docker.sock',
      run: 'sudo chown superchain /var/run/docker.sock',
    },
  ],
  npmAccess: NpmAccess.PUBLIC,
  releaseTagPrefix: `kubectl-v${SPEC_VERSION}`,
  releaseWorkflowName: releaseWorkflowName,
  defaultReleaseBranch: defaultReleaseBranchName,
  publishToPypi: {
    distName: `aws-cdk.asset-kubectl-v${SPEC_VERSION}`,
    module: `aws_cdk.asset_kubectl_v${SPEC_VERSION}`,
  },
  publishToMaven: {
    javaPackage: `software.amazon.awscdk.cdk.asset.kubectl.v${SPEC_VERSION}`,
    mavenGroupId: 'software.amazon.awscdk',
    mavenArtifactId: `cdk-asset-kubectl-v${SPEC_VERSION}`,
    mavenEndpoint: 'https://aws.oss.sonatype.org',
  },
  publishToNuget: {
    dotNetNamespace: `Amazon.CDK.Asset.KubectlV${SPEC_VERSION}`,
    packageId: `Amazon.CDK.Asset.KubectlV${SPEC_VERSION}`,
  },
  publishToGo: {
    moduleName: 'github.com/cdklabs/awscdk-asset-kubectl-go',
    gitBranch: `kubectl.${SPEC_VERSION}`,
    gitUserName: 'AWS CDK Team',
    gitUserEmail: 'aws-cdk@amazon.com',
    githubTokenSecret: 'PROJEN_GITHUB_TOKEN',
  },
});

// These patches are required to enable sudo commands in the workflows under `workflowBootstrapSteps`,
// see `workflowBootstrapSteps` above for why a sudo command is needed.
const buildWorkflow = project.tryFindObjectFile('.github/workflows/build.yml');
buildWorkflow.patch(JsonPatch.add('/jobs/build/container/options', '--group-add sudo'));
const releaseWorkflow = project.tryFindObjectFile(`.github/workflows/${releaseWorkflowName}.yml`);
releaseWorkflow.patch(JsonPatch.add('/jobs/release/container/options', '--group-add sudo'));
const upgradeWorkflow = project.tryFindObjectFile(`.github/workflows/upgrade-kubectl-v${SPEC_VERSION}-main.yml`);
upgradeWorkflow.patch(JsonPatch.add('/jobs/upgrade/container/options', '--group-add sudo'));

project.preCompileTask.exec('layer/build.sh');

project.synth();