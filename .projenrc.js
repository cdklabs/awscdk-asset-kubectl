const { awscdk, JsonPatch, DependencyType } = require('projen');
const { NpmAccess } = require('projen/lib/javascript');

const MAJOR_VERSION = 1;
const releaseWorkflowName = `release-awscli-v${MAJOR_VERSION}`;
const defaultReleaseBranchName = `awscli-v${MAJOR_VERSION}/main`;

const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Amazon Web Services, Inc.',
  cdkVersion: '2.0.0',
  name: `@aws-cdk/asset-awscli-v${MAJOR_VERSION}`,
  description: 'A library that contains the AWS CLI, as an AssetSource, for use in Lambda Layers',
  repositoryUrl: 'https://github.com/cdklabs/awscdk-asset-awscli.git',
  homepage: 'https://github.com/cdklabs/awscdk-asset-awscli#readme',
  autoApproveOptions: {
    allowedUsernames: ['aws-cdk-automation'],
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
  majorVersion: 2,
  npmAccess: NpmAccess.PUBLIC,
  releaseTagPrefix: `awscli-v${MAJOR_VERSION}`,
  releaseWorkflowName: releaseWorkflowName,
  defaultReleaseBranch: defaultReleaseBranchName,
  publishToPypi: {
    distName: `aws-cdk.asset-awscli-v${MAJOR_VERSION}`,
    module: `aws_cdk.asset_awscli_v${MAJOR_VERSION}`,
  },
  publishToMaven: {
    javaPackage: `software.amazon.awscdk.cdk.asset.awscli.v${MAJOR_VERSION}`,
    mavenGroupId: 'software.amazon.awscdk',
    mavenArtifactId: `cdk-asset-awscli-v${MAJOR_VERSION}`,
    mavenEndpoint: 'https://aws.oss.sonatype.org',
  },
  publishToNuget: {
    dotNetNamespace: `Amazon.CDK.Asset.AwsCliV${MAJOR_VERSION}`,
    packageId: `Amazon.CDK.Asset.AwsCliV${MAJOR_VERSION}`,
  },
  publishToGo: {
    moduleName: 'github.com/cdklabs/awscdk-asset-awscli-go',
    packageName: `awscliv${MAJOR_VERSION}`,
    gitBranch: `awscli.${MAJOR_VERSION}`,
    gitUserName: 'AWS CDK Team',
    gitUserEmail: 'aws-cdk@amazon.com',
    githubTokenSecret: 'PROJEN_GITHUB_TOKEN',
  },
});

// We only need aws-cdk-lib and constructs for testing. Neither library is used
// in the public API.
project.deps.removeDependency('constructs', DependencyType.PEER);
project.deps.addDependency('constructs@10.0.5', DependencyType.DEVENV);
project.deps.removeDependency('aws-cdk-lib', DependencyType.PEER);
project.deps.addDependency('aws-cdk-lib@2.0.0', DependencyType.DEVENV);

// These patches are required to enable sudo commands in the workflows under `workflowBootstrapSteps`,
// see `workflowBootstrapSteps` above for why a sudo command is needed.
const buildWorkflow = project.tryFindObjectFile('.github/workflows/build.yml');
buildWorkflow.patch(JsonPatch.add('/jobs/build/container/options', '--group-add sudo'));
const releaseWorkflow = project.tryFindObjectFile(`.github/workflows/${releaseWorkflowName}.yml`);
releaseWorkflow.patch(JsonPatch.add('/jobs/release/container/options', '--group-add sudo'));
const upgradeWorkflow = project.tryFindObjectFile(`.github/workflows/upgrade-awscli-v${MAJOR_VERSION}-main.yml`);
upgradeWorkflow.patch(JsonPatch.add('/jobs/upgrade/container/options', '--group-add sudo'));

project.preCompileTask.exec('layer/build.sh');

project.synth();