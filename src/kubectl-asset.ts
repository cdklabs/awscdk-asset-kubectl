import * as s3_assets from 'aws-cdk-lib/aws-s3-assets';
import { Construct } from 'constructs';
import { assetHash, ASSET_FILE } from './_asset';

/**
 * A CDK Asset construct that contains `kubectl` and `helm`.
 */
export class KubectlAsset extends s3_assets.Asset {
  constructor(scope: Construct, id: string, options: s3_assets.AssetOptions = {}) {
    super(scope, id, {
      path: ASSET_FILE,
      assetHash: assetHash(),
      ...options,
    });
  }
}