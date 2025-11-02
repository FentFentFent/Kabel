[**Kabel Project Docs v1.0.4**](../README.md)

***

[Kabel Project Docs](../globals.md) / WorkspaceSvg

# Class: WorkspaceSvg

Defined in: [src/workspace-svg.ts:32](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/workspace-svg.ts#L32)

Represents the visual workspace containing nodes and connections.
Handles rendering, panning, and coordinate transformations.

## Constructors

### Constructor

> **new WorkspaceSvg**(`root`, `wsTop`, `options`): `WorkspaceSvg`

Defined in: [src/workspace-svg.ts:83](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/workspace-svg.ts#L83)

Creates a new WorkspaceSvg instance.

#### Parameters

##### root

`HTMLElement`

The root HTML element containing the workspace.

##### wsTop

`HTMLElement`

The top-level wrapper element for the SVG.

##### options

[`InjectOptions`](../interfaces/InjectOptions.md)

Configuration and renderer override options.

#### Returns

`WorkspaceSvg`

## Properties

### \_camera

> **\_camera**: [`WorkspaceCoords`](WorkspaceCoords.md)

Defined in: [src/workspace-svg.ts:34](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/workspace-svg.ts#L34)

Top-left offset of the workspace viewport

***

### \_commentDB

> **\_commentDB**: `Set`\<[`CommentModel`](CommentModel.md)\>

Defined in: [src/workspace-svg.ts:76](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/workspace-svg.ts#L76)

A list of comments for this workspace.

***

### \_ctxMenu

> **\_ctxMenu**: [`ContextMenuHTML`](ContextMenuHTML.md)

Defined in: [src/workspace-svg.ts:72](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/workspace-svg.ts#L72)

A manager for the context menu widget

***

### \_nodeDB

> **\_nodeDB**: `Map`\<`string`, [`NodeSvg`](NodeSvg.md)\>

Defined in: [src/workspace-svg.ts:37](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/workspace-svg.ts#L37)

Node storage by unique ID

***

### \_root

> **\_root**: `HTMLElement`

Defined in: [src/workspace-svg.ts:40](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/workspace-svg.ts#L40)

Root HTML container for the workspace

***

### \_widgetDB

> **\_widgetDB**: `Map`\<`string`, [`Widget`](Widget.md)\>

Defined in: [src/workspace-svg.ts:67](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/workspace-svg.ts#L67)

A list of widgets active in this workspace

***

### \_wsTop

> **\_wsTop**: `HTMLElement`

Defined in: [src/workspace-svg.ts:43](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/workspace-svg.ts#L43)

Top-level wrapper for the SVG

***

### controller

> **controller**: [`WorkspaceController`](WorkspaceController.md)

Defined in: [src/workspace-svg.ts:59](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/workspace-svg.ts#L59)

A class instance that moves the camera based on user interactions.

***

### noRedraw

> **noRedraw**: `boolean`

Defined in: [src/workspace-svg.ts:55](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/workspace-svg.ts#L55)

Flag to temporarily prevent redraws

***

### options

> **options**: [`InjectOptions`](../interfaces/InjectOptions.md)

Defined in: [src/workspace-svg.ts:52](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/workspace-svg.ts#L52)

Options for workspace behavior and rendering overrides

***

### renderer

> **renderer**: [`Renderer`](Renderer.md)

Defined in: [src/workspace-svg.ts:49](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/workspace-svg.ts#L49)

Renderer instance for drawing nodes and connections

***

### svg

> **svg**: `Svg`

Defined in: [src/workspace-svg.ts:46](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/workspace-svg.ts#L46)

SVG.js instance for rendering

***

### toolbox?

> `optional` **toolbox**: [`Toolbox`](Toolbox.md)

Defined in: [src/workspace-svg.ts:63](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/workspace-svg.ts#L63)

Toolbox for the workspace.

## Methods

### \_addWidgetToDB()

> **\_addWidgetToDB**(`wdgt`): `void`

Defined in: [src/workspace-svg.ts:134](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/workspace-svg.ts#L134)

Internal: Add widget to DB

#### Parameters

##### wdgt

[`Widget`](Widget.md)

The widget

#### Returns

`void`

***

### \_delWidgetFromDB()

> **\_delWidgetFromDB**(`wdgt`): `void`

Defined in: [src/workspace-svg.ts:141](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/workspace-svg.ts#L141)

Internal: Delete a widget from DB.

#### Parameters

##### wdgt

[`Widget`](Widget.md)

Widget to delete

#### Returns

`void`

***

### addComment()

> **addComment**(): [`CommentModel`](CommentModel.md)

Defined in: [src/workspace-svg.ts:361](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/workspace-svg.ts#L361)

Adds a comment, returns the model.

#### Returns

[`CommentModel`](CommentModel.md)

***

### addNode()

> **addNode**(`node`, `nodeId?`): `void`

Defined in: [src/workspace-svg.ts:253](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/workspace-svg.ts#L253)

Adds a node to the workspace.

#### Parameters

##### node

[`NodeSvg`](NodeSvg.md)

The node instance to add.

##### nodeId?

`string`

Optional custom ID to use instead of node.id.

#### Returns

`void`

***

### cloneNode()

> **cloneNode**(`nodeSvg`): `void`

Defined in: [src/workspace-svg.ts:124](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/workspace-svg.ts#L124)

Duplicate node data from one to another

#### Parameters

##### nodeSvg

[`NodeSvg`](NodeSvg.md)

The node

#### Returns

`void`

***

### derefNode()

> **derefNode**(`node`): `void`

Defined in: [src/workspace-svg.ts:293](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/workspace-svg.ts#L293)

Dereference a node from all of its connected neighbors

#### Parameters

##### node

[`NodeSvg`](NodeSvg.md)

#### Returns

`void`

***

### drawAllNodes()

> **drawAllNodes**(): `void`

Defined in: [src/workspace-svg.ts:196](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/workspace-svg.ts#L196)

Draws all nodes in the workspace. Very heavy.

#### Returns

`void`

***

### drawNode()

> **drawNode**(`id`): `G` \| `null` \| `undefined`

Defined in: [src/workspace-svg.ts:244](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/workspace-svg.ts#L244)

Draws a node by its ID.

#### Parameters

##### id

`string`

The ID of the node to render.

#### Returns

`G` \| `null` \| `undefined`

The rendered node.

***

### fromJson()

> **fromJson**(`json`): `void`

Defined in: [src/workspace-svg.ts:404](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/workspace-svg.ts#L404)

Deserialize this workspace from json data.

#### Parameters

##### json

Serialized workspace

###### circular

`boolean`

###### nodes

`any`[]

#### Returns

`void`

***

### getComment()

> **getComment**(`id`): [`CommentModel`](CommentModel.md) \| `undefined`

Defined in: [src/workspace-svg.ts:371](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/workspace-svg.ts#L371)

Gets a comment by id

#### Parameters

##### id

`string`

The comment id.

#### Returns

[`CommentModel`](CommentModel.md) \| `undefined`

***

### getComments()

> **getComments**(): [`CommentModel`](CommentModel.md)[]

Defined in: [src/workspace-svg.ts:117](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/workspace-svg.ts#L117)

Get all comments

#### Returns

[`CommentModel`](CommentModel.md)[]

***

### getContentSize()

> **getContentSize**(): `object`

Defined in: [src/workspace-svg.ts:174](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/workspace-svg.ts#L174)

Returns the current width and height of the workspace's svg content size in pixels.
Useful for camera positioning.

#### Returns

`object`

##### height

> **height**: `number`

##### width

> **width**: `number`

***

### getNode()

> **getNode**(`id`): [`NodeSvg`](NodeSvg.md) \| `undefined`

Defined in: [src/workspace-svg.ts:341](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/workspace-svg.ts#L341)

Retrieves a node by its ID.

#### Parameters

##### id

`string`

The ID of the node.

#### Returns

[`NodeSvg`](NodeSvg.md) \| `undefined`

The NodeSvg instance or undefined if not found.

***

### getSize()

> **getSize**(): `object`

Defined in: [src/workspace-svg.ts:182](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/workspace-svg.ts#L182)

Returns the current width and height of the workspace in pixels.
Useful for camera centering, zoom calculations, and viewport sizing.

#### Returns

`object`

##### height

> **height**: `number`

##### width

> **width**: `number`

***

### getWidget()

> **getWidget**(`id`): [`Widget`](Widget.md) \| `undefined`

Defined in: [src/workspace-svg.ts:166](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/workspace-svg.ts#L166)

Get a widget

#### Parameters

##### id

`string`

Identifier

#### Returns

[`Widget`](Widget.md) \| `undefined`

- A widget

***

### getZoom()

> **getZoom**(): `number`

Defined in: [src/workspace-svg.ts:104](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/workspace-svg.ts#L104)

#### Returns

`number`

***

### newNode()

> **newNode**(`type`): [`NodeSvg`](NodeSvg.md) \| `undefined`

Defined in: [src/workspace-svg.ts:269](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/workspace-svg.ts#L269)

Create a new node of *type*.

#### Parameters

##### type

The node's prototype name.

`string` | `number`

#### Returns

[`NodeSvg`](NodeSvg.md) \| `undefined`

***

### newWidget()

> **newWidget**(`type`): `void` \| [`Widget`](Widget.md)

Defined in: [src/workspace-svg.ts:149](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/workspace-svg.ts#L149)

Create a new widget of type.

#### Parameters

##### type

`string`

The prototype

#### Returns

`void` \| [`Widget`](Widget.md)

***

### pan()

> **pan**(`dx`, `dy`): `void`

Defined in: [src/workspace-svg.ts:350](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/workspace-svg.ts#L350)

Pans the camera by the given delta values.

#### Parameters

##### dx

`number`

Change in X direction.

##### dy

`number`

Change in Y direction.

#### Returns

`void`

***

### redraw()

> **redraw**(): `void`

Defined in: [src/workspace-svg.ts:203](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/workspace-svg.ts#L203)

Redraws the entire workspace unless noRedraw is set.

#### Returns

`void`

***

### redrawComments()

> **redrawComments**(): `void`

Defined in: [src/workspace-svg.ts:396](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/workspace-svg.ts#L396)

Redraw all comments in this workspace.

#### Returns

`void`

***

### refresh()

> **refresh**(): `void`

Defined in: [src/workspace-svg.ts:191](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/workspace-svg.ts#L191)

Updates all connection lines & node screen positions without a full redraw.
Used when nodes are dragged or the camera moves.

#### Returns

`void`

***

### refreshComments()

> **refreshComments**(): `void`

Defined in: [src/workspace-svg.ts:110](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/workspace-svg.ts#L110)

Refresh comments.

#### Returns

`void`

***

### removeComment()

> **removeComment**(`commentOrId`): `boolean`

Defined in: [src/workspace-svg.ts:378](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/workspace-svg.ts#L378)

Remove a comment by its instance or id.

#### Parameters

##### commentOrId

The comment instance or its id.

`string` | [`CommentModel`](CommentModel.md)

#### Returns

`boolean`

***

### removeNode()

> **removeNode**(`node`): `void`

Defined in: [src/workspace-svg.ts:331](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/workspace-svg.ts#L331)

Removes a node by its instance.

#### Parameters

##### node

[`NodeSvg`](NodeSvg.md)

The node instance to remove.

#### Returns

`void`

***

### removeNodeById()

> **removeNodeById**(`id`): `void`

Defined in: [src/workspace-svg.ts:319](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/workspace-svg.ts#L319)

Removes a node by its ID.

#### Parameters

##### id

`string`

The ID of the node to remove.

#### Returns

`void`

***

### screenToWorkspace()

> **screenToWorkspace**(`screenX`, `screenY`): `object`

Defined in: [src/workspace-svg.ts:232](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/workspace-svg.ts#L232)

Converts screen (SVG) coordinates to workspace coordinates.

#### Parameters

##### screenX

`number`

##### screenY

`number`

#### Returns

`object`

Workspace coordinates as a Coordinates instance.

##### x

> **x**: `number` = `workX`

##### y

> **y**: `number` = `workY`

***

### spawnAt()

> **spawnAt**(`type`, `x`, `y`): [`NodeSvg`](NodeSvg.md) \| `undefined`

Defined in: [src/workspace-svg.ts:283](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/workspace-svg.ts#L283)

Spawns a node at x, y of prototype type

#### Parameters

##### type

The node prototype name

`string` | `number`

##### x

`number`

X position

##### y

`number`

Y position

#### Returns

[`NodeSvg`](NodeSvg.md) \| `undefined`

- The new node

***

### toJson()

> **toJson**(`circular`): `object`

Defined in: [src/workspace-svg.ts:418](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/workspace-svg.ts#L418)

Serialize this workspace, optionally using circular references.

#### Parameters

##### circular

`boolean`

#### Returns

`object`

##### circular

> **circular**: `boolean`

##### nodes

> **nodes**: ([`SerializedNode`](../interfaces/SerializedNode.md) \| \{\[`id`: `string`\]: `Omit`\<[`SerializedNode`](../interfaces/SerializedNode.md), `"previousConnection"` \| `"nextConnection"`\> & `object`; \})[]

***

### workspaceToScreen()

> **workspaceToScreen**(`workX`, `workY`): `object`

Defined in: [src/workspace-svg.ts:218](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/workspace-svg.ts#L218)

Converts workspace coordinates to screen (SVG) coordinates.

#### Parameters

##### workX

`number`

##### workY

`number`

#### Returns

`object`

Screen coordinates as a Coordinates instance.

##### x

> **x**: `number`

##### y

> **y**: `number`
