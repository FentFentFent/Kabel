[**Kabel Project Docs v1.0.6**](../README.md)

***

[Kabel Project Docs](../globals.md) / setMainWorkspace

# Function: setMainWorkspace()

> **setMainWorkspace**(`ws`): [`WorkspaceSvg`](../classes/WorkspaceSvg.md) \| `Workspace` \| `null`

Defined in: [src/main-workspace.ts:26](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/main-workspace.ts#L26)

Sets the main workspace reference.
Calling this updates the global "main workspace" for Kabel.

## Parameters

### ws

The WorkspaceSvg instance to set as main, or null to clear.

[`WorkspaceSvg`](../classes/WorkspaceSvg.md) | `Workspace` | `null`

## Returns

[`WorkspaceSvg`](../classes/WorkspaceSvg.md) \| `Workspace` \| `null`

The workspace that was set.
