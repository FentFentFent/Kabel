[**Kabel Project Docs v1.0.6**](../README.md)

***

[Kabel Project Docs](../globals.md) / WorkspaceSvg

# Class: WorkspaceSvg

Defined in: [src/workspace-svg.ts:62](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/workspace-svg.ts#L62)

Represents the visual workspace containing nodes and connections.
Handles rendering, panning, and coordinate transformations.

## Extends

- `Workspace`

## Constructors

### Constructor

> **new WorkspaceSvg**(`root`, `wsTop`, `options`): `WorkspaceSvg`

Defined in: [src/workspace-svg.ts:147](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/workspace-svg.ts#L147)

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

#### Overrides

`Workspace.constructor`

## Properties

### \_backgroundRect

> **\_backgroundRect**: `Rect`

Defined in: [src/workspace-svg.ts:89](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/workspace-svg.ts#L89)

The background element

***

### \_camera

> **\_camera**: [`WorkspaceCoords`](WorkspaceCoords.md)

Defined in: [src/workspace-svg.ts:75](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/workspace-svg.ts#L75)

Top-left offset of the workspace viewport

***

### \_commentDB

> **\_commentDB**: `Set`\<[`CommentModel`](CommentModel.md)\>

Defined in: [src/workspace-svg.ts:118](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/workspace-svg.ts#L118)

A list of comments for this workspace.

#### Overrides

`Workspace._commentDB`

***

### \_ctxMenu

> **\_ctxMenu**: [`ContextMenuHTML`](ContextMenuHTML.md)

Defined in: [src/workspace-svg.ts:114](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/workspace-svg.ts#L114)

A manager for the context menu widget

***

### \_didMove

> **\_didMove**: `boolean` = `false`

Defined in: [src/workspace-svg.ts:134](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/workspace-svg.ts#L134)

Internal flag to indicate if the camera has moved this frame.

***

### \_nodeDB

> **\_nodeDB**: `Map`\<`string`, [`NodeSvg`](NodeSvg.md)\>

Defined in: [src/workspace-svg.ts:78](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/workspace-svg.ts#L78)

Node storage by unique ID

#### Overrides

`Workspace._nodeDB`

***

### \_root

> **\_root**: `HTMLElement`

Defined in: [src/workspace-svg.ts:81](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/workspace-svg.ts#L81)

Root HTML container for the workspace

***

### \_widgetDB

> **\_widgetDB**: `Map`\<`string`, [`Widget`](Widget.md)\>

Defined in: [src/workspace-svg.ts:109](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/workspace-svg.ts#L109)

A list of widgets active in this workspace

#### Overrides

`Workspace._widgetDB`

***

### \_wsTop

> **\_wsTop**: `HTMLElement`

Defined in: [src/workspace-svg.ts:84](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/workspace-svg.ts#L84)

Top-level wrapper for the SVG

***

### controller

> **controller**: [`WorkspaceController`](WorkspaceController.md)

Defined in: [src/workspace-svg.ts:101](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/workspace-svg.ts#L101)

A class instance that moves the camera based on user interactions.

***

### dragState

> **dragState**: `IDragState` \| `null` = `null`

Defined in: [src/workspace-svg.ts:140](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/workspace-svg.ts#L140)

Current drag state for node dragging

***

### grid?

> `optional` **grid**: `Grid`

Defined in: [src/workspace-svg.ts:73](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/workspace-svg.ts#L73)

Workspace background pattern items.

***

### history

> **history**: `UndoRedoHistory`

Defined in: [src/workspace-svg.ts:122](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/workspace-svg.ts#L122)

Undo/redo history

***

### isHeadless

> **isHeadless**: `boolean` = `true`

Defined in: src/workspace.ts:16

#### Inherited from

`Workspace.isHeadless`

***

### moveListeners

> **moveListeners**: () => `void`[]

Defined in: [src/workspace-svg.ts:138](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/workspace-svg.ts#L138)

Listeners to call when the workspace moves.

#### Returns

`void`

***

### noRedraw

> **noRedraw**: `boolean`

Defined in: [src/workspace-svg.ts:97](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/workspace-svg.ts#L97)

Flag to temporarily prevent redraws

***

### options

> **options**: [`InjectOptions`](../interfaces/InjectOptions.md)

Defined in: [src/workspace-svg.ts:94](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/workspace-svg.ts#L94)

Options for workspace behavior and rendering overrides

***

### recordHistory

> **recordHistory**: `boolean` = `true`

Defined in: [src/workspace-svg.ts:126](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/workspace-svg.ts#L126)

Whether to record undo/redo history or not

***

### recordHistoryRecord

> **recordHistoryRecord**: `boolean`[]

Defined in: [src/workspace-svg.ts:130](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/workspace-svg.ts#L130)

Stack of old recordHistory values for toggleHistory

***

### renderer

> **renderer**: [`Renderer`](Renderer.md)

Defined in: [src/workspace-svg.ts:91](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/workspace-svg.ts#L91)

Renderer instance for drawing nodes and connections

***

### svg

> **svg**: `Svg`

Defined in: [src/workspace-svg.ts:87](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/workspace-svg.ts#L87)

SVG.js instance for rendering

***

### theme

> **theme**: `WSTheme`

Defined in: [src/workspace-svg.ts:69](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/workspace-svg.ts#L69)

Theme of the workspace

***

### toolbox?

> `optional` **toolbox**: [`Toolbox`](Toolbox.md)

Defined in: [src/workspace-svg.ts:105](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/workspace-svg.ts#L105)

Toolbox for the workspace.

## Accessors

### didMove

#### Get Signature

> **get** **didMove**(): `boolean`

Defined in: [src/workspace-svg.ts:205](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/workspace-svg.ts#L205)

Getter and setter for whether we moved or not this frame.

##### Returns

`boolean`

#### Set Signature

> **set** **didMove**(`value`): `void`

Defined in: [src/workspace-svg.ts:206](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/workspace-svg.ts#L206)

##### Parameters

###### value

`boolean`

##### Returns

`void`

***

### BACKGROUND\_CLASS

#### Get Signature

> **get** `static` **BACKGROUND\_CLASS**(): `string`

Defined in: [src/workspace-svg.ts:63](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/workspace-svg.ts#L63)

##### Returns

`string`

## Methods

### \_addWidgetToDB()

> **\_addWidgetToDB**(`wdgt`): `void`

Defined in: [src/workspace-svg.ts:408](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/workspace-svg.ts#L408)

Internal: Add widget to DB

#### Parameters

##### wdgt

[`Widget`](Widget.md)

The widget

#### Returns

`void`

#### Overrides

`Workspace._addWidgetToDB`

***

### \_delWidgetFromDB()

> **\_delWidgetFromDB**(`wdgt`): `void`

Defined in: [src/workspace-svg.ts:415](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/workspace-svg.ts#L415)

Internal: Delete a widget from DB.

#### Parameters

##### wdgt

[`Widget`](Widget.md)

Widget to delete

#### Returns

`void`

#### Overrides

`Workspace._delWidgetFromDB`

***

### \_initBackground()

> **\_initBackground**(): `void`

Defined in: [src/workspace-svg.ts:343](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/workspace-svg.ts#L343)

Sets the background grid up based on user selected options.

#### Returns

`void`

***

### \_updateBackgroundTransform()

> **\_updateBackgroundTransform**(): `void`

Defined in: [src/workspace-svg.ts:365](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/workspace-svg.ts#L365)

Updates the transform of the background grid

#### Returns

`void`

***

### addComment()

> **addComment**(): [`CommentModel`](CommentModel.md)

Defined in: [src/workspace-svg.ts:643](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/workspace-svg.ts#L643)

Adds a comment, returns the model.

#### Returns

[`CommentModel`](CommentModel.md)

#### Overrides

`Workspace.addComment`

***

### addMoveListener()

> **addMoveListener**(`listener`): () => `void`

Defined in: [src/workspace-svg.ts:299](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/workspace-svg.ts#L299)

Adds a move listener to the workspace.

#### Parameters

##### listener

() => `void`

The listener function to add.

#### Returns

A function to remove the added listener.

> (): `void`

##### Returns

`void`

***

### addNode()

> **addNode**(`node`, `nodeId?`): `void`

Defined in: [src/workspace-svg.ts:528](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/workspace-svg.ts#L528)

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

#### Overrides

`Workspace.addNode`

***

### beginDrag()

> **beginDrag**(`node`, `startX`, `startY`, `offsetX`, `offsetY`): `void`

Defined in: [src/workspace-svg.ts:254](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/workspace-svg.ts#L254)

#### Parameters

##### node

[`NodeSvg`](NodeSvg.md)

##### startX

`number`

##### startY

`number`

##### offsetX

`number` = `0`

##### offsetY

`number` = `0`

#### Returns

`void`

***

### cloneNode()

> **cloneNode**(`nodeSvg`): `void`

Defined in: [src/workspace-svg.ts:398](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/workspace-svg.ts#L398)

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

Defined in: [src/workspace-svg.ts:571](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/workspace-svg.ts#L571)

Dereference a node from all of its connected neighbors

#### Parameters

##### node

[`NodeSvg`](NodeSvg.md)

#### Returns

`void`

#### Overrides

`Workspace.derefNode`

***

### drawAllNodes()

> **drawAllNodes**(): `void`

Defined in: [src/workspace-svg.ts:471](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/workspace-svg.ts#L471)

Draws all nodes in the workspace. Very heavy.

#### Returns

`void`

***

### drawNode()

> **drawNode**(`id`): `G` \| `null` \| `undefined`

Defined in: [src/workspace-svg.ts:519](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/workspace-svg.ts#L519)

Draws a node by its ID.

#### Parameters

##### id

`string`

The ID of the node to render.

#### Returns

`G` \| `null` \| `undefined`

The rendered node.

***

### emitChange()

> **emitChange**(): `void`

Defined in: [src/workspace-svg.ts:316](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/workspace-svg.ts#L316)

Emits a change event for the workspace, triggering
undo/redo history tracking.

#### Returns

`void`

***

### endDrag()

> **endDrag**(): `void`

Defined in: [src/workspace-svg.ts:282](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/workspace-svg.ts#L282)

#### Returns

`void`

***

### fireMoveListeners()

> **fireMoveListeners**(): `void`

Defined in: [src/workspace-svg.ts:291](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/workspace-svg.ts#L291)

Fires all move listeners registered to this workspace.

#### Returns

`void`

***

### fromJson()

> **fromJson**(`json`, `recordBigEvent`): `void`

Defined in: [src/workspace-svg.ts:686](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/workspace-svg.ts#L686)

Deserialize this workspace from json data.

#### Parameters

##### json

Serialized workspace

###### circular

`boolean`

###### nodes

`any`[]

##### recordBigEvent

`boolean` = `false`

#### Returns

`void`

#### Overrides

`Workspace.fromJson`

***

### getComment()

> **getComment**(`id`): [`CommentModel`](CommentModel.md) \| `undefined`

Defined in: [src/workspace-svg.ts:653](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/workspace-svg.ts#L653)

Gets a comment by id

#### Parameters

##### id

`string`

The comment id.

#### Returns

[`CommentModel`](CommentModel.md) \| `undefined`

#### Overrides

`Workspace.getComment`

***

### getComments()

> **getComments**(): [`CommentModel`](CommentModel.md)[]

Defined in: [src/workspace-svg.ts:391](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/workspace-svg.ts#L391)

Get all comments

#### Returns

[`CommentModel`](CommentModel.md)[]

#### Overrides

`Workspace.getComments`

***

### getContentSize()

> **getContentSize**(): `object`

Defined in: [src/workspace-svg.ts:448](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/workspace-svg.ts#L448)

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

Defined in: [src/workspace-svg.ts:623](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/workspace-svg.ts#L623)

Retrieves a node by its ID.

#### Parameters

##### id

The ID of the node.

`string` | [`NodeSvg`](NodeSvg.md)

#### Returns

[`NodeSvg`](NodeSvg.md) \| `undefined`

The NodeSvg instance or undefined if not found.

#### Overrides

`Workspace.getNode`

***

### getSize()

> **getSize**(): `object`

Defined in: [src/workspace-svg.ts:456](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/workspace-svg.ts#L456)

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

Defined in: [src/workspace-svg.ts:440](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/workspace-svg.ts#L440)

Get a widget

#### Parameters

##### id

`string`

Identifier

#### Returns

[`Widget`](Widget.md) \| `undefined`

- A widget

#### Overrides

`Workspace.getWidget`

***

### getZoom()

> **getZoom**(): `number`

Defined in: [src/workspace-svg.ts:378](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/workspace-svg.ts#L378)

Get the current zoom factor of the workspace.

#### Returns

`number`

- The zoom factor

***

### newNode()

> **newNode**(`type`, `add`): [`NodeSvg`](NodeSvg.md) \| `undefined`

Defined in: [src/workspace-svg.ts:546](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/workspace-svg.ts#L546)

Create a new node of *type*.

#### Parameters

##### type

The node's prototype name.

`string` | `number`

##### add

`boolean` = `true`

#### Returns

[`NodeSvg`](NodeSvg.md) \| `undefined`

#### Overrides

`Workspace.newNode`

***

### newWidget()

> **newWidget**(`type`): `void` \| [`Widget`](Widget.md)

Defined in: [src/workspace-svg.ts:423](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/workspace-svg.ts#L423)

Create a new widget of type.

#### Parameters

##### type

`string`

The prototype

#### Returns

`void` \| [`Widget`](Widget.md)

#### Overrides

`Workspace.newWidget`

***

### pan()

> **pan**(`dx`, `dy`): `void`

Defined in: [src/workspace-svg.ts:633](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/workspace-svg.ts#L633)

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

Defined in: [src/workspace-svg.ts:478](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/workspace-svg.ts#L478)

Redraws the entire workspace unless noRedraw is set.

#### Returns

`void`

***

### redrawComments()

> **redrawComments**(): `void`

Defined in: [src/workspace-svg.ts:678](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/workspace-svg.ts#L678)

Redraw all comments in this workspace.

#### Returns

`void`

***

### refresh()

> **refresh**(): `void`

Defined in: [src/workspace-svg.ts:465](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/workspace-svg.ts#L465)

Updates all connection lines & node screen positions without a full redraw.
Used when nodes are dragged or the camera moves.

#### Returns

`void`

***

### refreshComments()

> **refreshComments**(): `void`

Defined in: [src/workspace-svg.ts:384](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/workspace-svg.ts#L384)

Refresh comments.

#### Returns

`void`

***

### removeComment()

> **removeComment**(`commentOrId`): `boolean`

Defined in: [src/workspace-svg.ts:660](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/workspace-svg.ts#L660)

Remove a comment by its instance or id.

#### Parameters

##### commentOrId

The comment instance or its id.

`string` | [`CommentModel`](CommentModel.md)

#### Returns

`boolean`

#### Overrides

`Workspace.removeComment`

***

### removeMoveListener()

> **removeMoveListener**(`listener`): `void`

Defined in: [src/workspace-svg.ts:309](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/workspace-svg.ts#L309)

Removes a move listener from the workspace.

#### Parameters

##### listener

() => `void`

The listener function to remove.

#### Returns

`void`

***

### removeNode()

> **removeNode**(`node`): `void`

Defined in: [src/workspace-svg.ts:613](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/workspace-svg.ts#L613)

Removes a node by its instance.

#### Parameters

##### node

[`NodeSvg`](NodeSvg.md)

The node instance to remove.

#### Returns

`void`

#### Overrides

`Workspace.removeNode`

***

### removeNodeById()

> **removeNodeById**(`id`): `void`

Defined in: [src/workspace-svg.ts:597](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/workspace-svg.ts#L597)

Removes a node by its ID.

#### Parameters

##### id

`string`

The ID of the node to remove.

#### Returns

`void`

#### Overrides

`Workspace.removeNodeById`

***

### screenToWorkspace()

> **screenToWorkspace**(`screenX`, `screenY`): `object`

Defined in: [src/workspace-svg.ts:507](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/workspace-svg.ts#L507)

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

### setDragState()

> **setDragState**(`params`): `void`

Defined in: [src/workspace-svg.ts:217](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/workspace-svg.ts#L217)

Sets the drag state of the workspace.

#### Parameters

##### params

Drag state parameters.

###### currentX

`number`

###### currentY

`number`

###### node

[`NodeSvg`](NodeSvg.md) \| `null`

###### offsetX?

`number`

###### offsetY?

`number`

###### startX

`number`

###### startY

`number`

#### Returns

`void`

Void.

***

### setTheme()

> **setTheme**(`theme`): `void`

Defined in: [src/workspace-svg.ts:190](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/workspace-svg.ts#L190)

#### Parameters

##### theme

`WSTheme`

#### Returns

`void`

***

### spawnAt()

> **spawnAt**(`type`, `x`, `y`): [`NodeSvg`](NodeSvg.md) \| `undefined`

Defined in: [src/workspace-svg.ts:560](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/workspace-svg.ts#L560)

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

#### Overrides

`Workspace.spawnAt`

***

### toggleHistory()

> **toggleHistory**(`value`): `void`

Defined in: [src/workspace-svg.ts:326](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/workspace-svg.ts#L326)

Temporarily sets the workspace's history recording state.
Pushes the previous state onto a stack for later restoration.

#### Parameters

##### value

`boolean`

Whether history recording should be enabled.

#### Returns

`void`

***

### toJson()

> **toJson**(`circular`): `object`

Defined in: [src/workspace-svg.ts:713](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/workspace-svg.ts#L713)

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

#### Overrides

`Workspace.toJson`

***

### untoggleHistory()

> **untoggleHistory**(): `void`

Defined in: [src/workspace-svg.ts:335](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/workspace-svg.ts#L335)

Restores the previous history recording state from the stack.
Use after a temporary toggle to revert to the previous state.

#### Returns

`void`

***

### updateDrag()

> **updateDrag**(`currentX`, `currentY`): `void`

Defined in: [src/workspace-svg.ts:274](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/workspace-svg.ts#L274)

Updates the current drag position.

#### Parameters

##### currentX

`number`

Current X position.

##### currentY

`number`

Current Y position.

#### Returns

`void`

Void.

***

### workspaceToScreen()

> **workspaceToScreen**(`workX`, `workY`): `object`

Defined in: [src/workspace-svg.ts:493](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/workspace-svg.ts#L493)

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
