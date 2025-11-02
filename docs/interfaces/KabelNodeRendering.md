[**Kabel Project Docs v1.0.4**](../README.md)

***

[Kabel Project Docs](../globals.md) / KabelNodeRendering

# Interface: KabelNodeRendering

Defined in: [src/types.ts:62](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/types.ts#L62)

Node rendering utilities and classes.

## Properties

### Renderer

> **Renderer**: *typeof* [`Renderer`](../classes/Renderer.md)

Defined in: [src/types.ts:67](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/types.ts#L67)

Node renderer class.

***

### RendererConstants

> **RendererConstants**: *typeof* [`RendererConstants`](../classes/RendererConstants.md)

Defined in: [src/types.ts:70](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/types.ts#L70)

Constant class to be instantiated and used in node rendering.

***

### rendererMap

> **rendererMap**: *typeof* `RMap`

Defined in: [src/types.ts:64](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/types.ts#L64)

Map of registered node renderers.

***

### Representer

> **Representer**: *typeof* [`Representer`](../classes/Representer.md)

Defined in: [src/types.ts:74](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/types.ts#L74)

used by the renderer to create RepresenterNodes for each rendered node. (node.svg API is provided by this)

***

### RepresenterNode

> **RepresenterNode**: *typeof* [`RepresenterNode`](../classes/RepresenterNode.md)

Defined in: [src/types.ts:78](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/types.ts#L78)

Class behind node.svg API. Represents a renderer's DrawState.
