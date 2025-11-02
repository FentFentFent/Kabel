[**Kabel Project Docs v1.0.4**](../README.md)

***

[Kabel Project Docs](../globals.md) / InjectOptions

# Interface: InjectOptions

Defined in: [src/inject.ts:77](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/inject.ts#L77)

Options used when injecting a new workspace.

## Properties

### Controller?

> `optional` **Controller**: *typeof* [`WorkspaceController`](../classes/WorkspaceController.md)

Defined in: [src/inject.ts:82](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/inject.ts#L82)

Optional custom controller class

***

### controls?

> `optional` **controls**: `object`

Defined in: [src/inject.ts:85](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/inject.ts#L85)

Optional controls configuration

#### maxZoom?

> `optional` **maxZoom**: `number`

#### minZoom?

> `optional` **minZoom**: `number`

#### wasd?

> `optional` **wasd**: `boolean`

#### wasdAccelerate?

> `optional` **wasdAccelerate**: `number`

#### wasdFriction?

> `optional` **wasdFriction**: `number`

#### wasdSmooth?

> `optional` **wasdSmooth**: `boolean`

#### zoomSpeed?

> `optional` **zoomSpeed**: `number`

***

### moveSpeed?

> `optional` **moveSpeed**: `number`

Defined in: [src/inject.ts:99](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/inject.ts#L99)

Optional movement speed of the workspace

***

### renderer?

> `optional` **renderer**: `string` \| *typeof* [`Renderer`](../classes/Renderer.md)

Defined in: [src/inject.ts:102](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/inject.ts#L102)

Optional renderer: name string or class

***

### rendererOverrides?

> `optional` **rendererOverrides**: `object`

Defined in: [src/inject.ts:79](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/inject.ts#L79)

Optional renderer overrides

#### Index Signature

\[`key`: `string`\]: `any`

***

### toolbox?

> `optional` **toolbox**: [`TblxObjStruct`](../type-aliases/TblxObjStruct.md)

Defined in: [src/inject.ts:96](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/inject.ts#L96)

Optional toolbox structure
