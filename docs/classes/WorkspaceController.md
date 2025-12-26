[**Kabel Project Docs v1.0.6**](../README.md)

***

[Kabel Project Docs](../globals.md) / WorkspaceController

# Class: WorkspaceController

Defined in: [controllers/base.ts:6](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/controllers/base.ts#L6)

## Extended by

- [`WASDController`](WASDController.md)

## Constructors

### Constructor

> **new WorkspaceController**(`workspace`): `WorkspaceController`

Defined in: [controllers/base.ts:23](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/controllers/base.ts#L23)

#### Parameters

##### workspace

[`WorkspaceSvg`](WorkspaceSvg.md)

#### Returns

`WorkspaceController`

## Properties

### \_lastMoveFire

> **\_lastMoveFire**: `number` = `0`

Defined in: [controllers/base.ts:17](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/controllers/base.ts#L17)

***

### \_moveThrottleMs

> **\_moveThrottleMs**: `number` = `100`

Defined in: [controllers/base.ts:18](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/controllers/base.ts#L18)

***

### \_moveTimeout

> **\_moveTimeout**: `any` = `null`

Defined in: [controllers/base.ts:20](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/controllers/base.ts#L20)

***

### \_queuedMove

> **\_queuedMove**: `boolean` = `false`

Defined in: [controllers/base.ts:19](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/controllers/base.ts#L19)

***

### \_updateInt

> **\_updateInt**: `any`

Defined in: [controllers/base.ts:21](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/controllers/base.ts#L21)

***

### isDragging

> **isDragging**: `boolean`

Defined in: [controllers/base.ts:13](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/controllers/base.ts#L13)

***

### keysDown

> **keysDown**: `Set`\<`string`\>

Defined in: [controllers/base.ts:9](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/controllers/base.ts#L9)

***

### lastMousePos

> **lastMousePos**: `Vec2`

Defined in: [controllers/base.ts:12](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/controllers/base.ts#L12)

***

### mouseBtns

> **mouseBtns**: `Set`\<`number`\>

Defined in: [controllers/base.ts:10](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/controllers/base.ts#L10)

***

### mousePos

> **mousePos**: `Vec2`

Defined in: [controllers/base.ts:11](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/controllers/base.ts#L11)

***

### movedListeners

> **movedListeners**: () => `void`[]

Defined in: [controllers/base.ts:16](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/controllers/base.ts#L16)

#### Returns

`void`

***

### wheelDelta

> **wheelDelta**: `number`

Defined in: [controllers/base.ts:15](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/controllers/base.ts#L15)

***

### workspace

> **workspace**: [`WorkspaceSvg`](WorkspaceSvg.md)

Defined in: [controllers/base.ts:7](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/controllers/base.ts#L7)

## Methods

### \_setupListeners()

> `private` **\_setupListeners**(): `void`

Defined in: [controllers/base.ts:91](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/controllers/base.ts#L91)

#### Returns

`void`

***

### \_throttledFireDidMove()

> **\_throttledFireDidMove**(): `void`

Defined in: [controllers/base.ts:63](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/controllers/base.ts#L63)

#### Returns

`void`

***

### addMoveListener()

> **addMoveListener**(`cb`): `void`

Defined in: [controllers/base.ts:38](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/controllers/base.ts#L38)

#### Parameters

##### cb

() => `void`

#### Returns

`void`

***

### canMove()

> **canMove**(): `boolean`

Defined in: [controllers/base.ts:88](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/controllers/base.ts#L88)

#### Returns

`boolean`

***

### centerOn()

> **centerOn**(`pos`): `void`

Defined in: [controllers/base.ts:146](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/controllers/base.ts#L146)

#### Parameters

##### pos

`Vec2`

#### Returns

`void`

***

### fireDidMove()

> **fireDidMove**(): `void`

Defined in: [controllers/base.ts:47](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/controllers/base.ts#L47)

#### Returns

`void`

***

### getZoom()

> **getZoom**(): `number`

Defined in: [controllers/base.ts:85](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/controllers/base.ts#L85)

#### Returns

`number`

***

### pan()

> **pan**(`dx`, `dy`): `void`

Defined in: [controllers/base.ts:120](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/controllers/base.ts#L120)

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

Defined in: [controllers/base.ts:178](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/controllers/base.ts#L178)

#### Returns

`void`

***

### refreshPos()

> **refreshPos**(): `void`

Defined in: [controllers/base.ts:174](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/controllers/base.ts#L174)

#### Returns

`void`

***

### removeMoveListener()

> **removeMoveListener**(`cb`): `void`

Defined in: [controllers/base.ts:42](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/controllers/base.ts#L42)

#### Parameters

##### cb

() => `void`

#### Returns

`void`

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

***

### setCamera()

> **setCamera**(`pos`): `void`

Defined in: [controllers/base.ts:133](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/controllers/base.ts#L133)

#### Parameters

##### pos

`Vec2`

#### Returns

`void`

***

### stop()

> **stop**(): `void`

Defined in: [controllers/base.ts:183](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/controllers/base.ts#L183)

#### Returns

`void`

***

### update()

> **update**(): `void`

Defined in: [controllers/base.ts:115](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/controllers/base.ts#L115)

#### Returns

`void`

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
