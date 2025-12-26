import RendererConstants from "./constants";
import WorkspaceSvg from '../src/workspace-svg';
import NodeSvg from '../src/nodesvg';
import { G, Path as SvgPath, Svg, Rect } from "@svgdotjs/svg.js";
import { ColorStyle } from "../src/visual-types";
import { AnyField, FieldRawBoxData } from "../src/field";
import Connection, { Connectable } from "../src/connection";
import CommentRenderer from "../comment-renderer/renderer";
import type Representer from "./representer";
export interface ConnectorToFrom {
    to: Connection;
    from: Connection;
    fromCircle?: SvgPath;
    toCircle?: SvgPath;
    originConn: Connection;
    originCircle: SvgPath;
}
export interface DrawState {
    id: string;
    shadow?: SvgPath;
    topbar?: SvgPath | null;
    bg?: SvgPath | null;
    group?: G | null;
    fieldCol?: G | null;
    fieldPosY?: number | null;
    xButton?: G;
    pendingConnections: ConnectorToFrom[];
}
export interface NodeMeasurements {
    width: number;
    height: number;
    fields: {
        width: number;
        height: number;
    }[];
}
declare class Renderer {
    /**
     * Set of constants the renderer uses for drawing nodes.
     */
    _constants: RendererConstants;
    /**
     * The current node being rendered.
     */
    _currentNode: NodeSvg | null;
    /**
     * The SVG group element for the current node.
     */
    _nodeGroup: G | null;
    /**
     * The current drawing state for the node.
     */
    _nodeDraw: DrawState | null;
    /**
     * The workspace this renderer is associated with.
     */
    _ws: WorkspaceSvg;
    /**
     * Array of stored draw states for rendered nodes.
     */
    _drawStates: DrawState[];
    /**
     * Comment renderer instance used for rendering comments.
     */
    _commentDrawer: CommentRenderer;
    /**
     * Representer instance used for building node representations.
     */
    representer: Representer;
    /**
     * Constant overrides provided during renderer instantiation.
     */
    constantOverrides: Partial<RendererConstants>;
    /**
     * Tag used for node group elements in the SVG.
     */
    static get NODE_G_TAG(): string;
    /**
     * Tag used for renderer elements in the SVG.
     */
    static get ELEMENT_TAG(): string;
    /**
     * Tag used for connection line elements in the SVG.
     */
    static get CONN_LINE_TAG(): string;
    /**
     * Tag used for connector elements in the SVG.
     */
    static get CONNECTOR_TAG(): string;
    /**
     * Tag used for line X mark elements in the SVG.
     */
    static get LINE_X_MARK_TAG(): string;
    /**
     * Tag used for background pattern elements in the SVG. This is constant, do not modify it in subclasses.
     */
    static get BACKGROUND_PATTERN(): string;
    /**
     * Name of the renderer.
     */
    static get NAME(): string;
    /**
     * Constructor for the Renderer class.
     * @param workspace - The workspace associated with the renderer.
     * @param overrides - Optional constant overrides for the renderer.
     */
    constructor(workspace: WorkspaceSvg, overrides?: Partial<RendererConstants>);
    /**
     * Initializes the renderer by setting up the comment renderer, representer, and constants.
     */
    init(): void;
    /**
     * Initializes the renderer constants with any provided overrides.
     */
    initConstants(): void;
    /**
     * Initializes the representer for the renderer.
     */
    initRepresenter(): void;
    /**
     * Initializes the comment renderer for the workspace.
     */
    initCommentRenderer(): void;
    /**
     * Sets the connection to be processed.
     * @param c - The connection to set.
     */
    setConnect(c: ConnectorToFrom): void;
    /**
     * Sets the renderer constants.
     * @param c - Partial constants to override.
     * @returns The updated constants.
     */
    setConstants(c?: Partial<RendererConstants>): RendererConstants & Partial<RendererConstants>;
    /**
     * Gets the renderer constants, merging with node style if applicable.
     */
    get constants(): RendererConstants;
    /**
     * Sets the renderer constants.
     */
    set constants(c: Partial<RendererConstants>);
    /**
     * Gets the current node being rendered.
     */
    get node(): NodeSvg | null;
    /**
     * Gets the SVG.js instance from the workspace.
     */
    get svg(): Svg;
    /**
     * Gets the current drawing state.
     */
    get state(): null | undefined | DrawState;
    /**
     * Gets the workspace associated with the renderer.
     * @returns The workspace instance.
     */
    getWs(): WorkspaceSvg;
    /**
     * Gets the base measurements for a node.
     * @returns The base width and height of the node.
     */
    getNodeBaseMeasurements(): {
        width: number;
        height: number;
    };
    /**
     * Measures the width of the given text.
     * @param text - The text to measure.
     * @param fontSize - The font size to use.
     * @param fontFamily - The font family to use.
     * @returns The width of the text.
     */
    measureTextWidth(text: string, fontSize?: number, fontFamily?: string): number;
    /**
     * Measures the height of the given text.
     * @param text - The text to measure.
     * @param fontSize - The font size to use.
     * @param fontFamily - The font family to use.
     * @returns The height of the text.
     */
    measureTextHeight(text: string, fontSize?: number, fontFamily?: string): number;
    /**
     * Measures the dimensions of a raw input field.
     * @param text - The text content of the raw field.
     * @returns The width and height of the raw field.
     */
    measureRawField(text?: string): {
        width: number;
        height: number;
    };
    /**
     * Measures the label of a field.
     * @param field - The field to measure the label for.
     * @returns The width and height of the label.
     */
    measureLabel(field: AnyField): {
        width: number;
        height: number;
    };
    /**
     * Measures the raw input of a field.
     * @param field - The field to measure the raw input for.
     * @returns The width and height of the raw input.
     */
    measureRaw(field: AnyField): {
        width: number;
        height: number;
    };
    /**
     * Measures the custom editor of a field.
     * @param field - The field to measure the custom editor for.
     * @returns The width and height of the custom editor.
     */
    measureCustom(field: AnyField): {
        width: number;
        height: number;
    };
    /**
     * Gets the padding to apply when measuring a field.
     * @returns The width and height padding for the field.
     */
    getFieldMeasurementPadding(): {
        width: number;
        height: number;
    };
    /**
     * Measures the overall dimensions of a field.
     * @param field - The field to measure.
     * @returns The width and height of the field.
     */
    measureField(field: AnyField): {
        width: number;
        height: number;
    };
    /**
     * Measures the overall dimensions of the current node.
     * @returns The measurements of the node including width, height, and field dimensions.
     */
    measureNodeDimensions(): NodeMeasurements | void | null;
    /**
     * Measures all fields of the current node.
     * @param startY The starting Y position for the fields.
     * @param startWidth The starting width of the node.
     * @param startHeight The starting height of the node.
     * @returns The width, height, and field dimensions.
     */
    measureFields(startY: number, startWidth: number, startHeight: number): {
        width: number;
        height: number;
        fields: {
            width: number;
            height: number;
        }[];
    };
    /**
     * Measures the base dimensions of the current node including label.
     * @returns The width and height of the node base and label.
     */
    private measureBaseAndLabel;
    /**
     * Renders the specified node by drawing it and building its representation.
     * @param nodeIdOrNode The node or node ID to render.
     * @returns Void.
     */
    renderNode(nodeIdOrNode: NodeSvg | string): void;
    /**
     * Starts rendering the specified node.
     * @param nodeIdOrNode The node or node ID to start rendering.
     */
    startNode(nodeIdOrNode: NodeSvg | string): void;
    /**
     * Build a draw state for the given node group and ID.
     * @param nodeGroup - The SVG group element for the node.
     * @param id  - The ID of the node.
     * @returns - The constructed DrawState object.
     */
    drawState(nodeGroup: G, id: string): DrawState;
    /**
     * Stores the current draw state.
     */
    storeState(): void;
    /**
     * Draws a raw input field.
     * @param fieldGroup - The SVG group element for the field.
     * @param field - The field to draw.
     * @param startX - The starting X position for the field.
     * @returns The rectangle and text elements of the raw field.
     */
    drawFieldRaw(fieldGroup: G, field: AnyField, startX?: number): {
        rect: Rect;
        txt: import("@svgdotjs/svg.js", { with: { "resolution-mode": "import" } }).Text;
        rawBox: FieldRawBoxData;
    };
    /**
     * Draws the label of a field.
     * @param fieldGroup - The SVG group element for the field.
     * @param field - The field to draw the label for.
     * @param startX - The starting X position for the label.
     * @returns The width used by the label including spacing.
     */
    drawFieldLabel(fieldGroup: G, field: AnyField, startX?: number): number;
    /**
     * Draws the X button on the node's top bar.
     * @returns Void.
     */
    drawNodeXButton(): void;
    /**
     * Draws a connector on the specified side of the node.
     * @param nodeGroup - The SVG group element for the node.
     * @param nodeBg - The background SVG path of the node.
     * @param y - The Y position for the connector.
     * @param side - The side to draw the connector on ('left' or 'right').
     * @param color - The color of the connector.
     * @returns The SVG path of the connector or null if not drawn.
     */
    drawConnector(nodeGroup: G, nodeBg: SvgPath, y: number, side: 'left' | 'right', color: string): SvgPath | void | undefined | null;
    /**
     * Draws the label on the node's top bar.
     * @param nodeGroup - The SVG group element for the node.
     * @returns Void.
     */
    drawNodeLabel(nodeGroup: G): void;
    /**
     * Draws the current node.
     * @returns Void.
     */
    drawNode(): void;
    /**
     * Creates the SVG group for the given node.
     * @param node - The node to create the group for.
     * @returns The created SVG group element.
     */
    createNodeGroup(node: NodeSvg): G;
    /**
     * Draws the base and shadow of the node.
     * @param state - The current drawing state.
     * @param measurements - The measurements of the node.
     */
    drawNodeBase(state: DrawState, measurements: NodeMeasurements | null): void;
    /**
     * Draw the node's topbar
     * @param state - The draw state
     * @param colors - The colors of the node.
     * @param measurements - The measurement data of the node.
     */
    drawNodeTopbar(state: DrawState, colors: ColorStyle, measurements: NodeMeasurements | null): void;
    /**
     * Make a node draggable.
     * @param nodeGroup - The node group to make draggable
     * @param dragHandle - The drag handle
     * @param node - The nodesvg
     */
    makeNodeDraggable(nodeGroup: G, dragHandle: SvgPath, node: NodeSvg): void;
    /** Create the field group for the node */
    createFieldGroup(state: DrawState): void;
    /**
     * Draw a field on a node.
     * @param field - The field to draw
     * @param measurements - The node's measurements
     * @param idx - Index of the field in the fieldColumn list
     * @param y - the y position of the field
     * @returns
     */
    drawFieldForNode(field: AnyField, measurements: NodeMeasurements, idx: number, y: number): void;
    /**
     * Draw all fields on a node
     * @param nodeMeasurements - The node's measurements
     * @returns The final Y position.
     */
    drawAllFieldsForNode(nodeMeasurements?: NodeMeasurements | null): number | undefined;
    /**
     * Draw the previous and next connections of a node.
     * @param state - The draw-state
     * @param node - The node-svg
     * @param nodeGroup - the node's group
     * @param measurements - the node's measurements
     * @returns Void
     */
    drawPreviousNextConnections(state: DrawState, node: NodeSvg, nodeGroup: G, measurements?: {
        width: number;
        height: number;
    } | null): void;
    /**
     * Refreshes the comment transforms.
     * @returns Void.
     */
    refreshComments(): void;
    /**
     * Clears all comments from the workspace.
     * @returns Void.
     */
    clearComments(): void;
    /**
     * Draws all comments in the workspace.
     * @returns Void.
     */
    drawComments(): void;
    /**
     * Gets the current zoom level of the workspace.
     * @returns The zoom level.
     */
    getZoom(): number;
    /**
     * Applies the current zoom level to the specified node group.
     * @param nodeG - The SVG group element of the node.
     * @param node - The node to apply zoom to.
     */
    applyZoomToNode(nodeG: G, node: NodeSvg): void;
    /**
     * Refreshes the transforms of all nodes in the workspace.
     * @returns Void.
     */
    refreshNodeTransforms(): void;
    /**
     * Refreshes all connection lines in the workspace.
     * @returns Void.
     */
    refreshConnectionLines(): void;
    /**
     * Gets the colors for the current node.
     * @returns The color style of the node.
     */
    getNodeColors(): ColorStyle;
    /**
     * Fill every node's connector bubble data with the corresponding bubble its connected to on a sibling node.
     */
    fillAllNodeConnectorBubbles(): void;
    /**
     * Resolves the connectable to the appropriate connection based on the originating connection.
     * @param connectable - The connectable entity (NodeSvg or Field).
     * @param fromConn - The originating connection.
     * @returns
     */
    resolveConnectable(connectable: Connectable, fromConn: Connection): Connection | null | undefined;
    /**
     * Fills in the connector circle for other nodes based on the given connection.
     * @param conn - The connection to match.
     * @param circle - The SVG path of the connector circle.
     * @param isPrevious - Whether the connection is a previous connection.
     */
    _fillOtherNodeConnectorCircle(conn: Connection, circle: SvgPath, isPrevious: boolean): void;
    /**
     * Draw the connection lines between node's connector bubbles.
     */
    drawLinesForAllNodes(): void;
    /**
     * Clear connection lines and their X marks.
     */
    clearLines(): void;
    /**
     * Clear the entire screen.
     */
    clearScreen(): void;
    /**
     * Remove pending connections for a specific connection
     * @param conn - The connection
     */
    undoPendingConnsFor(conn: ConnectorToFrom): void;
    /**
     * Called whenever a node must be visually rendered or rerendered.
     * Implementations must be idempotent.
     * @param node - The node to render/rerender
     * @returns SVG group of the node.
     */
    rerenderNode(node: NodeSvg): G | null | undefined;
}
export default Renderer;
//# sourceMappingURL=renderer.d.ts.map