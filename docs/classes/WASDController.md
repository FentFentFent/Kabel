[**Kabel Project Docs v1.0.4**](../README.md)

***

[Kabel Project Docs](../globals.md) / WASDController

# Class: WASDController

Defined in: [controllers/wasd.ts:7](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/controllers/wasd.ts#L7)

## Extends

- [`WorkspaceController`](WorkspaceController.md)

## Constructors

### Constructor

> **new WASDController**(`workspace`, `moveSpeed?`): `WASDController`

Defined in: [controllers/wasd.ts:18](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/controllers/wasd.ts#L18)

#### Parameters

##### workspace

[`WorkspaceSvg`](WorkspaceSvg.md)

##### moveSpeed?

`number`

#### Returns

`WASDController`

#### Overrides

[`WorkspaceController`](WorkspaceController.md).[`constructor`](WorkspaceController.md#constructor)

## Properties

### accelSpeed

> **accelSpeed**: `number`

Defined in: [controllers/wasd.ts:10](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/controllers/wasd.ts#L10)

***

### doAccelerate?

> `optional` **doAccelerate**: `boolean`

Defined in: [controllers/wasd.ts:9](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/controllers/wasd.ts#L9)

***

### friction

> **friction**: `number`

Defined in: [controllers/wasd.ts:11](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/controllers/wasd.ts#L11)

***

### isDragging

> **isDragging**: `boolean`

Defined in: [controllers/base.ts:13](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/controllers/base.ts#L13)

#### Inherited from

[`WorkspaceController`](WorkspaceController.md).[`isDragging`](WorkspaceController.md#isdragging)

***

### keysDown

> **keysDown**: `Set`\<`string`\>

Defined in: [controllers/base.ts:9](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/controllers/base.ts#L9)

#### Inherited from

[`WorkspaceController`](WorkspaceController.md).[`keysDown`](WorkspaceController.md#keysdown)

***

### lastMousePos

> **lastMousePos**: `Vec2`

Defined in: [controllers/base.ts:12](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/controllers/base.ts#L12)

#### Inherited from

[`WorkspaceController`](WorkspaceController.md).[`lastMousePos`](WorkspaceController.md#lastmousepos)

***

### maxZoom

> **maxZoom**: `number`

Defined in: [controllers/wasd.ts:16](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/controllers/wasd.ts#L16)

***

### minZoom

> **minZoom**: `number`

Defined in: [controllers/wasd.ts:15](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/controllers/wasd.ts#L15)

***

### mouseBtns

> **mouseBtns**: `Set`\<`number`\>

Defined in: [controllers/base.ts:10](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/controllers/base.ts#L10)

#### Inherited from

[`WorkspaceController`](WorkspaceController.md).[`mouseBtns`](WorkspaceController.md#mousebtns)

***

### mousePos

> **mousePos**: `Vec2`

Defined in: [controllers/base.ts:11](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/controllers/base.ts#L11)

#### Inherited from

[`WorkspaceController`](WorkspaceController.md).[`mousePos`](WorkspaceController.md#mousepos)

***

### moveSpeed

> **moveSpeed**: `number`

Defined in: [controllers/wasd.ts:8](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/controllers/wasd.ts#L8)

***

### velocity

> **velocity**: `Vec2`

Defined in: [controllers/wasd.ts:12](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/controllers/wasd.ts#L12)

***

### wheelDelta

> **wheelDelta**: `number`

Defined in: [controllers/base.ts:15](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/controllers/base.ts#L15)

#### Inherited from

[`WorkspaceController`](WorkspaceController.md).[`wheelDelta`](WorkspaceController.md#wheeldelta)

***

### workspace

> **workspace**: [`WorkspaceSvg`](WorkspaceSvg.md)

Defined in: [controllers/base.ts:7](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/controllers/base.ts#L7)

#### Inherited from

[`WorkspaceController`](WorkspaceController.md).[`workspace`](WorkspaceController.md#workspace)

***

### zoom

> **zoom**: `number` = `1`

Defined in: [controllers/wasd.ts:13](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/controllers/wasd.ts#L13)

***

### zoomSpeed

> **zoomSpeed**: `number`

Defined in: [controllers/wasd.ts:14](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/controllers/wasd.ts#L14)

## Methods

### canMove()

> **canMove**(): `boolean`

Defined in: [controllers/wasd.ts:37](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/controllers/wasd.ts#L37)

#### Returns

`boolean`

#### Overrides

[`WorkspaceController`](WorkspaceController.md).[`canMove`](WorkspaceController.md#canmove)

***

### centerOn()

> **centerOn**(`pos`): `void`

Defined in: [controllers/base.ts:80](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/controllers/base.ts#L80)

#### Parameters

##### pos

`Vec2`

#### Returns

`void`

#### Inherited from

[`WorkspaceController`](WorkspaceController.md).[`centerOn`](WorkspaceController.md#centeron)

***

### getZoom()

> **getZoom**(): `number`

Defined in: [controllers/wasd.ts:105](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/controllers/wasd.ts#L105)

Returns current zoom level

#### Returns

`number`

#### Overrides

[`WorkspaceController`](WorkspaceController.md).[`getZoom`](WorkspaceController.md#getzoom)

***

### onWheel()

> **onWheel**(`e`): `void`

Defined in: [controllers/wasd.ts:78](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/controllers/wasd.ts#L78)

Handles wheel events for zooming.
Zooms around the mouse position for intuitive zooming.

#### Parameters

##### e

`WheelEvent`

#### Returns

`void`

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

#### Inherited from

[`WorkspaceController`](WorkspaceController.md).[`pan`](WorkspaceController.md#pan)

***

### redraw()

> **redraw**(): `void`

Defined in: [controllers/base.ts:112](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/controllers/base.ts#L112)

#### Returns

`void`

#### Inherited from

[`WorkspaceController`](WorkspaceController.md).[`redraw`](WorkspaceController.md#redraw)

***

### refreshPos()

> **refreshPos**(): `void`

Defined in: [controllers/base.ts:108](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/controllers/base.ts#L108)

#### Returns

`void`

#### Inherited from

[`WorkspaceController`](WorkspaceController.md).[`refreshPos`](WorkspaceController.md#refreshpos)

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

#### Inherited from

[`WorkspaceController`](WorkspaceController.md).[`screenToWorkspace`](WorkspaceController.md#screentoworkspace)

***

### setCamera()

> **setCamera**(`pos`): `void`

Defined in: [controllers/base.ts:74](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/controllers/base.ts#L74)

#### Parameters

##### pos

`Vec2`

#### Returns

`void`

#### Inherited from

[`WorkspaceController`](WorkspaceController.md).[`setCamera`](WorkspaceController.md#setcamera)

***

### setZoom()

> **setZoom**(`zoom`): `void`

Defined in: [controllers/wasd.ts:110](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/controllers/wasd.ts#L110)

Sets zoom directly

#### Parameters

##### zoom

`number`

#### Returns

`void`

***

### stop()

> **stop**(): `void`

Defined in: [controllers/base.ts:117](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/controllers/base.ts#L117)

#### Returns

`void`

#### Inherited from

[`WorkspaceController`](WorkspaceController.md).[`stop`](WorkspaceController.md#stop)

***

### update()

> **update**(): `void`

Defined in: [controllers/wasd.ts:41](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/controllers/wasd.ts#L41)

#### Returns

`void`

#### Overrides

[`WorkspaceController`](WorkspaceController.md).[`update`](WorkspaceController.md#update)

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

#### Inherited from

[`WorkspaceController`](WorkspaceController.md).[`workspaceToScreen`](WorkspaceController.md#workspacetoscreen)
