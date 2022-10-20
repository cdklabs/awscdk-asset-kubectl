# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### KubectlLayer <a name="KubectlLayer" id="@aws-cdk/lambda-layer-kubectl-v24.KubectlLayer"></a>

A CDK Asset construct that contains `kubectl` and `helm`.

#### Initializers <a name="Initializers" id="@aws-cdk/lambda-layer-kubectl-v24.KubectlLayer.Initializer"></a>

```typescript
import { KubectlLayer } from '@aws-cdk/lambda-layer-kubectl-v24'

new KubectlLayer(scope: Construct, id: string)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@aws-cdk/lambda-layer-kubectl-v24.KubectlLayer.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@aws-cdk/lambda-layer-kubectl-v24.KubectlLayer.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@aws-cdk/lambda-layer-kubectl-v24.KubectlLayer.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@aws-cdk/lambda-layer-kubectl-v24.KubectlLayer.Initializer.parameter.id"></a>

- *Type:* string

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@aws-cdk/lambda-layer-kubectl-v24.KubectlLayer.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@aws-cdk/lambda-layer-kubectl-v24.KubectlLayer.applyRemovalPolicy">applyRemovalPolicy</a></code> | Apply the given removal policy to this resource. |
| <code><a href="#@aws-cdk/lambda-layer-kubectl-v24.KubectlLayer.addPermission">addPermission</a></code> | Add permission for this layer version to specific entities. |

---

##### `toString` <a name="toString" id="@aws-cdk/lambda-layer-kubectl-v24.KubectlLayer.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `applyRemovalPolicy` <a name="applyRemovalPolicy" id="@aws-cdk/lambda-layer-kubectl-v24.KubectlLayer.applyRemovalPolicy"></a>

```typescript
public applyRemovalPolicy(policy: RemovalPolicy): void
```

Apply the given removal policy to this resource.

The Removal Policy controls what happens to this resource when it stops
being managed by CloudFormation, either because you've removed it from the
CDK application or because you've made a change that requires the resource
to be replaced.

The resource can be deleted (`RemovalPolicy.DESTROY`), or left in your AWS
account for data recovery and cleanup later (`RemovalPolicy.RETAIN`).

###### `policy`<sup>Required</sup> <a name="policy" id="@aws-cdk/lambda-layer-kubectl-v24.KubectlLayer.applyRemovalPolicy.parameter.policy"></a>

- *Type:* aws-cdk-lib.RemovalPolicy

---

##### `addPermission` <a name="addPermission" id="@aws-cdk/lambda-layer-kubectl-v24.KubectlLayer.addPermission"></a>

```typescript
public addPermission(id: string, permission: LayerVersionPermission): void
```

Add permission for this layer version to specific entities.

Usage within
the same account where the layer is defined is always allowed and does not
require calling this method. Note that the principal that creates the
Lambda function using the layer (for example, a CloudFormation changeset
execution role) also needs to have the ``lambda:GetLayerVersion``
permission on the layer version.

###### `id`<sup>Required</sup> <a name="id" id="@aws-cdk/lambda-layer-kubectl-v24.KubectlLayer.addPermission.parameter.id"></a>

- *Type:* string

---

###### `permission`<sup>Required</sup> <a name="permission" id="@aws-cdk/lambda-layer-kubectl-v24.KubectlLayer.addPermission.parameter.permission"></a>

- *Type:* aws-cdk-lib.aws_lambda.LayerVersionPermission

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@aws-cdk/lambda-layer-kubectl-v24.KubectlLayer.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#@aws-cdk/lambda-layer-kubectl-v24.KubectlLayer.isResource">isResource</a></code> | Check whether the given construct is a Resource. |
| <code><a href="#@aws-cdk/lambda-layer-kubectl-v24.KubectlLayer.fromLayerVersionArn">fromLayerVersionArn</a></code> | Imports a layer version by ARN. |
| <code><a href="#@aws-cdk/lambda-layer-kubectl-v24.KubectlLayer.fromLayerVersionAttributes">fromLayerVersionAttributes</a></code> | Imports a Layer that has been defined externally. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@aws-cdk/lambda-layer-kubectl-v24.KubectlLayer.isConstruct"></a>

```typescript
import { KubectlLayer } from '@aws-cdk/lambda-layer-kubectl-v24'

KubectlLayer.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@aws-cdk/lambda-layer-kubectl-v24.KubectlLayer.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isResource` <a name="isResource" id="@aws-cdk/lambda-layer-kubectl-v24.KubectlLayer.isResource"></a>

```typescript
import { KubectlLayer } from '@aws-cdk/lambda-layer-kubectl-v24'

KubectlLayer.isResource(construct: IConstruct)
```

Check whether the given construct is a Resource.

###### `construct`<sup>Required</sup> <a name="construct" id="@aws-cdk/lambda-layer-kubectl-v24.KubectlLayer.isResource.parameter.construct"></a>

- *Type:* constructs.IConstruct

---

##### `fromLayerVersionArn` <a name="fromLayerVersionArn" id="@aws-cdk/lambda-layer-kubectl-v24.KubectlLayer.fromLayerVersionArn"></a>

```typescript
import { KubectlLayer } from '@aws-cdk/lambda-layer-kubectl-v24'

KubectlLayer.fromLayerVersionArn(scope: Construct, id: string, layerVersionArn: string)
```

Imports a layer version by ARN.

Assumes it is compatible with all Lambda runtimes.

###### `scope`<sup>Required</sup> <a name="scope" id="@aws-cdk/lambda-layer-kubectl-v24.KubectlLayer.fromLayerVersionArn.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `id`<sup>Required</sup> <a name="id" id="@aws-cdk/lambda-layer-kubectl-v24.KubectlLayer.fromLayerVersionArn.parameter.id"></a>

- *Type:* string

---

###### `layerVersionArn`<sup>Required</sup> <a name="layerVersionArn" id="@aws-cdk/lambda-layer-kubectl-v24.KubectlLayer.fromLayerVersionArn.parameter.layerVersionArn"></a>

- *Type:* string

---

##### `fromLayerVersionAttributes` <a name="fromLayerVersionAttributes" id="@aws-cdk/lambda-layer-kubectl-v24.KubectlLayer.fromLayerVersionAttributes"></a>

```typescript
import { KubectlLayer } from '@aws-cdk/lambda-layer-kubectl-v24'

KubectlLayer.fromLayerVersionAttributes(scope: Construct, id: string, attrs: LayerVersionAttributes)
```

Imports a Layer that has been defined externally.

###### `scope`<sup>Required</sup> <a name="scope" id="@aws-cdk/lambda-layer-kubectl-v24.KubectlLayer.fromLayerVersionAttributes.parameter.scope"></a>

- *Type:* constructs.Construct

the parent Construct that will use the imported layer.

---

###### `id`<sup>Required</sup> <a name="id" id="@aws-cdk/lambda-layer-kubectl-v24.KubectlLayer.fromLayerVersionAttributes.parameter.id"></a>

- *Type:* string

the id of the imported layer in the construct tree.

---

###### `attrs`<sup>Required</sup> <a name="attrs" id="@aws-cdk/lambda-layer-kubectl-v24.KubectlLayer.fromLayerVersionAttributes.parameter.attrs"></a>

- *Type:* aws-cdk-lib.aws_lambda.LayerVersionAttributes

the properties of the imported layer.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@aws-cdk/lambda-layer-kubectl-v24.KubectlLayer.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@aws-cdk/lambda-layer-kubectl-v24.KubectlLayer.property.env">env</a></code> | <code>aws-cdk-lib.ResourceEnvironment</code> | The environment this resource belongs to. |
| <code><a href="#@aws-cdk/lambda-layer-kubectl-v24.KubectlLayer.property.stack">stack</a></code> | <code>aws-cdk-lib.Stack</code> | The stack in which this resource is defined. |
| <code><a href="#@aws-cdk/lambda-layer-kubectl-v24.KubectlLayer.property.compatibleRuntimes">compatibleRuntimes</a></code> | <code>aws-cdk-lib.aws_lambda.Runtime[]</code> | The runtimes compatible with this Layer. |
| <code><a href="#@aws-cdk/lambda-layer-kubectl-v24.KubectlLayer.property.layerVersionArn">layerVersionArn</a></code> | <code>string</code> | The ARN of the Lambda Layer version that this Layer defines. |

---

##### `node`<sup>Required</sup> <a name="node" id="@aws-cdk/lambda-layer-kubectl-v24.KubectlLayer.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `env`<sup>Required</sup> <a name="env" id="@aws-cdk/lambda-layer-kubectl-v24.KubectlLayer.property.env"></a>

```typescript
public readonly env: ResourceEnvironment;
```

- *Type:* aws-cdk-lib.ResourceEnvironment

The environment this resource belongs to.

For resources that are created and managed by the CDK
(generally, those created by creating new class instances like Role, Bucket, etc.),
this is always the same as the environment of the stack they belong to;
however, for imported resources
(those obtained from static methods like fromRoleArn, fromBucketName, etc.),
that might be different than the stack they were imported into.

---

##### `stack`<sup>Required</sup> <a name="stack" id="@aws-cdk/lambda-layer-kubectl-v24.KubectlLayer.property.stack"></a>

```typescript
public readonly stack: Stack;
```

- *Type:* aws-cdk-lib.Stack

The stack in which this resource is defined.

---

##### `compatibleRuntimes`<sup>Optional</sup> <a name="compatibleRuntimes" id="@aws-cdk/lambda-layer-kubectl-v24.KubectlLayer.property.compatibleRuntimes"></a>

```typescript
public readonly compatibleRuntimes: Runtime[];
```

- *Type:* aws-cdk-lib.aws_lambda.Runtime[]

The runtimes compatible with this Layer.

---

##### `layerVersionArn`<sup>Required</sup> <a name="layerVersionArn" id="@aws-cdk/lambda-layer-kubectl-v24.KubectlLayer.property.layerVersionArn"></a>

```typescript
public readonly layerVersionArn: string;
```

- *Type:* string

The ARN of the Lambda Layer version that this Layer defines.

---





