import { CdklabsConstructLibrary } from 'cdklabs-projen-project-types';
import { Gitpod, DevEnvironmentDockerImage, ReleasableCommits, javascript } from 'projen';
import { WorkflowNoDockerPatch } from './projenrc/workflow-no-docker-patch';

// the version of k8s this branch supports
const SPEC_VERSION = '32';
const releaseWorkflowName = `release-kubectl-v${SPEC_VERSION}`;
const defaultReleaseBranchName = `kubectl-v${SPEC_VERSION}/main`;

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
  stability: 'stable',
  autoApproveOptions: {
    allowedUsernames: ['aws-cdk-automation', 'mergify[bot]'],
    secret: 'GITHUB_TOKEN',
  },
  autoApproveUpgrades: true,
  // We support the last 3 minor versions just like Kubernetes
  // We also need to keep supporting v20 since it is a hard dependency of aws-cdk-lib
  depsUpgradeOptions: {
    workflowOptions: {
      branches: [
        'kubectl-v20/main', // this must be supported because aws-cdk-lib depends on it
        `kubectl-v${SPEC_VERSION}/main`,
        `kubectl-v${Number(SPEC_VERSION)-1}/main`,
        `kubectl-v${Number(SPEC_VERSION)-2}/main`,
      ],
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
        name: 'backport patches to kubectl-v21+ branches',
        conditions: [
          'label=backport-to-kubectl-v21+',
          `base=kubectl-v${SPEC_VERSION}/main`,
        ],
        actions: {
          backport: {
            regexes: [`kubectl-v(?!20|${SPEC_VERSION})[\\d]*\\/main`],
            labels: ['auto-approve'],
          },
        },
      }],
    },
  },
});

// Fix Docker on GitHub
new WorkflowNoDockerPatch(project, { workflow: 'build' });
new WorkflowNoDockerPatch(project, { workflow: 'release', workflowName: `release-kubectl-v${SPEC_VERSION}` });

project.preCompileTask.exec('layer/build.sh');

// For gitpod users, use jsii/superchain as the dockerImage for the workspace.
const gitpod = new Gitpod(project, {
  dockerImage: DevEnvironmentDockerImage.fromImage('public.ecr.aws/jsii/superchain:1-buster-slim-node18'),
});

gitpod.addVscodeExtensions(
  'dbaeumer.vscode-eslint',
  'AmazonWebServices.aws-toolkit-vscode',
);

project.synth();
