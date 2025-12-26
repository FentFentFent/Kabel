[**Kabel Project Docs v1.0.6**](../README.md)

***

[Kabel Project Docs](../globals.md) / WASDController

# Class: WASDController

Defined in: [controllers/wasd.ts:7](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/controllers/wasd.ts#L7)

## Extends

- [`WorkspaceController`](WorkspaceController.md)

## Constructors

### Constructor

> **new WASDController**(`workspace`, `moveSpeed?`): `WASDController`

Defined in: [controllers/wasd.ts:18](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/controllers/wasd.ts#L18)

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

### \_lastMoveFire

> **\_lastMoveFire**: `number` = `0`

Defined in: [controllers/base.ts:17](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/controllers/base.ts#L17)

#### Inherited from

[`WorkspaceController`](WorkspaceController.md).[`_lastMoveFire`](WorkspaceController.md#_lastmovefire)

***

### \_moveThrottleMs

> **\_moveThrottleMs**: `number` = `100`

Defined in: [controllers/base.ts:18](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/controllers/base.ts#L18)

#### Inherited from

[`WorkspaceController`](WorkspaceController.md).[`_moveThrottleMs`](WorkspaceController.md#_movethrottlems)

***

### \_moveTimeout

> **\_moveTimeout**: `any` = `null`

Defined in: [controllers/base.ts:20](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/controllers/base.ts#L20)

#### Inherited from

[`WorkspaceController`](WorkspaceController.md).[`_moveTimeout`](WorkspaceController.md#_movetimeout)

***

### \_queuedMove

> **\_queuedMove**: `boolean` = `false`

Defined in: [controllers/base.ts:19](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/controllers/base.ts#L19)

#### Inherited from

[`WorkspaceController`](WorkspaceController.md).[`_queuedMove`](WorkspaceController.md#_queuedmove)

***

### \_updateInt

> **\_updateInt**: `any`

Defined in: [controllers/base.ts:21](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/controllers/base.ts#L21)

#### Inherited from

[`WorkspaceController`](WorkspaceController.md).[`_updateInt`](WorkspaceController.md#_updateint)

***

### accelSpeed

> **accelSpeed**: `number`

Defined in: [controllers/wasd.ts:10](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/controllers/wasd.ts#L10)

***

### doAccelerate?

> `optional` **doAccelerate**: `boolean`

Defined in: [controllers/wasd.ts:9](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/controllers/wasd.ts#L9)

***

### friction

> **friction**: `number`

Defined in: [controllers/wasd.ts:11](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/controllers/wasd.ts#L11)

***

### isDragging

> **isDragging**: `boolean`

Defined in: [controllers/base.ts:13](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/controllers/base.ts#L13)

#### Inherited from

[`WorkspaceController`](WorkspaceController.md).[`isDragging`](WorkspaceController.md#isdragging)

***

### isFalloff

> **isFalloff**: `boolean`

Defined in: [controllers/wasd.ts:17](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/controllers/wasd.ts#L17)

***

### keysDown

> **keysDown**: `Set`\<`string`\>

Defined in: [controllers/base.ts:9](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/controllers/base.ts#L9)

#### Inherited from

[`WorkspaceController`](WorkspaceController.md).[`keysDown`](WorkspaceController.md#keysdown)

***

### lastMousePos

> **lastMousePos**: `Vec2`

Defined in: [controllers/base.ts:12](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/controllers/base.ts#L12)

#### Inherited from

[`WorkspaceController`](WorkspaceController.md).[`lastMousePos`](WorkspaceController.md#lastmousepos)

***

### maxZoom

> **maxZoom**: `number`

Defined in: [controllers/wasd.ts:16](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/controllers/wasd.ts#L16)

***

### minZoom

> **minZoom**: `number`

Defined in: [controllers/wasd.ts:15](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/controllers/wasd.ts#L15)

***

### mouseBtns

> **mouseBtns**: `Set`\<`number`\>

Defined in: [controllers/base.ts:10](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/controllers/base.ts#L10)

#### Inherited from

[`WorkspaceController`](WorkspaceController.md).[`mouseBtns`](WorkspaceController.md#mousebtns)

***

### mousePos

> **mousePos**: `Vec2`

Defined in: [controllers/base.ts:11](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/controllers/base.ts#L11)

#### Inherited from

[`WorkspaceController`](WorkspaceController.md).[`mousePos`](WorkspaceController.md#mousepos)

***

### movedListeners

> **movedListeners**: () => `void`[]

Defined in: [controllers/base.ts:16](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/controllers/base.ts#L16)

#### Returns

`void`

#### Inherited from

[`WorkspaceController`](WorkspaceController.md).[`movedListeners`](WorkspaceController.md#movedlisteners)

***

### moveSpeed

> **moveSpeed**: `number`

Defined in: [controllers/wasd.ts:8](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/controllers/wasd.ts#L8)

***

### velocity

> **velocity**: `Vec2`

Defined in: [controllers/wasd.ts:12](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/controllers/wasd.ts#L12)

***

### wheelDelta

> **wheelDelta**: `number`

Defined in: [controllers/base.ts:15](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/controllers/base.ts#L15)

#### Inherited from

[`WorkspaceController`](WorkspaceController.md).[`wheelDelta`](WorkspaceController.md#wheeldelta)

***

### workspace

> **workspace**: [`WorkspaceSvg`](WorkspaceSvg.md)

Defined in: [controllers/base.ts:7](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/controllers/base.ts#L7)

#### Inherited from

[`WorkspaceController`](WorkspaceController.md).[`workspace`](WorkspaceController.md#workspace)

***

### zoom

> **zoom**: `number` = `1`

Defined in: [controllers/wasd.ts:13](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/controllers/wasd.ts#L13)

***

### zoomSpeed

> **zoomSpeed**: `number`

Defined in: [controllers/wasd.ts:14](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/controllers/wasd.ts#L14)

## Methods

### \_throttledFireDidMove()

> **\_throttledFireDidMove**(): `void`

Defined in: [controllers/base.ts:63](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/controllers/base.ts#L63)

#### Returns

`void`

#### Inherited from

[`WorkspaceController`](WorkspaceController.md).[`_throttledFireDidMove`](WorkspaceController.md#_throttledfiredidmove)

***

### addMoveListener()

> **addMoveListener**(`cb`): `void`

Defined in: [controllers/base.ts:38](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/controllers/base.ts#L38)

#### Parameters

##### cb

() => `void`

#### Returns

`void`

#### Inherited from

[`WorkspaceController`](WorkspaceController.md).[`addMoveListener`](WorkspaceController.md#addmovelistener)

***

### canMove()

> **canMove**(): `boolean`

Defined in: [controllers/wasd.ts:38](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/controllers/wasd.ts#L38)

#### Returns

`boolean`

#### Overrides

[`WorkspaceController`](WorkspaceController.md).[`canMove`](WorkspaceController.md#canmove)

***

### centerOn()

> **centerOn**(`pos`): `void`

Defined in: [controllers/base.ts:146](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/controllers/base.ts#L146)

#### Parameters

##### pos

`Vec2`

#### Returns

`void`

#### Inherited from

[`WorkspaceController`](WorkspaceController.md).[`centerOn`](WorkspaceController.md#centeron)

***

### fireDidMove()

> **fireDidMove**(): `void`

Defined in: [controllers/base.ts:47](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/controllers/base.ts#L47)

#### Returns

`void`

#### Inherited from

[`WorkspaceController`](WorkspaceController.md).[`fireDidMove`](WorkspaceController.md#firedidmove)

***

### getZoom()

> **getZoom**(): `number`

Defined in: [controllers/wasd.ts:124](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/controllers/wasd.ts#L124)

Returns current zoom level

#### Returns

`number`

#### Overrides

[`WorkspaceController`](WorkspaceController.md).[`getZoom`](WorkspaceController.md#getzoom)

***

### onWheel()

> **onWheel**(`e`): `void`

Defined in: [controllers/wasd.ts:97](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/controllers/wasd.ts#L97)

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

Defined in: [controllers/wasd.ts:78](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/controllers/wasd.ts#L78)

#### Parameters

##### dx

`number`

##### dy

`number`

#### Returns

`void`

#### Overrides

[`WorkspaceController`](WorkspaceController.md).[`pan`](WorkspaceController.md#pan)

***

### redraw()

> **redraw**(): `void`

Defined in: [controllers/base.ts:178](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/controllers/base.ts#L178)

#### Returns

`void`

#### Inherited from

[`WorkspaceController`](WorkspaceController.md).[`redraw`](WorkspaceController.md#redraw)

***

### refreshPos()

> **refreshPos**(): `void`

Defined in: [controllers/base.ts:174](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/controllers/base.ts#L174)

#### Returns

`void`

#### Inherited from

[`WorkspaceController`](WorkspaceController.md).[`refreshPos`](WorkspaceController.md#refreshpos)

***

### removeMoveListener()

> **removeMoveListener**(`cb`): `void`

Defined in: [controllers/base.ts:42](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/controllers/base.ts#L42)

#### Parameters

##### cb

() => `void`

#### Returns

`void`

#### Inherited from

[`WorkspaceController`](WorkspaceController.md).[`removeMoveListener`](WorkspaceController.md#removemovelistener)

***

### screenToWorkspace()

> **screenToWorkspace**(`x`, `y`): `Vec2`

Defined in: [controllers/base.ts:157](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/controllers/base.ts#L157)

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

Defined in: [controllers/base.ts:133](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/controllers/base.ts#L133)

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

Defined in: [controllers/wasd.ts:129](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/controllers/wasd.ts#L129)

Sets zoom directly

#### Parameters

##### zoom

`number`

#### Returns

`void`

***

### stop()

> **stop**(): `void`

Defined in: [controllers/base.ts:183](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/controllers/base.ts#L183)

#### Returns

`void`

#### Inherited from

[`WorkspaceController`](WorkspaceController.md).[`stop`](WorkspaceController.md#stop)

***

### update()

> **update**(): `void`

Defined in: [controllers/wasd.ts:42](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/controllers/wasd.ts#L42)

#### Returns

`void`

#### Overrides

[`WorkspaceController`](WorkspaceController.md).[`update`](WorkspaceController.md#update)

***

### workspaceToScreen()

> **workspaceToScreen**(`x`, `y`): `Vec2`

Defined in: [controllers/base.ts:165](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/controllers/base.ts#L165)

#### Parameters

##### x

`number`

##### y

`number`

#### Returns

`Vec2`

#### Inherited from

[`WorkspaceController`](WorkspaceController.md).[`workspaceToScreen`](WorkspaceController.md#workspacetoscreen)
