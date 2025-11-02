[**Kabel Project Docs v1.0.4**](../README.md)

***

[Kabel Project Docs](../globals.md) / Representer

# Class: Representer

Defined in: renderers/representer.ts:5

## Constructors

### Constructor

> **new Representer**(): `Representer`

#### Returns

`Representer`

## Properties

### nodes

> **nodes**: `Map`\<`string`, [`RepresenterNode`](RepresenterNode.md)\>

Defined in: renderers/representer.ts:6

## Methods

### build()

> **build**(`node`, `renderer`, `state`): [`RepresenterNode`](RepresenterNode.md) \| `undefined`

Defined in: renderers/representer.ts:9

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

Defined in: renderers/representer.ts:17

Get a representer node by node id

#### Parameters

##### nodeId

`string`

#### Returns

[`RepresenterNode`](RepresenterNode.md) \| `undefined`

***

### remove()

> **remove**(`nodeId`): `void`

Defined in: renderers/representer.ts:22

Remove a node from the representer

#### Parameters

##### nodeId

`string`

#### Returns

`void`
