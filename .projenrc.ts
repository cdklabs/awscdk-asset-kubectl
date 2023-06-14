import { awscdk, Gitpod, DevEnvironmentDockerImage } from 'projen';
import { NpmAccess } from 'projen/lib/javascript';
import { WorkflowNoDockerPatch } from './projenrc/workflow-no-docker-patch';

// the version of k8s this branch supports
const SPEC_VERSION = '25';
const releaseWorkflowName = `release-kubectl-v${SPEC_VERSION}`;
const defaultReleaseBranchName = `kubectl-v${SPEC_VERSION}/main`;

const project = new awscdk.AwsCdkConstructLibrary({
  projenrcTs: true,
  author: 'Amazon Web Services',
  authorAddress: 'aws-cdk-dev@amazon.com',
  cdkVersion: '2.28.0',
  name: `@aws-cdk/lambda-layer-kubectl-v${SPEC_VERSION}`,
  description: `A Lambda Layer that contains kubectl v1.${SPEC_VERSION}`,
  repositoryUrl: 'https://github.com/cdklabs/awscdk-asset-kubectl.git',
  homepage: 'https://github.com/cdklabs/awscdk-asset-kubectl#readme',
  autoApproveOptions: {
    allowedUsernames: ['aws-cdk-automation', 'mergify[bot]'],
    secret: 'GITHUB_TOKEN',
  },
  autoApproveUpgrades: true,
  majorVersion: 2,
  npmAccess: NpmAccess.PUBLIC,
  releaseTagPrefix: `kubectl-v${SPEC_VERSION}`,
  releaseWorkflowName: releaseWorkflowName,
  defaultReleaseBranch: defaultReleaseBranchName,
  publishToPypi: {
    distName: `aws-cdk.lambda-layer-kubectl-v${SPEC_VERSION}`,
    module: `aws_cdk.lambda_layer_kubectl_v${SPEC_VERSION}`,
  },
  publishToMaven: {
    javaPackage: `software.amazon.awscdk.cdk.lambdalayer.kubectl.v${SPEC_VERSION}`,
    mavenGroupId: 'software.amazon.awscdk',
    mavenArtifactId: `cdk-lambda-layer-kubectl-v${SPEC_VERSION}`,
    mavenEndpoint: 'https://aws.oss.sonatype.org',
  },
  publishToNuget: {
    dotNetNamespace: `Amazon.CDK.LambdaLayer.KubectlV${SPEC_VERSION}`,
    packageId: `Amazon.CDK.LambdaLayer.KubectlV${SPEC_VERSION}`,
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
