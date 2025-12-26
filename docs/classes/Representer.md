[**Kabel Project Docs v1.0.6**](../README.md)

***

[Kabel Project Docs](../globals.md) / Representer

# Class: Representer

Defined in: [renderers/representer.ts:5](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/renderers/representer.ts#L5)

## Constructors

### Constructor

> **new Representer**(): `Representer`

#### Returns

`Representer`

## Properties

### nodes

> **nodes**: `Map`\<`string`, [`RepresenterNode`](RepresenterNode.md)\>

Defined in: [renderers/representer.ts:6](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/renderers/representer.ts#L6)

## Methods

### build()

> **build**(`node`, `renderer`, `state`): [`RepresenterNode`](RepresenterNode.md) \| `undefined`

Defined in: [renderers/representer.ts:9](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/renderers/representer.ts#L9)

Build a representer node for a drawn node

#### Parameters

##### node

[`NodeSvg`](NodeSvg.md)

##### renderer

[`Renderer`](Renderer.md)

##### state

[`DrawState`](../interfaces/DrawState.md)

#### Returns

[`RepresenterNode`](RepresenterNode.md) \| `undefined`

***

### get()

> **get**(`nodeId`): [`RepresenterNode`](RepresenterNode.md) \| `undefined`

Defined in: [renderers/representer.ts:17](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/renderers/representer.ts#L17)

Get a representer node by node id

#### Parameters

##### nodeId

`string`

#### Returns

[`RepresenterNode`](RepresenterNode.md) \| `undefined`

***

### remove()

> **remove**(`nodeId`): `void`

Defined in: [renderers/representer.ts:22](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/renderers/representer.ts#L22)

Remove a node from the representer

#### Parameters

##### nodeId

`string`

#### Returns

`void`
