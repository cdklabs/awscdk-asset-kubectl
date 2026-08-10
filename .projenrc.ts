import { CdklabsConstructLibrary } from 'cdklabs-projen-project-types';
import { DependencyType, javascript, ReleasableCommits } from 'projen';

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
  stability: 'stable',
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

// We only need aws-cdk-lib and constructs for testing. Neither library is used
// in the public API. Remove peer deps and use DEVENV with ranges so that:
// 1. jsii 5.5.x doesn't try to load the aws-cdk-lib assembly (which requires newer jsii)
// 2. Tests can use newer CDK features (e.g. Runtime.PYTHON_3_10)
project.deps.removeDependency('constructs', DependencyType.PEER);
project.deps.addDependency('constructs@^10.0.5', DependencyType.DEVENV);
project.deps.removeDependency('aws-cdk-lib', DependencyType.PEER);
project.deps.addDependency('aws-cdk-lib@^2.0.0', DependencyType.DEVENV);

// CdklabsConstructLibrary adds rosetta:extract to post-compile by default,
// but without peer deps in the jsii assembly rosetta can't resolve types.
// The original AwsCdkConstructLibrary config did not run rosetta, so remove it.
project.postCompileTask.removeStep(1);

project.preCompileTask.exec('layer/build.sh');

// cloud-assembly-schema v52+ emits a metadata.json that contains machine-specific
// stack traces, causing snapshot diffs across environments. Exclude it from the
// integ test assertion diff (like manifest.json and tree.json).
//
// Similarly, aws-cdk-lib 2.263+ runs the built-in "CloudFormation Validate" plugin
// during synth and writes a validation-report.json into the cloud assembly. That
// report embeds machine-specific absolute stack-trace paths, so it also causes
// snapshot diffs across environments and must be excluded and gitignored too.
const assertTask = project.tasks.tryFind('integ:kubectl-asset:assert')!;
assertTask.removeStep(2);
assertTask.exec('diff -r -x asset.* -x cdk.out -x manifest.json -x tree.json -x "*.metadata.json" -x validation-report.json test/kubectl-asset.integ.snapshot/ test/.tmp/kubectl-asset.integ/assert.cdk.out/');
project.addGitIgnore('test/kubectl-asset.integ.snapshot/*.metadata.json');
project.addGitIgnore('test/kubectl-asset.integ.snapshot/validation-report.json');

project.synth();
