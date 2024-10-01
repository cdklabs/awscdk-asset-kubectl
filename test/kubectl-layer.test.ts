import { Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { KubectlV31Layer } from '../lib';

test('synthesized to a layer version', () => {
  // GIVEN
  const stack = new Stack();

  // WHEN
  new KubectlV31Layer(stack, 'myKubectlLayer');

  // THEN
  const template = Template.fromStack(stack);
  template.resourceCountIs('AWS::Lambda::LayerVersion', 1);
  template.hasResourceProperties('AWS::Lambda::LayerVersion', {
    Description: '/opt/kubectl/kubectl 1.31; /opt/helm/helm 3.16.1',
    LicenseInfo: 'Apache-2.0',

  });


});

