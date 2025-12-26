[**Kabel Project Docs v1.0.6**](../README.md)

***

[Kabel Project Docs](../globals.md) / KabelInterface

# Interface: KabelInterface

Defined in: [src/types.ts:109](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/types.ts#L109)

The main Kabel interface exposing core functionality, utilities, renderers, and UI components.

## Properties

### \_mainWorkspace

> **\_mainWorkspace**: [`WorkspaceSvg`](../classes/WorkspaceSvg.md)

Defined in: [src/types.ts:199](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/types.ts#L199)

The currently active main workspace instance.

***

### apollo

> **apollo**: `__module`

Defined in: [src/types.ts:193](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/types.ts#L193)

A bunch of apollo renderer related classes

***

### atlas

> **atlas**: `__module`

Defined in: [src/types.ts:189](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/types.ts#L189)

A bunch of atlas renderer related classes.

***

### CategoryColors

> **CategoryColors**: `object`

Defined in: [src/types.ts:124](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/types.ts#L124)

Color categories for nodes and other UI elements.

#### Index Signature

\[`key`: `string`\]: [`ColorStyle`](ColorStyle.md)

***

### clearMainWorkspace()

> **clearMainWorkspace**: () => `null`

Defined in: [src/types.ts:158](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/types.ts#L158)

Clears the main workspace.

Clears the main workspace reference.
After calling, getMainWorkspace() will return null.

#### Returns

`null`

Always returns null.

***

### commentRendering

> **commentRendering**: [`KabelCommentRendering`](KabelCommentRendering.md)

Defined in: [src/types.ts:196](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/types.ts#L196)

Comment rendering container, contains CommentModel and CommentRenderer classes.

***

### Connection

> **Connection**: *typeof* [`Connection`](../classes/Connection.md)

Defined in: [src/types.ts:127](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/types.ts#L127)

Connection system for nodes.

***

### ContextMenu

> **ContextMenu**: `object`

Defined in: [src/types.ts:115](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/types.ts#L115)

Context menu utilities.

#### registerOption()

> **registerOption**(`id`, `option`): `void`

Register a new context menu option

##### Parameters

###### id

`string`

Unique identifier for the option

###### option

`Omit`\<`ContextMenuOpts`, `"id"`\>

Configuration for the context menu item

##### Returns

`void`

#### unregisterOption()

> **unregisterOption**(`id`): `void`

Unregister an existing context menu option by ID

##### Parameters

###### id

`string`

ID of the option to remove

##### Returns

`void`

***

### Coordinates

> **Coordinates**: *typeof* [`Coordinates`](../classes/Coordinates.md)

Defined in: [src/types.ts:130](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/types.ts#L130)

Coordinates utility.

***

### Dropdown

> **Dropdown**: [`DropdownContainer`](../classes/DropdownContainer.md)

Defined in: [src/types.ts:202](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/types.ts#L202)

Dropdown UI singleton container.

***

### DummyField

> **DummyField**: *typeof* [`DummyField`](../classes/DummyField.md)

Defined in: [src/types.ts:136](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/types.ts#L136)

Dummy field placeholder class.

***

### env

> **env**: `KabelEnv`

Defined in: [src/types.ts:110](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/types.ts#L110)

***

### Field

> **Field**: *typeof* [`Field`](../classes/Field.md)

Defined in: [src/types.ts:133](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/types.ts#L133)

Base field class for node inputs.

***

### FieldMap

> **FieldMap**: `object`

Defined in: [src/types.ts:139](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/types.ts#L139)

Mapping of fields by type or ID.

#### Index Signature

\[`key`: `string`\]: [`AnyFieldCls`](../type-aliases/AnyFieldCls.md)

#### connection

> **connection**: *typeof* [`ConnectableField`](../classes/ConnectableField.md)

#### field\_both

> **field\_both**: *typeof* [`OptConnectField`](../classes/OptConnectField.md)

#### field\_dummy

> **field\_dummy**: *typeof* [`DummyField`](../classes/DummyField.md)

#### field\_num

> **field\_num**: *typeof* [`NumberField`](../classes/NumberField.md)

#### field\_str

> **field\_str**: *typeof* [`TextField`](../classes/TextField.md)

#### field\_string

> **field\_string**: *typeof* [`TextField`](../classes/TextField.md)

***

### getMainWorkspace()

> **getMainWorkspace**: () => [`WorkspaceSvg`](../classes/WorkspaceSvg.md) \| `Workspace` \| `null`

Defined in: [src/types.ts:161](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/types.ts#L161)

Retrieves the main workspace instance.

Returns the current main workspace instance.

#### Returns

[`WorkspaceSvg`](../classes/WorkspaceSvg.md) \| `Workspace` \| `null`

The main WorkspaceSvg or null if none is set.

***

### inject()

> **inject**: (`element`, `options`) => [`WorkspaceSvg`](../classes/WorkspaceSvg.md) \| `undefined`

Defined in: [src/types.ts:151](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/types.ts#L151)

Function to create a new workspace in kabel

Injects a new Kabel workspace into the document.
Appends the workspace container to the given element (or element ID) and
sets it as the main workspace.

#### Parameters

##### element

HTMLElement or string ID to attach the workspace to

`string` | `HTMLElement`

##### options

[`InjectOptions`](InjectOptions.md) = `{}`

Optional InjectOptions to configure the workspace

#### Returns

[`WorkspaceSvg`](../classes/WorkspaceSvg.md) \| `undefined`

The newly created WorkspaceSvg instance, or undefined if injection failed

***

### injectHeadless()

> **injectHeadless**: () => `Workspace` \| `undefined`

Defined in: [src/types.ts:153](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/types.ts#L153)

Function to create a new workspace in kabel (headless)

#### Returns

`Workspace` \| `undefined`

***

### InjectMsg

> **InjectMsg**: *typeof* [`InjectMsg`](../classes/InjectMsg.md)

Defined in: [src/types.ts:155](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/types.ts#L155)

Message type for injections.

***

### nodeRendering

> **nodeRendering**: [`KabelNodeRendering`](KabelNodeRendering.md)

Defined in: [src/types.ts:185](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/types.ts#L185)

Node rendering container, contains Renderer and RendererConstants classes

***

### Nodes

> **Nodes**: `object`

Defined in: [src/types.ts:170](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/types.ts#L170)

Collection of registered node prototypes.

#### Index Signature

\[`key`: `string`\]: [`NodePrototype`](NodePrototype.md)

***

### NodeSvg

> **NodeSvg**: *typeof* [`NodeSvg`](../classes/NodeSvg.md)

Defined in: [src/types.ts:167](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/types.ts#L167)

NodeSVG class, represents a node in the workspace

***

### NumberField

> **NumberField**: *typeof* [`NumberField`](../classes/NumberField.md)

Defined in: [src/types.ts:142](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/types.ts#L142)

Number input field for nodes.

***

### OptConnectField

> **OptConnectField**: *typeof* [`OptConnectField`](../classes/OptConnectField.md)

Defined in: [src/types.ts:145](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/types.ts#L145)

Optional connection field.

***

### setMainWorkspace()

> **setMainWorkspace**: (`ws`) => [`WorkspaceSvg`](../classes/WorkspaceSvg.md) \| `Workspace` \| `null`

Defined in: [src/types.ts:164](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/types.ts#L164)

Sets the main workspace instance.

Sets the main workspace reference.
Calling this updates the global "main workspace" for Kabel.

#### Parameters

##### ws

The WorkspaceSvg instance to set as main, or null to clear.

[`WorkspaceSvg`](../classes/WorkspaceSvg.md) | `Workspace` | `null`

#### Returns

[`WorkspaceSvg`](../classes/WorkspaceSvg.md) \| `Workspace` \| `null`

The workspace that was set.

***

### TextField

> **TextField**: *typeof* [`TextField`](../classes/TextField.md)

Defined in: [src/types.ts:148](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/types.ts#L148)

Text input field for nodes.

***

### UIX

> **UIX**: [`KabelUIX`](KabelUIX.md)

Defined in: [src/types.ts:112](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/types.ts#L112)

UI experience utilities section

***

### Utils

> **Utils**: [`KabelUtils`](KabelUtils.md)

Defined in: [src/types.ts:118](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/types.ts#L118)

Utility functions and classes.

***

### WASDController

> **WASDController**: *typeof* [`WASDController`](../classes/WASDController.md)

Defined in: [src/types.ts:182](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/types.ts#L182)

WASD controller for navigating the workspace.

***

### Widget

> **Widget**: *typeof* [`Widget`](../classes/Widget.md)

Defined in: [src/types.ts:121](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/types.ts#L121)

Widget system for creating interactive UI components.

***

### Widgets

> **Widgets**: [`WidgetPrototypeList`](WidgetPrototypeList.md)

Defined in: [src/types.ts:173](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/types.ts#L173)

Collection of registered widget prototypes.

***

### WorkspaceController

> **WorkspaceController**: *typeof* [`WorkspaceController`](../classes/WorkspaceController.md)

Defined in: [src/types.ts:179](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/types.ts#L179)

Workspace controller class which moves the workspace camera based on user interactions.

***

### WorkspaceSvg

> **WorkspaceSvg**: *typeof* [`WorkspaceSvg`](../classes/WorkspaceSvg.md)

Defined in: [src/types.ts:176](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/types.ts#L176)

Workspace SVG class.
