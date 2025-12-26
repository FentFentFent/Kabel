[**Kabel Project Docs v1.0.6**](../README.md)

***

[Kabel Project Docs](../globals.md) / ContextMenuHTML

# Class: ContextMenuHTML

Defined in: [src/context-menu.ts:37](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/context-menu.ts#L37)

HTML context menu rendered on workspace right-click.

## Constructors

### Constructor

> **new ContextMenuHTML**(`workspace`): `ContextMenuHTML`

Defined in: [src/context-menu.ts:59](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/context-menu.ts#L59)

Create a new context menu for a workspace.

#### Parameters

##### workspace

[`WorkspaceSvg`](WorkspaceSvg.md)

Workspace to attach the context menu to

#### Returns

`ContextMenuHTML`

## Properties

### controller

> **controller**: [`WorkspaceController`](WorkspaceController.md)

Defined in: [src/context-menu.ts:45](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/context-menu.ts#L45)

The workspace's controller

***

### options

> **options**: `ContextMenuOpts`[]

Defined in: [src/context-menu.ts:53](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/context-menu.ts#L53)

Options for the context menu.

***

### widget

> **widget**: [`Widget`](Widget.md)

Defined in: [src/context-menu.ts:49](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/context-menu.ts#L49)

The widget in the workspace to display the menu on.

***

### workspace

> **workspace**: [`WorkspaceSvg`](WorkspaceSvg.md)

Defined in: [src/context-menu.ts:41](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/context-menu.ts#L41)

The workspace.

## Accessors

### mousePos

#### Get Signature

> **get** **mousePos**(): `object`

Defined in: [src/context-menu.ts:154](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/context-menu.ts#L154)

Returns the current mouse position in workspace coordinates

##### Returns

`object`

###### x

> **x**: `number`

###### y

> **y**: `number`

***

### target

#### Get Signature

> **get** **target**(): [`NodeSvg`](NodeSvg.md) \| [`WorkspaceSvg`](WorkspaceSvg.md) \| `HTMLElement` \| [`CommentModel`](CommentModel.md) \| `null`

Defined in: [src/context-menu.ts:161](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/context-menu.ts#L161)

Returns the target element under the mouse for context menu.

##### Returns

[`NodeSvg`](NodeSvg.md) \| [`WorkspaceSvg`](WorkspaceSvg.md) \| `HTMLElement` \| [`CommentModel`](CommentModel.md) \| `null`

## Methods

### hide()

> **hide**(): `void`

Defined in: [src/context-menu.ts:149](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/context-menu.ts#L149)

Hides the context menu

#### Returns

`void`

***

### initListeners()

> **initListeners**(): `void`

Defined in: [src/context-menu.ts:125](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/context-menu.ts#L125)

Initializes event listeners for showing/hiding the menu.

#### Returns

`void`

***

### renderOptions()

> **renderOptions**(`target`): `void`

Defined in: [src/context-menu.ts:91](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/context-menu.ts#L91)

Renders context menu options for a given target.

#### Parameters

##### target

The object the context menu is for

[`NodeSvg`](NodeSvg.md) | [`WorkspaceSvg`](WorkspaceSvg.md) | `HTMLElement` | [`CommentModel`](CommentModel.md) | `null`

#### Returns

`void`
