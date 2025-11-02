[**Kabel Project Docs v1.0.4**](../README.md)

***

[Kabel Project Docs](../globals.md) / Toolbox

# Class: Toolbox

Defined in: [src/toolbox.ts:10](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/toolbox.ts#L10)

Represents the toolbox in a Kabel workspace.
The toolbox can be either a flyout or a category-based toolbox.

## Constructors

### Constructor

> **new Toolbox**(`workspace`): `Toolbox`

Defined in: [src/toolbox.ts:36](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/toolbox.ts#L36)

Creates a new Toolbox instance attached to a workspace.

#### Parameters

##### workspace

[`WorkspaceSvg`](WorkspaceSvg.md)

The workspace instance to attach this toolbox to

#### Returns

`Toolbox`

## Properties

### \_categories

> **\_categories**: `Category`[] = `[]`

Defined in: [src/toolbox.ts:30](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/toolbox.ts#L30)

List of categories (if using a category toolbox)

***

### \_contents

> **\_contents**: [`TblxNodeStruct`](../interfaces/TblxNodeStruct.md)[] \| [`TblxCategoryStruct`](../interfaces/TblxCategoryStruct.md)[]

Defined in: [src/toolbox.ts:24](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/toolbox.ts#L24)

Contents of the toolbox (nodes or categories)

***

### \_flyout

> **\_flyout**: `Flyout`

Defined in: [src/toolbox.ts:21](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/toolbox.ts#L21)

Flyout instance for node display

***

### container

> **container**: `HTMLDivElement`

Defined in: [src/toolbox.ts:27](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/toolbox.ts#L27)

DOM container element for the toolbox

***

### type

> **type**: `1` \| `2`

Defined in: [src/toolbox.ts:12](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/toolbox.ts#L12)

Toolbox type: 1 = category toolbox, 2 = flyout toolbox

***

### workspace

> **workspace**: [`WorkspaceSvg`](WorkspaceSvg.md)

Defined in: [src/toolbox.ts:15](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/toolbox.ts#L15)

Reference to the workspace this toolbox belongs to

***

### wsOptions

> **wsOptions**: [`InjectOptions`](../interfaces/InjectOptions.md)

Defined in: [src/toolbox.ts:18](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/toolbox.ts#L18)

Workspace options for initialization

## Methods

### getOptions()

> **getOptions**(): [`InjectOptions`](../interfaces/InjectOptions.md)

Defined in: [src/toolbox.ts:68](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/toolbox.ts#L68)

Retrieves the workspace options.

#### Returns

[`InjectOptions`](../interfaces/InjectOptions.md)

The workspace's InjectOptions

***

### initCategoryToolbox()

> **initCategoryToolbox**(): `void`

Defined in: [src/toolbox.ts:76](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/toolbox.ts#L76)

Initializes a category-based toolbox.
Converts the toolbox contents into Category instances and attaches them.

#### Returns

`void`

***

### initFlyoutToolbox()

> **initFlyoutToolbox**(): `void`

Defined in: [src/toolbox.ts:91](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/toolbox.ts#L91)

Initializes a flyout toolbox.
Fills the flyout with the node definitions from the toolbox contents.

#### Returns

`void`
