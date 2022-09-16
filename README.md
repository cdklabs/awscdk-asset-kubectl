# Asset with KubeCtl v1.20
<!--BEGIN STABILITY BANNER-->

---

![cdk-constructs: Experimental](https://img.shields.io/badge/cdk--constructs-experimental-important.svg?style=for-the-badge)

---

> This library is currently under development. Do not use!

<!--END STABILITY BANNER-->

This module exports a single class called `KubectlLayer` which is a `lambda.Layer` that bundles the [`kubectl`](https://kubernetes.io/docs/reference/kubectl/kubectl/) and the [`helm`](https://helm.sh/) command line.

> - Helm Version: 3.5.4
> - Kubectl Version: 1.20.0
> 

Usage:

```ts
// KubectlLayer bundles the 'kubectl' and 'helm' command lines
import { KubectlLayer } from '@aws-cdk/lambda-layer-kubectl';

declare const fn: lambda.Function;
fn.addLayers(new KubectlLayer(this, 'KubectlLayer'));
```

`kubectl` will be installed under `/opt/kubectl/kubectl`, and `helm` will be installed under `/opt/helm/helm`.
