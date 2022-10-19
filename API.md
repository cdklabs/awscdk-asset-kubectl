# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### KubectlAsset <a name="KubectlAsset" id="@aws-cdk/asset-kubectl-v21.KubectlAsset"></a>

A CDK Asset construct that contains `kubectl` and `helm`.

#### Initializers <a name="Initializers" id="@aws-cdk/asset-kubectl-v21.KubectlAsset.Initializer"></a>

```typescript
import { KubectlAsset } from '@aws-cdk/asset-kubectl-v21'

new KubectlAsset(scope: Construct, id: string, options?: AssetOptions)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@aws-cdk/asset-kubectl-v21.KubectlAsset.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@aws-cdk/asset-kubectl-v21.KubectlAsset.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@aws-cdk/asset-kubectl-v21.KubectlAsset.Initializer.parameter.options">options</a></code> | <code>aws-cdk-lib.aws_s3_assets.AssetOptions</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@aws-cdk/asset-kubectl-v21.KubectlAsset.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@aws-cdk/asset-kubectl-v21.KubectlAsset.Initializer.parameter.id"></a>

- *Type:* string

---

##### `options`<sup>Optional</sup> <a name="options" id="@aws-cdk/asset-kubectl-v21.KubectlAsset.Initializer.parameter.options"></a>

- *Type:* aws-cdk-lib.aws_s3_assets.AssetOptions

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@aws-cdk/asset-kubectl-v21.KubectlAsset.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@aws-cdk/asset-kubectl-v21.KubectlAsset.addResourceMetadata">addResourceMetadata</a></code> | Adds CloudFormation template metadata to the specified resource with information that indicates which resource property is mapped to this local asset. |
| <code><a href="#@aws-cdk/asset-kubectl-v21.KubectlAsset.grantRead">grantRead</a></code> | Grants read permissions to the principal on the assets bucket. |

---

##### `toString` <a name="toString" id="@aws-cdk/asset-kubectl-v21.KubectlAsset.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `addResourceMetadata` <a name="addResourceMetadata" id="@aws-cdk/asset-kubectl-v21.KubectlAsset.addResourceMetadata"></a>

```typescript
public addResourceMetadata(resource: CfnResource, resourceProperty: string): void
```

Adds CloudFormation template metadata to the specified resource with information that indicates which resource property is mapped to this local asset.

This can be used by tools such as SAM CLI to provide local
experience such as local invocation and debugging of Lambda functions.

Asset metadata will only be included if the stack is synthesized with the
"aws:cdk:enable-asset-metadata" context key defined, which is the default
behavior when synthesizing via the CDK Toolkit.

> [https://github.com/aws/aws-cdk/issues/1432](https://github.com/aws/aws-cdk/issues/1432)

###### `resource`<sup>Required</sup> <a name="resource" id="@aws-cdk/asset-kubectl-v21.KubectlAsset.addResourceMetadata.parameter.resource"></a>

- *Type:* aws-cdk-lib.CfnResource

The CloudFormation resource which is using this asset [disable-awslint:ref-via-interface].

---

###### `resourceProperty`<sup>Required</sup> <a name="resourceProperty" id="@aws-cdk/asset-kubectl-v21.KubectlAsset.addResourceMetadata.parameter.resourceProperty"></a>

- *Type:* string

The property name where this asset is referenced (e.g. "Code" for AWS::Lambda::Function).

---

##### `grantRead` <a name="grantRead" id="@aws-cdk/asset-kubectl-v21.KubectlAsset.grantRead"></a>

```typescript
public grantRead(grantee: IGrantable): void
```

Grants read permissions to the principal on the assets bucket.

###### `grantee`<sup>Required</sup> <a name="grantee" id="@aws-cdk/asset-kubectl-v21.KubectlAsset.grantRead.parameter.grantee"></a>

- *Type:* aws-cdk-lib.aws_iam.IGrantable

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@aws-cdk/asset-kubectl-v21.KubectlAsset.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@aws-cdk/asset-kubectl-v21.KubectlAsset.isConstruct"></a>

```typescript
import { KubectlAsset } from '@aws-cdk/asset-kubectl-v21'

KubectlAsset.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@aws-cdk/asset-kubectl-v21.KubectlAsset.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@aws-cdk/asset-kubectl-v21.KubectlAsset.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@aws-cdk/asset-kubectl-v21.KubectlAsset.property.assetHash">assetHash</a></code> | <code>string</code> | A hash of this asset, which is available at construction time. |
| <code><a href="#@aws-cdk/asset-kubectl-v21.KubectlAsset.property.assetPath">assetPath</a></code> | <code>string</code> | The path to the asset, relative to the current Cloud Assembly. |
| <code><a href="#@aws-cdk/asset-kubectl-v21.KubectlAsset.property.bucket">bucket</a></code> | <code>aws-cdk-lib.aws_s3.IBucket</code> | The S3 bucket in which this asset resides. |
| <code><a href="#@aws-cdk/asset-kubectl-v21.KubectlAsset.property.httpUrl">httpUrl</a></code> | <code>string</code> | Attribute which represents the S3 HTTP URL of this asset. |
| <code><a href="#@aws-cdk/asset-kubectl-v21.KubectlAsset.property.isFile">isFile</a></code> | <code>boolean</code> | Indicates if this asset is a single file. |
| <code><a href="#@aws-cdk/asset-kubectl-v21.KubectlAsset.property.isZipArchive">isZipArchive</a></code> | <code>boolean</code> | Indicates if this asset is a zip archive. |
| <code><a href="#@aws-cdk/asset-kubectl-v21.KubectlAsset.property.s3BucketName">s3BucketName</a></code> | <code>string</code> | Attribute that represents the name of the bucket this asset exists in. |
| <code><a href="#@aws-cdk/asset-kubectl-v21.KubectlAsset.property.s3ObjectKey">s3ObjectKey</a></code> | <code>string</code> | Attribute which represents the S3 object key of this asset. |
| <code><a href="#@aws-cdk/asset-kubectl-v21.KubectlAsset.property.s3ObjectUrl">s3ObjectUrl</a></code> | <code>string</code> | Attribute which represents the S3 URL of this asset. |

---

##### `node`<sup>Required</sup> <a name="node" id="@aws-cdk/asset-kubectl-v21.KubectlAsset.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `assetHash`<sup>Required</sup> <a name="assetHash" id="@aws-cdk/asset-kubectl-v21.KubectlAsset.property.assetHash"></a>

```typescript
public readonly assetHash: string;
```

- *Type:* string

A hash of this asset, which is available at construction time.

As this is a plain string, it
can be used in construct IDs in order to enforce creation of a new resource when the content
hash has changed.

---

##### `assetPath`<sup>Required</sup> <a name="assetPath" id="@aws-cdk/asset-kubectl-v21.KubectlAsset.property.assetPath"></a>

```typescript
public readonly assetPath: string;
```

- *Type:* string

The path to the asset, relative to the current Cloud Assembly.

If asset staging is disabled, this will just be the original path.
If asset staging is enabled it will be the staged path.

---

##### `bucket`<sup>Required</sup> <a name="bucket" id="@aws-cdk/asset-kubectl-v21.KubectlAsset.property.bucket"></a>

```typescript
public readonly bucket: IBucket;
```

- *Type:* aws-cdk-lib.aws_s3.IBucket

The S3 bucket in which this asset resides.

---

##### `httpUrl`<sup>Required</sup> <a name="httpUrl" id="@aws-cdk/asset-kubectl-v21.KubectlAsset.property.httpUrl"></a>

```typescript
public readonly httpUrl: string;
```

- *Type:* string

Attribute which represents the S3 HTTP URL of this asset.

---

*Example*

```typescript
https://s3.us-west-1.amazonaws.com/bucket/key
```


##### `isFile`<sup>Required</sup> <a name="isFile" id="@aws-cdk/asset-kubectl-v21.KubectlAsset.property.isFile"></a>

```typescript
public readonly isFile: boolean;
```

- *Type:* boolean

Indicates if this asset is a single file.

Allows constructs to ensure that the
correct file type was used.

---

##### `isZipArchive`<sup>Required</sup> <a name="isZipArchive" id="@aws-cdk/asset-kubectl-v21.KubectlAsset.property.isZipArchive"></a>

```typescript
public readonly isZipArchive: boolean;
```

- *Type:* boolean

Indicates if this asset is a zip archive.

Allows constructs to ensure that the
correct file type was used.

---

##### `s3BucketName`<sup>Required</sup> <a name="s3BucketName" id="@aws-cdk/asset-kubectl-v21.KubectlAsset.property.s3BucketName"></a>

```typescript
public readonly s3BucketName: string;
```

- *Type:* string

Attribute that represents the name of the bucket this asset exists in.

---

##### `s3ObjectKey`<sup>Required</sup> <a name="s3ObjectKey" id="@aws-cdk/asset-kubectl-v21.KubectlAsset.property.s3ObjectKey"></a>

```typescript
public readonly s3ObjectKey: string;
```

- *Type:* string

Attribute which represents the S3 object key of this asset.

---

##### `s3ObjectUrl`<sup>Required</sup> <a name="s3ObjectUrl" id="@aws-cdk/asset-kubectl-v21.KubectlAsset.property.s3ObjectUrl"></a>

```typescript
public readonly s3ObjectUrl: string;
```

- *Type:* string

Attribute which represents the S3 URL of this asset.

---

*Example*

```typescript
s3://bucket/key
```



### KubectlLayer <a name="KubectlLayer" id="@aws-cdk/asset-kubectl-v21.KubectlLayer"></a>

A CDK Asset construct that contains `kubectl` and `helm`.

#### Initializers <a name="Initializers" id="@aws-cdk/asset-kubectl-v21.KubectlLayer.Initializer"></a>

```typescript
import { KubectlLayer } from '@aws-cdk/asset-kubectl-v21'

new KubectlLayer(scope: Construct, id: string)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@aws-cdk/asset-kubectl-v21.KubectlLayer.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@aws-cdk/asset-kubectl-v21.KubectlLayer.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@aws-cdk/asset-kubectl-v21.KubectlLayer.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@aws-cdk/asset-kubectl-v21.KubectlLayer.Initializer.parameter.id"></a>

- *Type:* string

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@aws-cdk/asset-kubectl-v21.KubectlLayer.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@aws-cdk/asset-kubectl-v21.KubectlLayer.applyRemovalPolicy">applyRemovalPolicy</a></code> | Apply the given removal policy to this resource. |
| <code><a href="#@aws-cdk/asset-kubectl-v21.KubectlLayer.addPermission">addPermission</a></code> | Add permission for this layer version to specific entities. |

---

##### `toString` <a name="toString" id="@aws-cdk/asset-kubectl-v21.KubectlLayer.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `applyRemovalPolicy` <a name="applyRemovalPolicy" id="@aws-cdk/asset-kubectl-v21.KubectlLayer.applyRemovalPolicy"></a>

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

###### `policy`<sup>Required</sup> <a name="policy" id="@aws-cdk/asset-kubectl-v21.KubectlLayer.applyRemovalPolicy.parameter.policy"></a>

- *Type:* aws-cdk-lib.RemovalPolicy

---

##### `addPermission` <a name="addPermission" id="@aws-cdk/asset-kubectl-v21.KubectlLayer.addPermission"></a>

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

###### `id`<sup>Required</sup> <a name="id" id="@aws-cdk/asset-kubectl-v21.KubectlLayer.addPermission.parameter.id"></a>

- *Type:* string

---

###### `permission`<sup>Required</sup> <a name="permission" id="@aws-cdk/asset-kubectl-v21.KubectlLayer.addPermission.parameter.permission"></a>

- *Type:* aws-cdk-lib.aws_lambda.LayerVersionPermission

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@aws-cdk/asset-kubectl-v21.KubectlLayer.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#@aws-cdk/asset-kubectl-v21.KubectlLayer.isResource">isResource</a></code> | Check whether the given construct is a Resource. |
| <code><a href="#@aws-cdk/asset-kubectl-v21.KubectlLayer.fromLayerVersionArn">fromLayerVersionArn</a></code> | Imports a layer version by ARN. |
| <code><a href="#@aws-cdk/asset-kubectl-v21.KubectlLayer.fromLayerVersionAttributes">fromLayerVersionAttributes</a></code> | Imports a Layer that has been defined externally. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@aws-cdk/asset-kubectl-v21.KubectlLayer.isConstruct"></a>

```typescript
import { KubectlLayer } from '@aws-cdk/asset-kubectl-v21'

KubectlLayer.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@aws-cdk/asset-kubectl-v21.KubectlLayer.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isResource` <a name="isResource" id="@aws-cdk/asset-kubectl-v21.KubectlLayer.isResource"></a>

```typescript
import { KubectlLayer } from '@aws-cdk/asset-kubectl-v21'

KubectlLayer.isResource(construct: IConstruct)
```

Check whether the given construct is a Resource.

###### `construct`<sup>Required</sup> <a name="construct" id="@aws-cdk/asset-kubectl-v21.KubectlLayer.isResource.parameter.construct"></a>

- *Type:* constructs.IConstruct

---

##### `fromLayerVersionArn` <a name="fromLayerVersionArn" id="@aws-cdk/asset-kubectl-v21.KubectlLayer.fromLayerVersionArn"></a>

```typescript
import { KubectlLayer } from '@aws-cdk/asset-kubectl-v21'

KubectlLayer.fromLayerVersionArn(scope: Construct, id: string, layerVersionArn: string)
```

Imports a layer version by ARN.

Assumes it is compatible with all Lambda runtimes.

###### `scope`<sup>Required</sup> <a name="scope" id="@aws-cdk/asset-kubectl-v21.KubectlLayer.fromLayerVersionArn.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `id`<sup>Required</sup> <a name="id" id="@aws-cdk/asset-kubectl-v21.KubectlLayer.fromLayerVersionArn.parameter.id"></a>

- *Type:* string

---

###### `layerVersionArn`<sup>Required</sup> <a name="layerVersionArn" id="@aws-cdk/asset-kubectl-v21.KubectlLayer.fromLayerVersionArn.parameter.layerVersionArn"></a>

- *Type:* string

---

##### `fromLayerVersionAttributes` <a name="fromLayerVersionAttributes" id="@aws-cdk/asset-kubectl-v21.KubectlLayer.fromLayerVersionAttributes"></a>

```typescript
import { KubectlLayer } from '@aws-cdk/asset-kubectl-v21'

KubectlLayer.fromLayerVersionAttributes(scope: Construct, id: string, attrs: LayerVersionAttributes)
```

Imports a Layer that has been defined externally.

###### `scope`<sup>Required</sup> <a name="scope" id="@aws-cdk/asset-kubectl-v21.KubectlLayer.fromLayerVersionAttributes.parameter.scope"></a>

- *Type:* constructs.Construct

the parent Construct that will use the imported layer.

---

###### `id`<sup>Required</sup> <a name="id" id="@aws-cdk/asset-kubectl-v21.KubectlLayer.fromLayerVersionAttributes.parameter.id"></a>

- *Type:* string

the id of the imported layer in the construct tree.

---

###### `attrs`<sup>Required</sup> <a name="attrs" id="@aws-cdk/asset-kubectl-v21.KubectlLayer.fromLayerVersionAttributes.parameter.attrs"></a>

- *Type:* aws-cdk-lib.aws_lambda.LayerVersionAttributes

the properties of the imported layer.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@aws-cdk/asset-kubectl-v21.KubectlLayer.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@aws-cdk/asset-kubectl-v21.KubectlLayer.property.env">env</a></code> | <code>aws-cdk-lib.ResourceEnvironment</code> | The environment this resource belongs to. |
| <code><a href="#@aws-cdk/asset-kubectl-v21.KubectlLayer.property.stack">stack</a></code> | <code>aws-cdk-lib.Stack</code> | The stack in which this resource is defined. |
| <code><a href="#@aws-cdk/asset-kubectl-v21.KubectlLayer.property.compatibleRuntimes">compatibleRuntimes</a></code> | <code>aws-cdk-lib.aws_lambda.Runtime[]</code> | The runtimes compatible with this Layer. |
| <code><a href="#@aws-cdk/asset-kubectl-v21.KubectlLayer.property.layerVersionArn">layerVersionArn</a></code> | <code>string</code> | The ARN of the Lambda Layer version that this Layer defines. |

---

##### `node`<sup>Required</sup> <a name="node" id="@aws-cdk/asset-kubectl-v21.KubectlLayer.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `env`<sup>Required</sup> <a name="env" id="@aws-cdk/asset-kubectl-v21.KubectlLayer.property.env"></a>

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

##### `stack`<sup>Required</sup> <a name="stack" id="@aws-cdk/asset-kubectl-v21.KubectlLayer.property.stack"></a>

```typescript
public readonly stack: Stack;
```

- *Type:* aws-cdk-lib.Stack

The stack in which this resource is defined.

---

##### `compatibleRuntimes`<sup>Optional</sup> <a name="compatibleRuntimes" id="@aws-cdk/asset-kubectl-v21.KubectlLayer.property.compatibleRuntimes"></a>

```typescript
public readonly compatibleRuntimes: Runtime[];
```

- *Type:* aws-cdk-lib.aws_lambda.Runtime[]

The runtimes compatible with this Layer.

---

##### `layerVersionArn`<sup>Required</sup> <a name="layerVersionArn" id="@aws-cdk/asset-kubectl-v21.KubectlLayer.property.layerVersionArn"></a>

```typescript
public readonly layerVersionArn: string;
```

- *Type:* string

The ARN of the Lambda Layer version that this Layer defines.

---





