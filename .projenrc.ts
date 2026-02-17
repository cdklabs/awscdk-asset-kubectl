import { CdklabsConstructLibrary } from 'cdklabs-projen-project-types';
import { javascript, ReleasableCommits } from 'projen';

// the version of k8s this branch supports
const SPEC_VERSION = '20';
const releaseWorkflowName = `release-kubectl-v${SPEC_VERSION}`;
const defaultReleaseBranchName = `kubectl-v${SPEC_VERSION}/main`;

const project = new CdklabsConstructLibrary({
  projenrcTs: true,
  author: 'Amazon Web Services, Inc.',
  authorAddress: 'aws-cdk-dev@amazon.com',
  cdkVersion: '2.0.0',
  name: `@aws-cdk/asset-kubectl-v${SPEC_VERSION}`,
  packageName: `@aws-cdk/asset-kubectl-v${SPEC_VERSION}`,
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
  majorVersion: 2,
  releaseTagPrefix: `kubectl-v${SPEC_VERSION}`,
  releaseWorkflowName: releaseWorkflowName,
  // If we don't do this we release the devDependency updates that happen every day, which blows out
  // our PyPI storage budget even though there aren't any functional changes.
  releasableCommits: ReleasableCommits.featuresAndFixes(),
  defaultReleaseBranch: defaultReleaseBranchName,
  jsiiVersion: '5.5.x',
  typescriptVersion: '5.5.x',
  publishToPypi: {
    distName: `aws-cdk.asset-kubectl-v${SPEC_VERSION}`,
    module: `aws_cdk.asset_kubectl_v${SPEC_VERSION}`,
  },
  publishToMaven: {
    javaPackage: `software.amazon.awscdk.cdk.asset.kubectl.v${SPEC_VERSION}`,
    mavenGroupId: 'software.amazon.awscdk',
    mavenArtifactId: `cdk-asset-kubectl-v${SPEC_VERSION}`,
  },
  publishToNuget: {
    dotNetNamespace: `Amazon.CDK.Asset.KubectlV${SPEC_VERSION}`,
    packageId: `Amazon.CDK.Asset.KubectlV${SPEC_VERSION}`,
    trustedPublishing: false,
  },
  publishToGo: {
    moduleName: 'github.com/cdklabs/awscdk-asset-kubectl-go',
    packageName: `kubectlv${SPEC_VERSION}`,
    gitBranch: `kubectl.${SPEC_VERSION}`,
    gitUserName: 'AWS CDK Team',
    gitUserEmail: 'aws-cdk@amazon.com',
    githubTokenSecret: 'PROJEN_GITHUB_TOKEN',
  },
});

project.preCompileTask.exec('layer/build.sh');

project.synth();
