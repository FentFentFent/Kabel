[**Kabel Project Docs v1.0.6**](../README.md)

***

[Kabel Project Docs](../globals.md) / RepresenterNode

# Class: RepresenterNode

Defined in: [renderers/representer-node.ts:9](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/renderers/representer-node.ts#L9)

## Constructors

### Constructor

> **new RepresenterNode**(`node`, `svgState`, `renderer`): `RepresenterNode`

Defined in: [renderers/representer-node.ts:13](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/renderers/representer-node.ts#L13)

#### Parameters

##### node

[`NodeSvg`](NodeSvg.md)

##### svgState

[`DrawState`](../interfaces/DrawState.md)

##### renderer

[`Renderer`](Renderer.md)

#### Returns

`RepresenterNode`

## Properties

### node

> **node**: [`NodeSvg`](NodeSvg.md)

Defined in: [renderers/representer-node.ts:10](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/renderers/representer-node.ts#L10)

***

### renderer

> **renderer**: [`Renderer`](Renderer.md)

Defined in: [renderers/representer-node.ts:12](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/renderers/representer-node.ts#L12)

***

### state

> **state**: [`DrawState`](../interfaces/DrawState.md)

Defined in: [renderers/representer-node.ts:11](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/renderers/representer-node.ts#L11)

## Methods

### applyTransform()

> **applyTransform**(`transform`): `void`

Defined in: [renderers/representer-node.ts:35](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/renderers/representer-node.ts#L35)

Apply raw transform string

#### Parameters

##### transform

`string`

#### Returns

`void`

***

### getConstant()

> **getConstant**(`name`): `string` \| `number` \| `boolean` \| [`RGBObject`](../type-aliases/RGBObject.md) \| [`RGBTuple`](../type-aliases/RGBTuple.md) \| \{\[`key`: `string`\]: `object`; \}

Defined in: [renderers/representer-node.ts:21](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/renderers/representer-node.ts#L21)

#### Parameters

##### name

keyof [`RendererConstants`](RendererConstants.md)

#### Returns

`string` \| `number` \| `boolean` \| [`RGBObject`](../type-aliases/RGBObject.md) \| [`RGBTuple`](../type-aliases/RGBTuple.md) \| \{\[`key`: `string`\]: `object`; \}

***

### getRaw()

> **getRaw**(): `G` \| `null` \| `undefined`

Defined in: [renderers/representer-node.ts:40](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/renderers/representer-node.ts#L40)

Access the raw SVG group

#### Returns

`G` \| `null` \| `undefined`

***

### highlight()

> **highlight**(`color`): `void`

Defined in: [renderers/representer-node.ts:45](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/renderers/representer-node.ts#L45)

Optional: highlight node

#### Parameters

##### color

`string` = `'#ff0'`

#### Returns

`void`

***

### moveTo()

> **moveTo**(`x`, `y`): `void`

Defined in: [renderers/representer-node.ts:25](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/renderers/representer-node.ts#L25)

Move node visually without changing its relativeCoords

#### Parameters

##### x

`number`

##### y

`number`

#### Returns

`void`

***

### setScale()

> **setScale**(`scale`): `void`

Defined in: [renderers/representer-node.ts:30](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/renderers/representer-node.ts#L30)

Scale node visually

#### Parameters

##### scale

`number`

#### Returns

`void`
