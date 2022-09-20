import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
import * as s3_assets from 'aws-cdk-lib/aws-s3-assets';
import { Construct } from 'constructs';

/**
 * A CDK Asset construct that contains `kubectl` and `helm`.
 */
export class KubectlAsset extends s3_assets.Asset {
  constructor(scope: Construct, id: string, options: s3_assets.AssetOptions = {}) {
    super(scope, id, {
      path: path.join(__dirname, 'layer.zip'),
      // we hash the Dockerfile (it contains the tools versions) because hashing the zip is non-deterministic
      assetHash: hashFile(path.join(__dirname, '..', 'layer', 'Dockerfile')),
      ...options,
    });
  }
}

function hashFile(fileName: string) {
  return crypto
    .createHash('sha256')
    .update(fs.readFileSync(fileName))
    .digest('hex');
}