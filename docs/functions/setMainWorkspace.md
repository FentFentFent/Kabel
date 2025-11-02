[**Kabel Project Docs v1.0.4**](../README.md)

***

[Kabel Project Docs](../globals.md) / setMainWorkspace

# Function: setMainWorkspace()

> **setMainWorkspace**(`ws`): [`WorkspaceSvg`](../classes/WorkspaceSvg.md) \| `null`

Defined in: [src/main-workspace.ts:25](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/main-workspace.ts#L25)

Sets the main workspace reference.
Calling this updates the global "main workspace" for Kabel.

## Parameters

### ws

The WorkspaceSvg instance to set as main, or null to clear.

[`WorkspaceSvg`](../classes/WorkspaceSvg.md) | `null`

## Returns

[`WorkspaceSvg`](../classes/WorkspaceSvg.md) \| `null`

The workspace that was set.
