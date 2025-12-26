[**Kabel Project Docs v1.0.6**](../README.md)

***

[Kabel Project Docs](../globals.md) / Renderer

# Class: Renderer

Defined in: [renderers/renderer.ts:43](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/renderers/renderer.ts#L43)

## Constructors

### Constructor

> **new Renderer**(`workspace`, `overrides`): `Renderer`

Defined in: [renderers/renderer.ts:128](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/renderers/renderer.ts#L128)

Constructor for the Renderer class.

#### Parameters

##### workspace

[`WorkspaceSvg`](WorkspaceSvg.md)

The workspace associated with the renderer.

##### overrides

`Partial`\<[`RendererConstants`](RendererConstants.md)\> = `{}`

Optional constant overrides for the renderer.

#### Returns

`Renderer`

## Properties

### \_commentDrawer

> **\_commentDrawer**: [`CommentRenderer`](CommentRenderer.md)

Defined in: [renderers/renderer.ts:71](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/renderers/renderer.ts#L71)

Comment renderer instance used for rendering comments.

***

### \_constants

> **\_constants**: [`RendererConstants`](RendererConstants.md)

Defined in: [renderers/renderer.ts:47](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/renderers/renderer.ts#L47)

Set of constants the renderer uses for drawing nodes.

***

### \_currentNode

> **\_currentNode**: [`NodeSvg`](NodeSvg.md) \| `null`

Defined in: [renderers/renderer.ts:51](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/renderers/renderer.ts#L51)

The current node being rendered.

***

### \_drawStates

> **\_drawStates**: [`DrawState`](../interfaces/DrawState.md)[]

Defined in: [renderers/renderer.ts:67](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/renderers/renderer.ts#L67)

Array of stored draw states for rendered nodes.

***

### \_nodeDraw

> **\_nodeDraw**: [`DrawState`](../interfaces/DrawState.md) \| `null`

Defined in: [renderers/renderer.ts:59](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/renderers/renderer.ts#L59)

The current drawing state for the node.

***

### \_nodeGroup

> **\_nodeGroup**: `G` \| `null`

Defined in: [renderers/renderer.ts:55](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/renderers/renderer.ts#L55)

The SVG group element for the current node.

***

### \_ws

> **\_ws**: [`WorkspaceSvg`](WorkspaceSvg.md)

Defined in: [renderers/renderer.ts:63](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/renderers/renderer.ts#L63)

The workspace this renderer is associated with.

***

### constantOverrides

> **constantOverrides**: `Partial`\<[`RendererConstants`](RendererConstants.md)\>

Defined in: [renderers/renderer.ts:79](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/renderers/renderer.ts#L79)

Constant overrides provided during renderer instantiation.

***

### representer

> **representer**: [`Representer`](Representer.md)

Defined in: [renderers/renderer.ts:75](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/renderers/renderer.ts#L75)

Representer instance used for building node representations.

## Accessors

### constants

#### Get Signature

> **get** **constants**(): [`RendererConstants`](RendererConstants.md)

Defined in: [renderers/renderer.ts:182](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/renderers/renderer.ts#L182)

Gets the renderer constants, merging with node style if applicable.

##### Returns

[`RendererConstants`](RendererConstants.md)

#### Set Signature

> **set** **constants**(`c`): `void`

Defined in: [renderers/renderer.ts:195](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/renderers/renderer.ts#L195)

Sets the renderer constants.

##### Parameters

###### c

`Partial`\<[`RendererConstants`](RendererConstants.md)\>

##### Returns

`void`

***

### node

#### Get Signature

> **get** **node**(): [`NodeSvg`](NodeSvg.md) \| `null`

Defined in: [renderers/renderer.ts:201](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/renderers/renderer.ts#L201)

Gets the current node being rendered.

##### Returns

[`NodeSvg`](NodeSvg.md) \| `null`

***

### state

#### Get Signature

> **get** **state**(): [`DrawState`](../interfaces/DrawState.md) \| `null` \| `undefined`

Defined in: [renderers/renderer.ts:213](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/renderers/renderer.ts#L213)

Gets the current drawing state.

##### Returns

[`DrawState`](../interfaces/DrawState.md) \| `null` \| `undefined`

***

### svg

#### Get Signature

> **get** **svg**(): `Svg`

Defined in: [renderers/renderer.ts:207](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/renderers/renderer.ts#L207)

Gets the SVG.js instance from the workspace.

##### Returns

`Svg`

***

### BACKGROUND\_PATTERN

#### Get Signature

> **get** `static` **BACKGROUND\_PATTERN**(): `string`

Defined in: [renderers/renderer.ts:113](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/renderers/renderer.ts#L113)

Tag used for background pattern elements in the SVG. This is constant, do not modify it in subclasses.

##### Returns

`string`

***

### CONN\_LINE\_TAG

#### Get Signature

> **get** `static` **CONN\_LINE\_TAG**(): `string`

Defined in: [renderers/renderer.ts:95](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/renderers/renderer.ts#L95)

Tag used for connection line elements in the SVG.

##### Returns

`string`

***

### CONNECTOR\_TAG

#### Get Signature

> **get** `static` **CONNECTOR\_TAG**(): `string`

Defined in: [renderers/renderer.ts:101](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/renderers/renderer.ts#L101)

Tag used for connector elements in the SVG.

##### Returns

`string`

***

### ELEMENT\_TAG

#### Get Signature

> **get** `static` **ELEMENT\_TAG**(): `string`

Defined in: [renderers/renderer.ts:89](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/renderers/renderer.ts#L89)

Tag used for renderer elements in the SVG.

##### Returns

`string`

***

### LINE\_X\_MARK\_TAG

#### Get Signature

> **get** `static` **LINE\_X\_MARK\_TAG**(): `string`

Defined in: [renderers/renderer.ts:107](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/renderers/renderer.ts#L107)

Tag used for line X mark elements in the SVG.

##### Returns

`string`

***

### NAME

#### Get Signature

> **get** `static` **NAME**(): `string`

Defined in: [renderers/renderer.ts:120](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/renderers/renderer.ts#L120)

Name of the renderer.

##### Returns

`string`

***

### NODE\_G\_TAG

#### Get Signature

> **get** `static` **NODE\_G\_TAG**(): `string`

Defined in: [renderers/renderer.ts:83](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/renderers/renderer.ts#L83)

Tag used for node group elements in the SVG.

##### Returns

`string`

## Methods

### \_fillOtherNodeConnectorCircle()

> **\_fillOtherNodeConnectorCircle**(`conn`, `circle`, `isPrevious`): `void`

Defined in: [renderers/renderer.ts:1122](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/renderers/renderer.ts#L1122)

Fills in the connector circle for other nodes based on the given connection.

#### Parameters

##### conn

[`Connection`](Connection.md)

The connection to match.

##### circle

`Path`

The SVG path of the connector circle.

##### isPrevious

`boolean`

Whether the connection is a previous connection.

#### Returns

`void`

***

### applyZoomToNode()

> **applyZoomToNode**(`nodeG`, `node`): `void`

Defined in: [renderers/renderer.ts:1019](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/renderers/renderer.ts#L1019)

Applies the current zoom level to the specified node group.

#### Parameters

##### nodeG

`G`

The SVG group element of the node.

##### node

[`NodeSvg`](NodeSvg.md)

The node to apply zoom to.

#### Returns

`void`

***

### clearComments()

> **clearComments**(): `void`

Defined in: [renderers/renderer.ts:997](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/renderers/renderer.ts#L997)

Clears all comments from the workspace.

#### Returns

`void`

Void.

***

### clearLines()

> **clearLines**(): `void`

Defined in: [renderers/renderer.ts:1214](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/renderers/renderer.ts#L1214)

Clear connection lines and their X marks.

#### Returns

`void`

***

### clearScreen()

> **clearScreen**(): `void`

Defined in: [renderers/renderer.ts:1225](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/renderers/renderer.ts#L1225)

Clear the entire screen.

#### Returns

`void`

***

### createFieldGroup()

> **createFieldGroup**(`state`): `void`

Defined in: [renderers/renderer.ts:812](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/renderers/renderer.ts#L812)

Create the field group for the node

#### Parameters

##### state

[`DrawState`](../interfaces/DrawState.md)

#### Returns

`void`

***

### createNodeGroup()

> **createNodeGroup**(`node`): `G`

Defined in: [renderers/renderer.ts:756](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/renderers/renderer.ts#L756)

Creates the SVG group for the given node.

#### Parameters

##### node

[`NodeSvg`](NodeSvg.md)

The node to create the group for.

#### Returns

`G`

The created SVG group element.

***

### drawAllFieldsForNode()

> **drawAllFieldsForNode**(`nodeMeasurements`): `number` \| `undefined`

Defined in: [renderers/renderer.ts:903](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/renderers/renderer.ts#L903)

Draw all fields on a node

#### Parameters

##### nodeMeasurements

The node's measurements

`NodeMeasurements` | `null`

#### Returns

`number` \| `undefined`

The final Y position.

***

### drawComments()

> **drawComments**(): `void`

Defined in: [renderers/renderer.ts:1004](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/renderers/renderer.ts#L1004)

Draws all comments in the workspace.

#### Returns

`void`

Void.

***

### drawConnector()

> **drawConnector**(`nodeGroup`, `nodeBg`, `y`, `side`, `color`): `void` \| `Path` \| `null` \| `undefined`

Defined in: [renderers/renderer.ts:656](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/renderers/renderer.ts#L656)

Draws a connector on the specified side of the node.

#### Parameters

##### nodeGroup

`G`

The SVG group element for the node.

##### nodeBg

`Path`

The background SVG path of the node.

##### y

`number`

The Y position for the connector.

##### side

The side to draw the connector on ('left' or 'right').

`"left"` | `"right"`

##### color

`string`

The color of the connector.

#### Returns

`void` \| `Path` \| `null` \| `undefined`

The SVG path of the connector or null if not drawn.

***

### drawFieldForNode()

> **drawFieldForNode**(`field`, `measurements`, `idx`, `y`): `void`

Defined in: [renderers/renderer.ts:826](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/renderers/renderer.ts#L826)

Draw a field on a node.

#### Parameters

##### field

[`AnyField`](../type-aliases/AnyField.md)

The field to draw

##### measurements

`NodeMeasurements`

The node's measurements

##### idx

`number`

Index of the field in the fieldColumn list

##### y

`number`

the y position of the field

#### Returns

`void`

***

### drawFieldLabel()

> **drawFieldLabel**(`fieldGroup`, `field`, `startX`): `number`

Defined in: [renderers/renderer.ts:574](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/renderers/renderer.ts#L574)

Draws the label of a field.

#### Parameters

##### fieldGroup

`G`

The SVG group element for the field.

##### field

[`AnyField`](../type-aliases/AnyField.md)

The field to draw the label for.

##### startX

`number` = `0`

The starting X position for the label.

#### Returns

`number`

The width used by the label including spacing.

***

### drawFieldRaw()

> **drawFieldRaw**(`fieldGroup`, `field`, `startX`): `object`

Defined in: [renderers/renderer.ts:527](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/renderers/renderer.ts#L527)

Draws a raw input field.

#### Parameters

##### fieldGroup

`G`

The SVG group element for the field.

##### field

[`AnyField`](../type-aliases/AnyField.md)

The field to draw.

##### startX

`number` = `0`

The starting X position for the field.

#### Returns

`object`

The rectangle and text elements of the raw field.

##### rawBox

> **rawBox**: [`FieldRawBoxData`](../interfaces/FieldRawBoxData.md)

##### rect

> **rect**: `Rect`

##### txt

> **txt**: `Text`

***

### drawLinesForAllNodes()

> **drawLinesForAllNodes**(): `void`

Defined in: [renderers/renderer.ts:1144](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/renderers/renderer.ts#L1144)

Draw the connection lines between node's connector bubbles.

#### Returns

`void`

***

### drawNode()

> **drawNode**(): `void`

Defined in: [renderers/renderer.ts:731](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/renderers/renderer.ts#L731)

Draws the current node.

#### Returns

`void`

Void.

***

### drawNodeBase()

> **drawNodeBase**(`state`, `measurements`): `void`

Defined in: [renderers/renderer.ts:770](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/renderers/renderer.ts#L770)

Draws the base and shadow of the node.

#### Parameters

##### state

[`DrawState`](../interfaces/DrawState.md)

The current drawing state.

##### measurements

The measurements of the node.

`NodeMeasurements` | `null`

#### Returns

`void`

***

### drawNodeLabel()

> **drawNodeLabel**(`nodeGroup`): `void`

Defined in: [renderers/renderer.ts:703](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/renderers/renderer.ts#L703)

Draws the label on the node's top bar.

#### Parameters

##### nodeGroup

`G`

The SVG group element for the node.

#### Returns

`void`

Void.

***

### drawNodeTopbar()

> **drawNodeTopbar**(`state`, `colors`, `measurements`): `void`

Defined in: [renderers/renderer.ts:789](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/renderers/renderer.ts#L789)

Draw the node's topbar

#### Parameters

##### state

[`DrawState`](../interfaces/DrawState.md)

The draw state

##### colors

[`ColorStyle`](../interfaces/ColorStyle.md)

The colors of the node.

##### measurements

The measurement data of the node.

`NodeMeasurements` | `null`

#### Returns

`void`

***

### drawNodeXButton()

> **drawNodeXButton**(): `void`

Defined in: [renderers/renderer.ts:600](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/renderers/renderer.ts#L600)

Draws the X button on the node's top bar.

#### Returns

`void`

Void.

***

### drawPreviousNextConnections()

> **drawPreviousNextConnections**(`state`, `node`, `nodeGroup`, `measurements`): `void`

Defined in: [renderers/renderer.ts:932](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/renderers/renderer.ts#L932)

Draw the previous and next connections of a node.

#### Parameters

##### state

[`DrawState`](../interfaces/DrawState.md)

The draw-state

##### node

[`NodeSvg`](NodeSvg.md)

The node-svg

##### nodeGroup

`G`

the node's group

##### measurements

the node's measurements

\{ `height`: `number`; `width`: `number`; \} | `null`

#### Returns

`void`

Void

***

### drawState()

> **drawState**(`nodeGroup`, `id`): [`DrawState`](../interfaces/DrawState.md)

Defined in: [renderers/renderer.ts:505](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/renderers/renderer.ts#L505)

Build a draw state for the given node group and ID.

#### Parameters

##### nodeGroup

`G`

The SVG group element for the node.

##### id

`string`

The ID of the node.

#### Returns

[`DrawState`](../interfaces/DrawState.md)

- The constructed DrawState object.

***

### fillAllNodeConnectorBubbles()

> **fillAllNodeConnectorBubbles**(): `void`

Defined in: [renderers/renderer.ts:1069](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/renderers/renderer.ts#L1069)

Fill every node's connector bubble data with the corresponding bubble its connected to on a sibling node.

#### Returns

`void`

***

### getFieldMeasurementPadding()

> **getFieldMeasurementPadding**(): `object`

Defined in: [renderers/renderer.ts:349](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/renderers/renderer.ts#L349)

Gets the padding to apply when measuring a field.

#### Returns

`object`

The width and height padding for the field.

##### height

> **height**: `number` = `0`

##### width

> **width**: `number`

***

### getNodeBaseMeasurements()

> **getNodeBaseMeasurements**(): `object`

Defined in: [renderers/renderer.ts:229](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/renderers/renderer.ts#L229)

Gets the base measurements for a node.

#### Returns

`object`

The base width and height of the node.

##### height

> **height**: `number` = `c.NODE_BASE_HEIGHT`

##### width

> **width**: `number` = `c.NODE_BASE_WIDTH`

***

### getNodeColors()

> **getNodeColors**(): [`ColorStyle`](../interfaces/ColorStyle.md)

Defined in: [renderers/renderer.ts:1055](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/renderers/renderer.ts#L1055)

Gets the colors for the current node.

#### Returns

[`ColorStyle`](../interfaces/ColorStyle.md)

The color style of the node.

***

### getWs()

> **getWs**(): [`WorkspaceSvg`](WorkspaceSvg.md)

Defined in: [renderers/renderer.ts:220](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/renderers/renderer.ts#L220)

Gets the workspace associated with the renderer.

#### Returns

[`WorkspaceSvg`](WorkspaceSvg.md)

The workspace instance.

***

### getZoom()

> **getZoom**(): `number`

Defined in: [renderers/renderer.ts:1011](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/renderers/renderer.ts#L1011)

Gets the current zoom level of the workspace.

#### Returns

`number`

The zoom level.

***

### init()

> **init**(): `void`

Defined in: [renderers/renderer.ts:140](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/renderers/renderer.ts#L140)

Initializes the renderer by setting up the comment renderer, representer, and constants.

#### Returns

`void`

***

### initCommentRenderer()

> **initCommentRenderer**(): `void`

Defined in: [renderers/renderer.ts:161](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/renderers/renderer.ts#L161)

Initializes the comment renderer for the workspace.

#### Returns

`void`

***

### initConstants()

> **initConstants**(): `void`

Defined in: [renderers/renderer.ts:148](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/renderers/renderer.ts#L148)

Initializes the renderer constants with any provided overrides.

#### Returns

`void`

***

### initRepresenter()

> **initRepresenter**(): `void`

Defined in: [renderers/renderer.ts:154](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/renderers/renderer.ts#L154)

Initializes the representer for the renderer.

#### Returns

`void`

***

### makeNodeDraggable()

> **makeNodeDraggable**(`nodeGroup`, `dragHandle`, `node`): `void`

Defined in: [renderers/renderer.ts:803](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/renderers/renderer.ts#L803)

Make a node draggable.

#### Parameters

##### nodeGroup

`G`

The node group to make draggable

##### dragHandle

`Path`

The drag handle

##### node

[`NodeSvg`](NodeSvg.md)

The nodesvg

#### Returns

`void`

***

### measureBaseAndLabel()

> `private` **measureBaseAndLabel**(): `object`

Defined in: [renderers/renderer.ts:445](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/renderers/renderer.ts#L445)

Measures the base dimensions of the current node including label.

#### Returns

`object`

The width and height of the node base and label.

##### height

> **height**: `number`

##### width

> **width**: `number`

***

### measureCustom()

> **measureCustom**(`field`): `object`

Defined in: [renderers/renderer.ts:333](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/renderers/renderer.ts#L333)

Measures the custom editor of a field.

#### Parameters

##### field

[`AnyField`](../type-aliases/AnyField.md)

The field to measure the custom editor for.

#### Returns

`object`

The width and height of the custom editor.

##### height

> **height**: `number`

##### width

> **width**: `number`

***

### measureField()

> **measureField**(`field`): `object`

Defined in: [renderers/renderer.ts:357](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/renderers/renderer.ts#L357)

Measures the overall dimensions of a field.

#### Parameters

##### field

[`AnyField`](../type-aliases/AnyField.md)

The field to measure.

#### Returns

`object`

The width and height of the field.

##### height

> **height**: `number`

##### width

> **width**: `number`

***

### measureFields()

> **measureFields**(`startY`, `startWidth`, `startHeight`): `object`

Defined in: [renderers/renderer.ts:405](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/renderers/renderer.ts#L405)

Measures all fields of the current node.

#### Parameters

##### startY

`number`

The starting Y position for the fields.

##### startWidth

`number`

The starting width of the node.

##### startHeight

`number`

The starting height of the node.

#### Returns

`object`

The width, height, and field dimensions.

##### fields

> **fields**: `object`[]

##### height

> **height**: `number`

##### width

> **width**: `number`

***

### measureLabel()

> **measureLabel**(`field`): `object`

Defined in: [renderers/renderer.ts:303](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/renderers/renderer.ts#L303)

Measures the label of a field.

#### Parameters

##### field

[`AnyField`](../type-aliases/AnyField.md)

The field to measure the label for.

#### Returns

`object`

The width and height of the label.

##### height

> **height**: `number`

##### width

> **width**: `number`

***

### measureNodeDimensions()

> **measureNodeDimensions**(): `void` \| `NodeMeasurements` \| `null`

Defined in: [renderers/renderer.ts:379](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/renderers/renderer.ts#L379)

Measures the overall dimensions of the current node.

#### Returns

`void` \| `NodeMeasurements` \| `null`

The measurements of the node including width, height, and field dimensions.

***

### measureRaw()

> **measureRaw**(`field`): `object`

Defined in: [renderers/renderer.ts:318](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/renderers/renderer.ts#L318)

Measures the raw input of a field.

#### Parameters

##### field

[`AnyField`](../type-aliases/AnyField.md)

The field to measure the raw input for.

#### Returns

`object`

The width and height of the raw input.

##### height

> **height**: `number`

##### width

> **width**: `number`

***

### measureRawField()

> **measureRawField**(`text`): `object`

Defined in: [renderers/renderer.ts:291](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/renderers/renderer.ts#L291)

Measures the dimensions of a raw input field.

#### Parameters

##### text

`string` = `""`

The text content of the raw field.

#### Returns

`object`

The width and height of the raw field.

##### height

> **height**: `number`

##### width

> **width**: `number`

***

### measureTextHeight()

> **measureTextHeight**(`text`, `fontSize?`, `fontFamily?`): `number`

Defined in: [renderers/renderer.ts:268](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/renderers/renderer.ts#L268)

Measures the height of the given text.

#### Parameters

##### text

`string`

The text to measure.

##### fontSize?

`number`

The font size to use.

##### fontFamily?

`string`

The font family to use.

#### Returns

`number`

The height of the text.

***

### measureTextWidth()

> **measureTextWidth**(`text`, `fontSize?`, `fontFamily?`): `number`

Defined in: [renderers/renderer.ts:243](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/renderers/renderer.ts#L243)

Measures the width of the given text.

#### Parameters

##### text

`string`

The text to measure.

##### fontSize?

`number`

The font size to use.

##### fontFamily?

`string`

The font family to use.

#### Returns

`number`

The width of the text.

***

### refreshComments()

> **refreshComments**(): `void`

Defined in: [renderers/renderer.ts:990](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/renderers/renderer.ts#L990)

Refreshes the comment transforms.

#### Returns

`void`

Void.

***

### refreshConnectionLines()

> **refreshConnectionLines**(): `void`

Defined in: [renderers/renderer.ts:1047](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/renderers/renderer.ts#L1047)

Refreshes all connection lines in the workspace.

#### Returns

`void`

Void.

***

### refreshNodeTransforms()

> **refreshNodeTransforms**(): `void`

Defined in: [renderers/renderer.ts:1028](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/renderers/renderer.ts#L1028)

Refreshes the transforms of all nodes in the workspace.

#### Returns

`void`

Void.

***

### renderNode()

> **renderNode**(`nodeIdOrNode`): `void`

Defined in: [renderers/renderer.ts:474](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/renderers/renderer.ts#L474)

Renders the specified node by drawing it and building its representation.

#### Parameters

##### nodeIdOrNode

The node or node ID to render.

`string` | [`NodeSvg`](NodeSvg.md)

#### Returns

`void`

Void.

***

### rerenderNode()

> **rerenderNode**(`node`): `G` \| `null` \| `undefined`

Defined in: [renderers/renderer.ts:1262](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/renderers/renderer.ts#L1262)

Called whenever a node must be visually rendered or rerendered.
Implementations must be idempotent.

#### Parameters

##### node

[`NodeSvg`](NodeSvg.md)

The node to render/rerender

#### Returns

`G` \| `null` \| `undefined`

SVG group of the node.

***

### resolveConnectable()

> **resolveConnectable**(`connectable`, `fromConn`): [`Connection`](Connection.md) \| `null` \| `undefined`

Defined in: [renderers/renderer.ts:1098](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/renderers/renderer.ts#L1098)

Resolves the connectable to the appropriate connection based on the originating connection.

#### Parameters

##### connectable

[`Connectable`](../type-aliases/Connectable.md)

The connectable entity (NodeSvg or Field).

##### fromConn

[`Connection`](Connection.md)

The originating connection.

#### Returns

[`Connection`](Connection.md) \| `null` \| `undefined`

***

### setConnect()

> **setConnect**(`c`): `void`

Defined in: [renderers/renderer.ts:168](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/renderers/renderer.ts#L168)

Sets the connection to be processed.

#### Parameters

##### c

[`ConnectorToFrom`](../interfaces/ConnectorToFrom.md)

The connection to set.

#### Returns

`void`

***

### setConstants()

> **setConstants**(`c`): [`RendererConstants`](RendererConstants.md) & `Partial`\<[`RendererConstants`](RendererConstants.md)\>

Defined in: [renderers/renderer.ts:176](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/renderers/renderer.ts#L176)

Sets the renderer constants.

#### Parameters

##### c

`Partial`\<[`RendererConstants`](RendererConstants.md)\> = `{}`

Partial constants to override.

#### Returns

[`RendererConstants`](RendererConstants.md) & `Partial`\<[`RendererConstants`](RendererConstants.md)\>

The updated constants.

***

### startNode()

> **startNode**(`nodeIdOrNode`): `void`

Defined in: [renderers/renderer.ts:485](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/renderers/renderer.ts#L485)

Starts rendering the specified node.

#### Parameters

##### nodeIdOrNode

The node or node ID to start rendering.

`string` | [`NodeSvg`](NodeSvg.md)

#### Returns

`void`

***

### storeState()

> **storeState**(): `void`

Defined in: [renderers/renderer.ts:516](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/renderers/renderer.ts#L516)

Stores the current draw state.

#### Returns

`void`

***

### undoPendingConnsFor()

> **undoPendingConnsFor**(`conn`): `void`

Defined in: [renderers/renderer.ts:1244](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/renderers/renderer.ts#L1244)

Remove pending connections for a specific connection

#### Parameters

##### conn

[`ConnectorToFrom`](../interfaces/ConnectorToFrom.md)

The connection

#### Returns

`void`
