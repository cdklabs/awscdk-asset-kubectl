import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import { assetHash, ASSET_FILE } from './_asset';

/**
 * A CDK Asset construct that contains `kubectl` and `helm`.
 */
export class KubectlV34Layer extends lambda.LayerVersion {
  constructor(scope: Construct, id: string) {
    super(scope, id, {
      code: lambda.Code.fromAsset(ASSET_FILE, {
        assetHash: assetHash(),
      }),
      description: '/opt/kubectl/kubectl 1.34.0; /opt/helm/helm 3.19.0',
      license: 'Apache-2.0',
    });
  }
}
