# Lambda Layer with KubeCtl v1.27
<!--BEGIN STABILITY BANNER-->

---

![cdk-constructs: Stable](https://img.shields.io/badge/cdk--constructs-stable-success.svg?style=for-the-badge)

---

<!--END STABILITY BANNER-->

This module exports a single class called `KubectlV27Layer` which is a `lambda.LayerVersion` that
bundles the [`kubectl`](https://kubernetes.io/docs/reference/kubectl/kubectl/) and the
[`helm`](https://helm.sh/) command line.

> - Helm Version: 3.12.1
> - Kubectl Version: 1.27.1
>

Usage:

```ts
// KubectlLayer bundles the 'kubectl' and 'helm' command lines
import { KubectlV27Layer } from '@aws-cdk/lambda-layer-kubectl-v27';
import * as lambda from 'aws-cdk-lib/aws-lambda';

declare const fn: lambda.Function;
const kubectl = new KubectlV27Layer(this, 'KubectlLayer');
fn.addLayers(kubectl);
```

`kubectl` will be installed under `/opt/kubectl/kubectl`, and `helm` will be installed under `/opt/helm/helm`.
