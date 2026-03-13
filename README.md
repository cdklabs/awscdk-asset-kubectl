# Lambda Layer with KubeCtl v1.33
<!--BEGIN STABILITY BANNER-->

---

![cdk-constructs: Stable](https://img.shields.io/badge/cdk--constructs-stable-success.svg?style=for-the-badge)

---

<!--END STABILITY BANNER-->

This module exports a single class called `KubectlV33Layer` which is a `lambda.LayerVersion` that
bundles the [`kubectl`](https://kubernetes.io/docs/reference/kubectl/kubectl/) and the
[`helm`](https://helm.sh/) command line.

> - Helm Version: 4.1.3
> - Kubectl Version: 1.33.0
>

Usage:

```ts
// KubectlLayer bundles the 'kubectl' and 'helm' command lines
import { KubectlV33Layer } from '@aws-cdk/lambda-layer-kubectl-v33';
import * as lambda from 'aws-cdk-lib/aws-lambda';

declare const fn: lambda.Function;
const kubectl = new KubectlV33Layer(this, 'KubectlLayer');
fn.addLayers(kubectl);
```

`kubectl` will be installed under `/opt/kubectl/kubectl`, and `helm` will be installed under `/opt/helm/helm`.
