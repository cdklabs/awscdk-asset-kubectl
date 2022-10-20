# Asset with KubeCtl v1.22
<!--BEGIN STABILITY BANNER-->

---

![cdk-constructs: Experimental](https://img.shields.io/badge/cdk--constructs-experimental-important.svg?style=for-the-badge)

---

> This library is currently under development. Do not use!

<!--END STABILITY BANNER-->

This module exports a single class called `KubectlLayer` which is a `lambda.LayerVersion` that
bundles the [`kubectl`](https://kubernetes.io/docs/reference/kubectl/kubectl/) and the
[`helm`](https://helm.sh/) command line.

> - Helm Version: 3.9.4
> - Kubectl Version: 1.22.0
> 

Usage:

```ts
// KubectlAsset bundles the 'kubectl' and 'helm' command lines
import { KubectlLayer } from '@aws-cdk/lambda-layer-kubectl-v22';
import * as lambda from 'aws-cdk-lib/aws-lambda';

declare const fn: lambda.Function;
const kubectl = new KubectlLayer(this, 'KubectlLayer');
fn.addLayers(kubectl);
```

`kubectl` will be installed under `/opt/kubectl/kubectl`, and `helm` will be installed under `/opt/helm/helm`.
