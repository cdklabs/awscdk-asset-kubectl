import { Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { KubectlV30Layer } from '../lib';

test('synthesized to a layer version', () => {
  // GIVEN
  const stack = new Stack();

  // WHEN
  new KubectlV30Layer(stack, 'MyLayer');

  // THEN
  Template.fromStack(stack).hasResourceProperties('AWS::Lambda::LayerVersion', {
    Description: '/opt/kubectl/kubectl 1.30; /opt/helm/helm 3.15',
  });
});

