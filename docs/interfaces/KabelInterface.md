[**Kabel Project Docs v1.0.4**](../README.md)

***

[Kabel Project Docs](../globals.md) / KabelInterface

# Interface: KabelInterface

Defined in: [src/types.ts:95](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/types.ts#L95)

The main Kabel interface exposing core functionality, utilities, renderers, and UI components.

## Properties

### \_mainWorkspace

> **\_mainWorkspace**: [`WorkspaceSvg`](../classes/WorkspaceSvg.md)

Defined in: [src/types.ts:175](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/types.ts#L175)

The currently active main workspace instance.

***

### CategoryColors

> **CategoryColors**: `object`

Defined in: [src/types.ts:109](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/types.ts#L109)

Color categories for nodes and other UI elements.

#### Index Signature

\[`key`: `string`\]: [`ColorStyle`](ColorStyle.md)

***

### clearMainWorkspace()

> **clearMainWorkspace**: () => `null`

Defined in: [src/types.ts:142](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/types.ts#L142)

Clears the main workspace.

Clears the main workspace reference.
After calling, getMainWorkspace() will return null.

#### Returns

`null`

Always returns null.

***

### commentRendering

> **commentRendering**: [`KabelCommentRendering`](KabelCommentRendering.md)

Defined in: [src/types.ts:172](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/types.ts#L172)

Comment rendering container, contains CommentModel and CommentRenderer classes.

***

### Connection

> **Connection**: *typeof* [`Connection`](../classes/Connection.md)

Defined in: [src/types.ts:112](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/types.ts#L112)

Connection system for nodes.

***

### ContextMenu

> **ContextMenu**: `object`

Defined in: [src/types.ts:100](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/types.ts#L100)

Context menu utilities.

#### registerOption()

> **registerOption**(`id`, `option`): `void`

Register a new context menu option

##### Parameters

###### id

`string`

Unique identifier for the option

###### option

Configuration for the context menu item

###### click

(`target`) => `void`

Callback when the option is clicked

###### label

`string`

Label text for the menu item

###### onHoverEnd?

() => `void`

Callback when hovering ends

###### onHoverStart?

() => `void`

Callback when hovering starts

###### showFor

`Showable` \| `Showable`[]

Target type(s) the option should appear for

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

Defined in: [src/types.ts:115](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/types.ts#L115)

Coordinates utility.

***

### Dropdown

> **Dropdown**: [`DropdownContainer`](../classes/DropdownContainer.md)

Defined in: [src/types.ts:178](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/types.ts#L178)

Dropdown UI singleton container.

***

### DummyField

> **DummyField**: *typeof* [`DummyField`](../classes/DummyField.md)

Defined in: [src/types.ts:121](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/types.ts#L121)

Dummy field placeholder class.

***

### Field

> **Field**: *typeof* [`Field`](../classes/Field.md)

Defined in: [src/types.ts:118](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/types.ts#L118)

Base field class for node inputs.

***

### FieldMap

> **FieldMap**: `object`

Defined in: [src/types.ts:124](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/types.ts#L124)

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

> **getMainWorkspace**: () => [`WorkspaceSvg`](../classes/WorkspaceSvg.md) \| `null`

Defined in: [src/types.ts:145](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/types.ts#L145)

Retrieves the main workspace instance.

Returns the current main workspace instance.

#### Returns

[`WorkspaceSvg`](../classes/WorkspaceSvg.md) \| `null`

The main WorkspaceSvg or null if none is set.

***

### inject()

> **inject**: (`element`, `options`) => [`WorkspaceSvg`](../classes/WorkspaceSvg.md) \| `undefined`

Defined in: [src/types.ts:136](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/types.ts#L136)

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

### InjectMsg

> **InjectMsg**: *typeof* [`InjectMsg`](../classes/InjectMsg.md)

Defined in: [src/types.ts:139](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/types.ts#L139)

Message type for injections.

***

### nodeRendering

> **nodeRendering**: [`KabelNodeRendering`](KabelNodeRendering.md)

Defined in: [src/types.ts:169](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/types.ts#L169)

Node rendering container, contains Renderer and RendererConstants classes

***

### Nodes

> **Nodes**: `object`

Defined in: [src/types.ts:154](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/types.ts#L154)

Collection of registered node prototypes.

#### Index Signature

\[`key`: `string`\]: [`NodePrototype`](NodePrototype.md)

***

### NodeSvg

> **NodeSvg**: *typeof* [`NodeSvg`](../classes/NodeSvg.md)

Defined in: [src/types.ts:151](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/types.ts#L151)

NodeSVG class, represents a node in the workspace

***

### NumberField

> **NumberField**: *typeof* [`NumberField`](../classes/NumberField.md)

Defined in: [src/types.ts:127](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/types.ts#L127)

Number input field for nodes.

***

### OptConnectField

> **OptConnectField**: *typeof* [`OptConnectField`](../classes/OptConnectField.md)

Defined in: [src/types.ts:130](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/types.ts#L130)

Optional connection field.

***

### setMainWorkspace()

> **setMainWorkspace**: (`ws`) => [`WorkspaceSvg`](../classes/WorkspaceSvg.md) \| `null`

Defined in: [src/types.ts:148](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/types.ts#L148)

Sets the main workspace instance.

Sets the main workspace reference.
Calling this updates the global "main workspace" for Kabel.

#### Parameters

##### ws

The WorkspaceSvg instance to set as main, or null to clear.

[`WorkspaceSvg`](../classes/WorkspaceSvg.md) | `null`

#### Returns

[`WorkspaceSvg`](../classes/WorkspaceSvg.md) \| `null`

The workspace that was set.

***

### TextField

> **TextField**: *typeof* [`TextField`](../classes/TextField.md)

Defined in: [src/types.ts:133](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/types.ts#L133)

Text input field for nodes.

***

### UIX

> **UIX**: [`KabelUIX`](KabelUIX.md)

Defined in: [src/types.ts:97](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/types.ts#L97)

UI experience utilities section

***

### Utils

> **Utils**: [`KabelUtils`](KabelUtils.md)

Defined in: [src/types.ts:103](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/types.ts#L103)

Utility functions and classes.

***

### WASDController

> **WASDController**: *typeof* [`WASDController`](../classes/WASDController.md)

Defined in: [src/types.ts:166](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/types.ts#L166)

WASD controller for navigating the workspace.

***

### Widget

> **Widget**: *typeof* [`Widget`](../classes/Widget.md)

Defined in: [src/types.ts:106](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/types.ts#L106)

Widget system for creating interactive UI components.

***

### Widgets

> **Widgets**: [`WidgetPrototypeList`](WidgetPrototypeList.md)

Defined in: [src/types.ts:157](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/types.ts#L157)

Collection of registered widget prototypes.

***

### WorkspaceController

> **WorkspaceController**: *typeof* [`WorkspaceController`](../classes/WorkspaceController.md)

Defined in: [src/types.ts:163](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/types.ts#L163)

Workspace controller class which moves the workspace camera based on user interactions.

***

### WorkspaceSvg

> **WorkspaceSvg**: *typeof* [`WorkspaceSvg`](../classes/WorkspaceSvg.md)

Defined in: [src/types.ts:160](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/types.ts#L160)

Workspace SVG class.
