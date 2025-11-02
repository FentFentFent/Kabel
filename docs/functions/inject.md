[**Kabel Project Docs v1.0.4**](../README.md)

***

[Kabel Project Docs](../globals.md) / inject

# Function: inject()

> **inject**(`element`, `options`): [`WorkspaceSvg`](../classes/WorkspaceSvg.md) \| `undefined`

Defined in: [src/inject.ts:145](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/inject.ts#L145)

Injects a new Kabel workspace into the document.
Appends the workspace container to the given element (or element ID) and
sets it as the main workspace.

## Parameters

### element

HTMLElement or string ID to attach the workspace to

`string` | `HTMLElement`

### options

[`InjectOptions`](../interfaces/InjectOptions.md) = `{}`

Optional InjectOptions to configure the workspace

## Returns

[`WorkspaceSvg`](../classes/WorkspaceSvg.md) \| `undefined`

The newly created WorkspaceSvg instance, or undefined if injection failed
