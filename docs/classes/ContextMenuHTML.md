[**Kabel Project Docs v1.0.4**](../README.md)

***

[Kabel Project Docs](../globals.md) / ContextMenuHTML

# Class: ContextMenuHTML

Defined in: [src/context-menu.ts:33](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/context-menu.ts#L33)

HTML context menu rendered on workspace right-click.

## Constructors

### Constructor

> **new ContextMenuHTML**(`workspace`): `ContextMenuHTML`

Defined in: [src/context-menu.ts:43](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/context-menu.ts#L43)

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

Defined in: [src/context-menu.ts:35](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/context-menu.ts#L35)

***

### options

> **options**: `ContextMenuOpts`[]

Defined in: [src/context-menu.ts:37](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/context-menu.ts#L37)

***

### widget

> **widget**: [`Widget`](Widget.md)

Defined in: [src/context-menu.ts:36](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/context-menu.ts#L36)

***

### workspace

> **workspace**: [`WorkspaceSvg`](WorkspaceSvg.md)

Defined in: [src/context-menu.ts:34](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/context-menu.ts#L34)

## Accessors

### mousePos

#### Get Signature

> **get** **mousePos**(): `object`

Defined in: [src/context-menu.ts:132](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/context-menu.ts#L132)

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

> **get** **target**(): [`CommentModel`](CommentModel.md) \| [`NodeSvg`](NodeSvg.md) \| [`WorkspaceSvg`](WorkspaceSvg.md) \| `HTMLElement` \| `null`

Defined in: [src/context-menu.ts:139](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/context-menu.ts#L139)

Returns the target element under the mouse for context menu.

##### Returns

[`CommentModel`](CommentModel.md) \| [`NodeSvg`](NodeSvg.md) \| [`WorkspaceSvg`](WorkspaceSvg.md) \| `HTMLElement` \| `null`

## Methods

### hide()

> **hide**(): `void`

Defined in: [src/context-menu.ts:127](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/context-menu.ts#L127)

Hides the context menu

#### Returns

`void`

***

### initListeners()

> **initListeners**(): `void`

Defined in: [src/context-menu.ts:108](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/context-menu.ts#L108)

Initializes event listeners for showing/hiding the menu.

#### Returns

`void`

***

### renderOptions()

> **renderOptions**(`target`): `void`

Defined in: [src/context-menu.ts:75](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/context-menu.ts#L75)

Renders context menu options for a given target.

#### Parameters

##### target

The object the context menu is for

[`CommentModel`](CommentModel.md) | [`NodeSvg`](NodeSvg.md) | [`WorkspaceSvg`](WorkspaceSvg.md) | `HTMLElement` | `null`

#### Returns

`void`
