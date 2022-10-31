
import { Stack, FileSystem } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as s3_assets from 'aws-cdk-lib/aws-s3-assets';
import { ASSET_FILE, LAYER_SOURCE } from '../lib';

test('synthesized to a layer version', () => {
  // GIVEN
  const stack = new Stack();
  const asset = new s3_assets.Asset(stack, 'layer-asset', {
    path: ASSET_FILE,
    assetHash: FileSystem.fingerprint(LAYER_SOURCE),
  });

  // WHEN
  new lambda.LayerVersion(stack, 'MyLayer', {
    code: lambda.Code.fromBucket(asset.bucket, asset.s3ObjectKey),
    description: '/opt/kubectl/kubectl and /opt/helm/helm',
  });

  // THEN
  Template.fromStack(stack).hasResourceProperties('AWS::Lambda::LayerVersion', {
    Description: '/opt/kubectl/kubectl and /opt/helm/helm',
  });
});
