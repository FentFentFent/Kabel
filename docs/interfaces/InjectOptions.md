[**Kabel Project Docs v1.0.6**](../README.md)

***

[Kabel Project Docs](../globals.md) / InjectOptions

# Interface: InjectOptions

Defined in: [src/inject.ts:101](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/inject.ts#L101)

Options used when injecting a new workspace.

## Properties

### Controller?

> `optional` **Controller**: *typeof* [`WorkspaceController`](../classes/WorkspaceController.md)

Defined in: [src/inject.ts:107](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/inject.ts#L107)

Optional custom controller class

***

### controls?

> `optional` **controls**: `object`

Defined in: [src/inject.ts:111](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/inject.ts#L111)

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

### grid?

> `optional` **grid**: [`GridOptions`](GridOptions.md)

Defined in: [src/inject.ts:132](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/inject.ts#L132)

Optional grid settings.

***

### initUndoRedo?

> `optional` **initUndoRedo**: `boolean`

Defined in: [src/inject.ts:109](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/inject.ts#L109)

Init the workspace's undo state for you, or not.

***

### moveSpeed?

> `optional` **moveSpeed**: `number`

Defined in: [src/inject.ts:125](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/inject.ts#L125)

Optional movement speed of the workspace

***

### renderer?

> `optional` **renderer**: `string` \| *typeof* [`Renderer`](../classes/Renderer.md)

Defined in: [src/inject.ts:128](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/inject.ts#L128)

Optional renderer: name string or class

***

### rendererOverrides?

> `optional` **rendererOverrides**: `object`

Defined in: [src/inject.ts:103](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/inject.ts#L103)

Optional renderer overrides

#### Index Signature

\[`key`: `string`\]: `any`

***

### theme?

> `optional` **theme**: `string` \| `WSTheme`

Defined in: [src/inject.ts:105](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/inject.ts#L105)

Theme for the workspace

***

### toolbox?

> `optional` **toolbox**: [`TblxObjStruct`](../type-aliases/TblxObjStruct.md)

Defined in: [src/inject.ts:122](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/inject.ts#L122)

Optional toolbox structure
