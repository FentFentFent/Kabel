[**Kabel Project Docs v1.0.4**](../README.md)

***

[Kabel Project Docs](../globals.md) / WorkspaceController

# Class: WorkspaceController

Defined in: [controllers/base.ts:6](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/controllers/base.ts#L6)

## Extended by

- [`WASDController`](WASDController.md)

## Constructors

### Constructor

> **new WorkspaceController**(`workspace`): `WorkspaceController`

Defined in: [controllers/base.ts:19](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/controllers/base.ts#L19)

#### Parameters

##### workspace

[`WorkspaceSvg`](WorkspaceSvg.md)

#### Returns

`WorkspaceController`

## Properties

### \_updateInt

> `private` **\_updateInt**: `any`

Defined in: [controllers/base.ts:17](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/controllers/base.ts#L17)

***

### isDragging

> **isDragging**: `boolean`

Defined in: [controllers/base.ts:13](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/controllers/base.ts#L13)

***

### keysDown

> **keysDown**: `Set`\<`string`\>

Defined in: [controllers/base.ts:9](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/controllers/base.ts#L9)

***

### lastMousePos

> **lastMousePos**: `Vec2`

Defined in: [controllers/base.ts:12](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/controllers/base.ts#L12)

***

### mouseBtns

> **mouseBtns**: `Set`\<`number`\>

Defined in: [controllers/base.ts:10](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/controllers/base.ts#L10)

***

### mousePos

> **mousePos**: `Vec2`

Defined in: [controllers/base.ts:11](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/controllers/base.ts#L11)

***

### wheelDelta

> **wheelDelta**: `number`

Defined in: [controllers/base.ts:15](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/controllers/base.ts#L15)

***

### workspace

> **workspace**: [`WorkspaceSvg`](WorkspaceSvg.md)

Defined in: [controllers/base.ts:7](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/controllers/base.ts#L7)

## Methods

### \_setupListeners()

> `private` **\_setupListeners**(): `void`

Defined in: [controllers/base.ts:39](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/controllers/base.ts#L39)

#### Returns

`void`

***

### canMove()

> **canMove**(): `boolean`

Defined in: [controllers/base.ts:36](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/controllers/base.ts#L36)

#### Returns

`boolean`

***

### centerOn()

> **centerOn**(`pos`): `void`

Defined in: [controllers/base.ts:80](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/controllers/base.ts#L80)

#### Parameters

##### pos

`Vec2`

#### Returns

`void`

***

### getZoom()

> **getZoom**(): `number`

Defined in: [controllers/base.ts:33](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/controllers/base.ts#L33)

#### Returns

`number`

***

### pan()

> **pan**(`dx`, `dy`): `void`

Defined in: [controllers/base.ts:68](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/controllers/base.ts#L68)

#### Parameters

##### dx

`number`

##### dy

`number`

#### Returns

`void`

***

### redraw()

> **redraw**(): `void`

Defined in: [controllers/base.ts:112](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/controllers/base.ts#L112)

#### Returns

`void`

***

### refreshPos()

> **refreshPos**(): `void`

Defined in: [controllers/base.ts:108](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/controllers/base.ts#L108)

#### Returns

`void`

***

### screenToWorkspace()

> **screenToWorkspace**(`x`, `y`): `Vec2`

Defined in: [controllers/base.ts:91](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/controllers/base.ts#L91)

#### Parameters

##### x

`number`

##### y

`number`

#### Returns

`Vec2`

***

### setCamera()

> **setCamera**(`pos`): `void`

Defined in: [controllers/base.ts:74](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/controllers/base.ts#L74)

#### Parameters

##### pos

`Vec2`

#### Returns

`void`

***

### stop()

> **stop**(): `void`

Defined in: [controllers/base.ts:117](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/controllers/base.ts#L117)

#### Returns

`void`

***

### update()

> **update**(): `void`

Defined in: [controllers/base.ts:63](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/controllers/base.ts#L63)

#### Returns

`void`

***

### workspaceToScreen()

> **workspaceToScreen**(`x`, `y`): `Vec2`

Defined in: [controllers/base.ts:99](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/controllers/base.ts#L99)

#### Parameters

##### x

`number`

##### y

`number`

#### Returns

`Vec2`
