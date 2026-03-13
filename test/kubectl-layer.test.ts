import { Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { KubectlV33Layer } from '../lib';

test('synthesized to a layer version', () => {
  // GIVEN
  const stack = new Stack();

  // WHEN
  new KubectlV33Layer(stack, 'MyLayer');

  // THEN
  Template.fromStack(stack).hasResourceProperties('AWS::Lambda::LayerVersion', {
    Description: '/opt/kubectl/kubectl 1.33.0; /opt/helm/helm 4.1.3',
  });
});
