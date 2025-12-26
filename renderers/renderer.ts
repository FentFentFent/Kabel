import RendererConstants from "./constants";
import WorkspaceSvg from '../src/workspace-svg';
import NodeSvg from '../src/nodesvg';
import * as Path from '../util/path';
import { parseColor } from "../util/parse-color";
import { G, Path as SvgPath, Svg, StrokeData, Element, List, Rect } from "@svgdotjs/svg.js";
import { Color, ColorStyle, Hex } from "../src/visual-types";
import Field, { AnyField, ConnectableField, DummyField, FieldRawBoxData, OptConnectField } from "../src/field";
import eventer from '../util/eventer';
import Connection, { Connectable } from "../src/connection";
import escapeAttr from '../util/escape-html';
import unescapeAttr from '../util/unescape-html';
import CommentRenderer from "../comment-renderer/renderer";
import { FieldVisualInfo } from "../src/field";
import { RepresenterNode } from "./representer-node";
import type Representer from "./representer";

export interface ConnectorToFrom {
    to: Connection,
    from: Connection,
    fromCircle?: SvgPath,
    toCircle?: SvgPath,
    originConn: Connection,
    originCircle: SvgPath
}
export interface DrawState {
    id: string;
    shadow?: SvgPath;
    topbar?: SvgPath | null;
    bg?: SvgPath | null;
    group?: G | null;
    fieldCol?: G | null;
    fieldPosY?: number | null; // starts under topbar, goes down by field height each time one is drawn. This determines position
    xButton?: G;
    pendingConnections: ConnectorToFrom[]
}
export interface NodeMeasurements {
    width: number;
    height: number;
    fields: { width: number; height: number }[];
}

class Renderer {
    /**
     * Set of constants the renderer uses for drawing nodes.
     */
    _constants!: RendererConstants;
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
    _commentDrawer!: CommentRenderer;
    /**
     * Representer instance used for building node representations.
     */
    representer!: Representer;
    /**
     * Constant overrides provided during renderer instantiation.
     */
    constantOverrides: Partial<RendererConstants>;
    /**
     * Tag used for node group elements in the SVG.
     */
    static get NODE_G_TAG() {
        return 'AtlasNodeSVG';
    }
    /**
     * Tag used for renderer elements in the SVG.
     */
    static get ELEMENT_TAG() {
        return 'AtlasElement'
    }
    /**
     * Tag used for connection line elements in the SVG.
     */
    static get CONN_LINE_TAG() {
        return 'AtlasConnectionLine';
    }
    /**
     * Tag used for connector elements in the SVG.
     */
    static get CONNECTOR_TAG() {
        return 'AtlasConnectionBubble';
    }
    /**
     * Tag used for line X mark elements in the SVG.
     */
    static get LINE_X_MARK_TAG() {
        return 'AtlasLineXMark';
    }
    /**
     * Tag used for background pattern elements in the SVG. This is constant, do not modify it in subclasses.
     */
    static get BACKGROUND_PATTERN() {
        /** ! CONSTANT ! DO NOT CHANGE ! CONSTANT ! */
        return 'WorkspaceBgPattern'
    }
    /**
     * Name of the renderer.
     */
    static get NAME() {
        return 'atlas'; // default is called atlas.
    }
    /**
     * Constructor for the Renderer class.
     * @param workspace - The workspace associated with the renderer.
     * @param overrides - Optional constant overrides for the renderer.
     */
    constructor(workspace: WorkspaceSvg, overrides: Partial<RendererConstants> = {}) {
        this._ws = workspace;
        this._currentNode = null;
        this._nodeGroup = null;
        this._nodeDraw = null;
        this._drawStates = [];
        this.constantOverrides = overrides;
        this.init();
    }
    /**
     * Initializes the renderer by setting up the comment renderer, representer, and constants.
     */
    init() {
        this.initCommentRenderer();
        this.initRepresenter();
        this.initConstants();
    }
    /**
     * Initializes the renderer constants with any provided overrides.
     */
    initConstants() {
        this._constants = new RendererConstants(this.constantOverrides);
    }
    /**
     * Initializes the representer for the renderer.
     */
    initRepresenter() {
        const Representer = (require('./representer').default);
        this.representer = new Representer();
    }
    /**
     * Initializes the comment renderer for the workspace.
     */
    initCommentRenderer() {
        this._commentDrawer = new CommentRenderer(this.getWs());
    }
    /**
     * Sets the connection to be processed.
     * @param c - The connection to set.
     */
    setConnect(c: ConnectorToFrom) {
        this.state?.pendingConnections?.push?.(c);
    }
    /**
     * Sets the renderer constants.
     * @param c - Partial constants to override.
     * @returns The updated constants.
     */
    setConstants(c: Partial<RendererConstants> = {}) {
        return Object.assign(this._constants, c);
    }
    /**
     * Gets the renderer constants, merging with node style if applicable.
     */
    get constants(): RendererConstants {
        if (!this.node) return this._constants;

        const { primary, secondary, tertiary, ...restColors } = this.node.colors;

        return {
            ...this._constants,
            ...restColors
        };
    }
    /**
     * Sets the renderer constants.
     */
    set constants(c: Partial<RendererConstants>) {
        this.setConstants(c);
    }
    /**
     * Gets the current node being rendered.
     */
    get node() {
        return this._currentNode;
    }
    /**
     * Gets the SVG.js instance from the workspace.
     */
    get svg(): Svg {
        return this.getWs().svg; // Svg.js instance
    }
    /**
     * Gets the current drawing state.
     */
    get state(): null | undefined | DrawState {
        return this._nodeDraw;
    }
    /**
     * Gets the workspace associated with the renderer.
     * @returns The workspace instance.
     */
    getWs() {
        return this._ws;
    }
    // MEASURING -

    /**
     * Gets the base measurements for a node.
     * @returns The base width and height of the node.
     */
    getNodeBaseMeasurements() {
        const c = this.constants;
        return {
            width: c.NODE_BASE_WIDTH,
            height: c.NODE_BASE_HEIGHT
        }
    }
    /**
     * Measures the width of the given text.
     * @param text - The text to measure.
     * @param fontSize - The font size to use.
     * @param fontFamily - The font family to use.
     * @returns The width of the text.
     */
    measureTextWidth(text: string, fontSize?: number, fontFamily?: string): number {
        const c = this.constants;

        // fallback in case SVG is not ready
        if (!this.svg) return text.length * (fontSize ?? c.FONT_SIZE) * 0.6;

        const txt = this.svg.text(text)
            .font({
                family: fontFamily ?? c.FONT_FAMILY,
                size: fontSize ?? c.FONT_SIZE,
                anchor: 'start'
            })
            .opacity(0); // hide it

        const width = txt.bbox().width;
        txt.remove(); // clean up
        return width;
    }
    /**
     * Measures the height of the given text.
     * @param text - The text to measure.
     * @param fontSize - The font size to use.
     * @param fontFamily - The font family to use.
     * @returns The height of the text.
     */
    measureTextHeight(text: string, fontSize?: number, fontFamily?: string): number {
        const c = this.constants;

        // fallback in case SVG is not ready
        if (!this.svg) return (fontSize ?? c.FONT_SIZE);

        const txt = this.svg.text(text)
            .font({
                family: fontFamily ?? c.FONT_FAMILY,
                size: fontSize ?? c.FONT_SIZE,
                anchor: 'start'
            })
            .opacity(0); // hide it

        const height = txt.bbox().height;
        txt.remove(); // clean up
        return height;
    }
    /**
     * Measures the dimensions of a raw input field.
     * @param text - The text content of the raw field.
     * @returns The width and height of the raw field.
     */
    measureRawField(text: string = "") {
        const c = this.constants;
        const textW = this.measureTextWidth(text);
        const width = Math.max(c.FIELD_RAW_BASE_WIDTH, textW + c.INPUT_BOX_PADDING * 2);
        const height = c.FIELD_RAW_BASE_HEIGHT;
        return { width, height };
    }
    /**
     * Measures the label of a field.
     * @param field - The field to measure the label for.
     * @returns The width and height of the label.
     */
    measureLabel(field: AnyField): { width: number, height: number } {
        const c = this.constants;
        const label = field.getLabel?.();
        if (!label) return { width: 0, height: 0 };

        const width = this.measureTextWidth(label);
        const height = this.measureTextHeight(label);

        return { width, height };
    }
    /**
     * Measures the raw input of a field.
     * @param field - The field to measure the raw input for.
     * @returns The width and height of the raw input.
     */
    measureRaw(field: AnyField): { width: number, height: number } {
        if (!field.hasRaw()) return { width: 0, height: 0 };

        const c = this.constants;
        const raw = this.measureRawField(field.getValue?.() ?? "");
        return {
            width: raw.width,
            height: raw.height
        };
    }
    /**
     * Measures the custom editor of a field.
     * @param field - The field to measure the custom editor for.
     * @returns The width and height of the custom editor.
     */
    measureCustom(field: AnyField): { width: number, height: number } {
        if (!field.isCustomEditor()) return { width: 0, height: 0 };

        const c = this.constants;
        const m = field.measureMyself();
        if (!m) return { width: 0, height: 0 };

        let width = m.width as number;
        let height = m.height as number;

        return { width, height };
    }
    /**
     * Gets the padding to apply when measuring a field.
     * @returns The width and height padding for the field.
     */
    getFieldMeasurementPadding() {
        return { width: this.constants.FIELD_SPACEX, height: 0 }
    }
    /**
     * Measures the overall dimensions of a field.
     * @param field - The field to measure.
     * @returns The width and height of the field.
     */
    measureField(field: AnyField) {
        // parts of the measurement, correct order matters.
        const parts = [
            this.getFieldMeasurementPadding(),
            this.measureLabel(field),
            this.measureRaw(field),
            this.measureCustom(field),
            this.getFieldMeasurementPadding()
        ];

        let width = 0, height = 0;
        for (const { width: w, height: h } of parts) {
            width += w;
            height = Math.max(height, h);
        }

        return { width, height };
    }
    /**
     * Measures the overall dimensions of the current node.
     * @returns The measurements of the node including width, height, and field dimensions.
     */
    measureNodeDimensions(): NodeMeasurements | void | null {
        if (!this.node) return;

        const c = this.constants;

        const base = this.measureBaseAndLabel();

        const fieldResult = this.measureFields(
            c.TOPBAR_HEIGHT + c.FIELD_SPACEY,
            base.width,
            base.height
        );

        return {
            width: fieldResult.width,
            height: fieldResult.height + c.FOOTER_HEIGHT,
            fields: fieldResult.fields
        };
    }
    /**
     * Measures all fields of the current node.
     * @param startY The starting Y position for the fields.
     * @param startWidth The starting width of the node.
     * @param startHeight The starting height of the node.
     * @returns The width, height, and field dimensions.
     */
    measureFields(
        startY: number,
        startWidth: number,
        startHeight: number
    ): {
        width: number;
        height: number;
        fields: { width: number; height: number }[];
    } {
        const c = this.constants;
        const node = this.node!;

        let y = startY;
        let totalWidth = startWidth;
        let totalHeight = startHeight;
        const fields: { width: number; height: number }[] = [];

        for (const field of node.allFields()) {
            const m = this.measureField(field);
            fields.push(m);

            totalWidth = Math.max(
                totalWidth,
                m.width + c.FIELD_MARGIN_X * 2
            );

            const bottom = y + m.height;
            if (bottom + c.FIELD_MARGIN_Y > totalHeight) {
                totalHeight = bottom + c.FIELD_MARGIN_Y;
            }

            y += m.height + c.FIELD_MARGIN_Y;
        }

        return { width: totalWidth, height: totalHeight, fields };
    }
    /**
     * Measures the base dimensions of the current node including label.
     * @returns The width and height of the node base and label.
     */
    private measureBaseAndLabel(): { width: number; height: number } {
        const c = this.constants;
        const node = this.node!;

        const base = this.getNodeBaseMeasurements();
        let width = base.width;
        let height = base.height;

        if (node.labelText) {
            const labelW = this.measureTextWidth(
                node.labelText,
                c.FONT_SIZE,
                c.FONT_FAMILY
            );

            width = Math.max(
                width,
                labelW + c.TOPBAR_LABEL_MARGIN_X * 2
            );
        }

        return { width, height };
    }
    // renderNode METHOD + NODE DRAW INITING.
    /**
     * Renders the specified node by drawing it and building its representation.
     * @param nodeIdOrNode The node or node ID to render.
     * @returns Void.
     */
    renderNode(nodeIdOrNode: NodeSvg | string) {
        this.startNode(nodeIdOrNode);
        if (!this.node) return;
        this.drawNode();
        this.representer.build(this.node as NodeSvg, this, this.state as DrawState);
        this.storeState();
    }
    /**
     * Starts rendering the specified node.
     * @param nodeIdOrNode The node or node ID to start rendering.
     */
    startNode(nodeIdOrNode: NodeSvg | string) {
        const ws = this.getWs();
        if (nodeIdOrNode instanceof NodeSvg) {
            this._currentNode = nodeIdOrNode;
        } else {
            const node = ws.getNode(nodeIdOrNode);
            if (node instanceof NodeSvg) {
                this._currentNode = node;
            } else {
                this._currentNode = null;
            }
        }
    }
    // DRAW-STATE MANAGEMENT -
    /**
     * Build a draw state for the given node group and ID.
     * @param nodeGroup - The SVG group element for the node.
     * @param id  - The ID of the node.
     * @returns - The constructed DrawState object.
     */
    drawState(nodeGroup: G, id: string): DrawState {
        return {
            id,
            group: nodeGroup,
            fieldPosY: 0,
            pendingConnections: []
        }
    }
    /**
     * Stores the current draw state.
     */
    storeState() {
        this._drawStates.push(this.state as DrawState);
    }
    // DRAWING + EVENT INITIALIZING VIA EVENTER
    /**
     * Draws a raw input field.
     * @param fieldGroup - The SVG group element for the field.
     * @param field - The field to draw.
     * @param startX - The starting X position for the field.
     * @returns The rectangle and text elements of the raw field.
     */
    drawFieldRaw(fieldGroup: G, field: AnyField, startX: number = 0) {
        const c = this.constants;
        const value = field.getDisplayValue?.() ?? "";
        const { width, height } = this.measureRawField(value);

        const rect = fieldGroup.rect(width, height)
            .fill(parseColor(c.FIELD_RAW_COLOR))
            .stroke({ color: parseColor(c.FIELD_RAW_OUTLINE_COLOR), width: c.FIELD_RAW_OUTLINE_STROKE })
            .radius(3);

        const txt = fieldGroup.text(value)
            .font({
                family: c.FONT_FAMILY,
                size: c.FONT_SIZE,
                anchor: c.INPUT_BOX_TEXT_ANCHOR
            })
            .fill(parseColor(c.FIELD_RAW_TEXT_COLOR));
        txt.node.style.userSelect = 'none';

        const rawBox: FieldRawBoxData = {
            box: rect,
            txt
        }

        const textBBox = txt.bbox();
        const offsetY = (height - textBBox.height) / 2;

        // move relative to startX (after label)
        rect.move(startX, 0);
        txt.move(startX + c.INPUT_BOX_PADDING, offsetY);
        eventer.addElement(rect, "k_inputbox", {
            field,      // the field object that has .getValue() and .setValue(v)
            text: txt,       // the svg.js Text element you drew
            renderer: this,   // the renderer instance, must have .measureRawField and .constants
            startX   // x-offset where the box should start (after label)
        }).tagElement(rect, [(this.constructor as typeof Renderer).ELEMENT_TAG, `node_${this.node!.id}`])

        return { rect, txt, rawBox };
    }

    /**
     * Draws the label of a field.
     * @param fieldGroup - The SVG group element for the field.
     * @param field - The field to draw the label for.
     * @param startX - The starting X position for the label.
     * @returns The width used by the label including spacing.
     */
    drawFieldLabel(fieldGroup: G, field: AnyField, startX: number = 0): number {
        const c = this.constants;
        const label = field.getLabel?.();
        if (!label) return 0;

        const txt = fieldGroup.text(label)
            .font({
                family: c.FONT_FAMILY,
                size: c.FONT_SIZE,
                anchor: 'start'
            })
            .fill(parseColor(c.FONT_COLOR));
        txt.node.style.userSelect = 'none';
        const bbox = txt.bbox();
        const offsetY = (Math.max(c.FIELD_RAW_BASE_HEIGHT, bbox.height) - bbox.height) / 2;

        // move label relative to startX
        txt.move(startX, offsetY);

        // return width used for next element
        return bbox.width + c.LABEL_SPACING;
    }
    /**
     * Draws the X button on the node's top bar.
     * @returns Void.
     */
    drawNodeXButton() {
        const node = this.node;
        const state = this._nodeDraw;
        if (!node || !state || !state.group) return;

        const c = this.constants;

        const measurements = this.measureNodeDimensions();
        const width = measurements?.width ?? c.NODE_BASE_WIDTH;

        const btnSize = c.TOPBAR_HEIGHT * 0.6;
        const padding = (c.TOPBAR_HEIGHT - btnSize) / 2;

        // Button group
        const xGroup = state.group.group().attr({ class: 'node-x-clse' });
        eventer.addElement(xGroup, 'k_closenode', {
            workspace: this.getWs(),
            node
        }).tagElement(xGroup, [(this.constructor as typeof Renderer).ELEMENT_TAG, `node_${node.id}`]);
        // Background
        xGroup.rect(btnSize, btnSize)
            .fill('#ffffff00')
            .radius(2)
            .move(width - btnSize - padding, padding);

        // X mark
        const txt = xGroup.text('×')
            .font({
                family: c.FONT_FAMILY,
                size: btnSize * 0.8,
                weight: 'bold',
                anchor: 'middle'
            })
            .fill('#fff')
            .attr({
                'text-anchor': 'middle',        // horizontal centering
                'dominant-baseline': 'middle'   // vertical centering
            });
        txt.node.style.userSelect = 'none';
        // Apply transform to center it inside the button
        txt.transform({
            translateX: width - btnSize / 2 - padding,
            translateY: padding + btnSize / 2
        });

        state.xButton = xGroup;
    }
    /**
     * Draws a connector on the specified side of the node.
     * @param nodeGroup - The SVG group element for the node.
     * @param nodeBg - The background SVG path of the node.
     * @param y - The Y position for the connector.
     * @param side - The side to draw the connector on ('left' or 'right').
     * @param color - The color of the connector.
     * @returns The SVG path of the connector or null if not drawn.
     */
    drawConnector(nodeGroup: G, nodeBg: SvgPath, y: number, side: 'left' | 'right', color: string): SvgPath | void | undefined | null {
        const c = this.constants;
        if (!nodeGroup || !nodeBg) return null;

        const bbox = nodeBg.bbox(); // get dimensions of the background
        const group = nodeGroup;     // attach connector to top-level node group
        const x = side === 'left' ? 0 : bbox.width;

        if (c.CONNECTOR_TRIANGLE) {
            // small triangle connector
            const triSize = c.CONNECTOR_TRI_SIZE;
            let path = Path.roundedTri(triSize, triSize, 1);

            // flip triangle horizontally for left side
            if (side === 'left') path = Path.rotatePath(path, 180, triSize / 2, triSize / 2);

            const tri = group.path(path)
                .fill(parseColor(color as Hex))
                .stroke({ color: parseColor('#00000000'), width: 0 });
            tri.attr({
                class: (this.constructor as typeof Renderer).CONNECTOR_TAG
            })
            const offsetX = side === 'left' ? -triSize : 0;
            tri.transform({ translateX: x + offsetX, translateY: y - triSize / 2 });

            return tri;
        } else {
            // circle connector
            const radius = c.CONNECTOR_RADIUS;
            const circlePath = Path.circle(radius);

            const circ = group.path(circlePath)
                .fill(parseColor(color as Hex))
                .stroke({ color: parseColor('#00000000'), width: 0 })
                .move(x - radius, y - radius); // center circle at (x, y)
            circ.attr({
                class: (this.constructor as typeof Renderer).CONNECTOR_TAG
            })
            return circ;
        }
    }

    /**
     * Draws the label on the node's top bar.
     * @param nodeGroup - The SVG group element for the node.
     * @returns Void.
     */
    drawNodeLabel(nodeGroup: G) {
        const node = this.node;
        const c = this.constants;
        if (!node) return;

        if (node.labelText) {
            const txt = nodeGroup.text(node.labelText)
                .font({
                    family: c.FONT_FAMILY,
                    size: c.FONT_SIZE,
                    anchor: 'start',
                    weight: c.TOPBAR_LABEL_BOLDED ? '600' : 'normal'
                })
                .fill(parseColor(c.FONT_COLOR));

            txt.node.style.userSelect = 'none';

            const bbox = txt.bbox();
            const offsetY = (c.TOPBAR_HEIGHT - bbox.height) / 2;

            txt.move(c.TOPBAR_LABEL_MARGIN_X, offsetY + c.TOPBAR_LABEL_MARGIN_Y);
        }
    }

    /**
     * Draws the current node.
     * @returns Void.
     */
    drawNode() {
        if (!this.node) return;

        const node = this.node;
        const state = this.drawState(this.createNodeGroup(node), node.id);
        this._nodeDraw = state;

        const measurements = this.measureNodeDimensions();

        this.drawNodeBase(state, measurements as NodeMeasurements);
        this.drawNodeTopbar(state, this.getNodeColors(), measurements as NodeMeasurements);
        this.drawNodeXButton();
        this.drawNodeLabel(state.group!);
        this.makeNodeDraggable(state.group!, state.topbar!, node);

        this.createFieldGroup(state);
        this.drawAllFieldsForNode(measurements as NodeMeasurements);

        this.drawPreviousNextConnections(state, node, state.group!, measurements as NodeMeasurements);
    }
    /**
     * Creates the SVG group for the given node.
     * @param node - The node to create the group for.
     * @returns The created SVG group element.
     */
    createNodeGroup(node: NodeSvg): G {
        const nodeGroup = this.svg.group().attr({
            'data-node-id': escapeAttr(node.id),
            'class': (this.constructor as typeof Renderer).NODE_G_TAG
        });
        const screenPos = this._ws.workspaceToScreen(node.relativeCoords.x, node.relativeCoords.y);
        nodeGroup.attr({ transform: `translate(${screenPos.x}, ${screenPos.y})` });
        return nodeGroup;
    }
    /**
     * Draws the base and shadow of the node.
     * @param state - The current drawing state.
     * @param measurements - The measurements of the node.
     */
    drawNodeBase(state: DrawState, measurements: NodeMeasurements | null) {
        const c = this.constants;
        const width = measurements?.width ?? c.NODE_BASE_WIDTH;
        const height = measurements?.height ?? c.NODE_BASE_HEIGHT;
        const radius = c.CORNER_RADIUS;
        state.bg = state.group!.path(Path.roundedRect(width, height, radius))
            .fill(parseColor(c.NODE_BG_COLOR))
            .stroke({ color: parseColor(c.NODE_OUTLINE_COLOR), width: 2 } as StrokeData);
        state.shadow = state.group!.path(Path.roundedRect(width, height, radius))
            .fill('rgba(0,0,0,0.2)')
            .move(Number(state.bg.x()) + 5, Number(state.bg.y()) + 5)
            .back(); // make sure it's behind the node
    }
    /**
     * Draw the node's topbar
     * @param state - The draw state
     * @param colors - The colors of the node.
     * @param measurements - The measurement data of the node.
     */
    drawNodeTopbar(state: DrawState, colors: ColorStyle, measurements: NodeMeasurements | null) {
        const c = this.constants;
        const width = measurements?.width ?? c.NODE_BASE_WIDTH;
        const radius = c.CORNER_RADIUS;
        state.topbar = state.group!.path(Path.roundedRect(width, c.TOPBAR_HEIGHT, radius))
            .fill(parseColor(colors.primary))
            .stroke({ color: parseColor(colors.tertiary), width: 2 } as StrokeData);
    }
    /**
     * Make a node draggable.
     * @param nodeGroup - The node group to make draggable
     * @param dragHandle - The drag handle
     * @param node - The nodesvg
     */
    makeNodeDraggable(nodeGroup: G, dragHandle: SvgPath, node: NodeSvg) {
        eventer.addElement(nodeGroup, 'k_draggable', {
            dragel: dragHandle,
            group: nodeGroup,
            node,
            type: 2
        }).tagElement(nodeGroup, [(this.constructor as typeof Renderer).ELEMENT_TAG, `node_${node.id}`]);
    }
    /** Create the field group for the node */
    createFieldGroup(state: DrawState) {
        const c = this.constants;
        const fieldsGroup = state.group!.group();
        fieldsGroup.attr({ transform: `translate(0, ${c.TOPBAR_HEIGHT + c.FIELD_SPACEY})` });
        state.fieldCol = fieldsGroup;
    }
    /**
     * Draw a field on a node.
     * @param field - The field to draw
     * @param measurements - The node's measurements
     * @param idx - Index of the field in the fieldColumn list
     * @param y - the y position of the field
     * @returns 
     */
    drawFieldForNode(field: AnyField, measurements: NodeMeasurements, idx: number, y: number) {
        const node = this.node;
        const state = this.state;
        const c = this.constants;
        if (!node || !state || !state.fieldCol) return;
        const fieldsGroup = state.fieldCol;
        const nodeGroup = state.group as G;
        const fm = measurements?.fields[idx];
        if (!fm) return;

        // default left alignment
        let alignX = c.FIELD_MARGIN_X;

        const fieldGroup = fieldsGroup.group();
        fieldGroup.attr({ transform: `translate(${alignX}, ${y})` });
        field.svgGroup = fieldGroup;
        state.fieldPosY = y;

        // draw label first, get its used width
        const xUsed = this.drawFieldLabel(fieldGroup, field);
        if (field.isCustomEditor()) {
            // field fully owns drawing
            field.drawMyself({
                measuredWidth: fm.width,
                measuredHeight: fm.height,
                xUsed,
                fieldGroup,
                nodeGroup,
                svg: this.svg,
                background: state!.bg as unknown as Rect
            });
        } else {
            let rawData, cBubbleData = undefined;
            // if raw, draw right after label
            if (field.hasRaw()) {
                const { rawBox } = this.drawFieldRaw(fieldGroup, field, xUsed);
                rawData = rawBox;
            }
            if (field.hasConnectable() && (field as ConnectableField)!.connection) {
                const halfHeight = (fm.height + (field.hasRaw() ? 0 : c.FIELD_MARGIN_Y)) / 2;
                const absY = c.TOPBAR_HEIGHT + c.FIELD_SPACEY + y + halfHeight;


                const c3 = this.drawConnector(
                    nodeGroup,
                    state.bg as SvgPath,
                    absY,
                    'right',
                    parseColor(c.FIELD_CONN_COLOR)
                );
                if (c3) {
                    const c = {
                        from: (field as ConnectableField)!.connection as Connection,
                        to: ((field as ConnectableField)!.connection.getTo() as NodeSvg)?.previousConnection as Connection,
                        fromCircle: c3 as SvgPath,
                        originCircle: c3 as SvgPath,
                        originConn: (field as ConnectableField)!.connection as Connection
                    };
                    cBubbleData = {
                        connector: c3,
                        connState: c
                    }
                    this.setConnect(c);
                    eventer.addElement(c3, 'k_connectbubble', {
                        connection: (field as ConnectableField)!.connection as Connection,
                        field
                    }).tagElement(c3, [(this.constructor as typeof Renderer).ELEMENT_TAG, `node_${node.id}`]);
                }
            }
            field.onDraw(rawData, cBubbleData);
        }
    }
    /**
     * Draw all fields on a node
     * @param nodeMeasurements - The node's measurements
     * @returns The final Y position.
     */
    drawAllFieldsForNode(nodeMeasurements: NodeMeasurements | null = null) {
        const node = this.node;
        let y = 0;
        const state = this.state;
        const c = this.constants;
        if (!node || !state || !state.fieldCol) return;
        const fieldsGroup = state.fieldCol;
        const nodeGroup = state.group as G;

        const measurements = nodeMeasurements ?? this.measureNodeDimensions();

        node.allFields().forEach((field, idx) => {
            this.drawFieldForNode(field, measurements as NodeMeasurements, idx, y);
            const fm = measurements?.fields[idx];
            if (!fm) return;
            y += fm.height + c.FIELD_MARGIN_Y;
        });

        state.fieldPosY = y;
        return y;
    }
    /**
     * Draw the previous and next connections of a node.
     * @param state - The draw-state
     * @param node - The node-svg
     * @param nodeGroup - the node's group
     * @param measurements - the node's measurements
     * @returns Void
     */
    drawPreviousNextConnections(state: DrawState, node: NodeSvg, nodeGroup: G, measurements: { width: number, height: number } | null = null) {
        if (!state || !node) return;
        if (!state.bg) return;
        const c = this.constants;
        const colors: ColorStyle = this.getNodeColors();
        /**
         * Draw connectors.
         */
        const bbox = state.bg?.bbox();
        const cY = (bbox?.height ?? measurements?.height) - c.FOOTER_HEIGHT;

        // Previous connection (left)
        if (node.previousConnection) {
            const c1 = this.drawConnector(nodeGroup, state.bg, cY, 'left', parseColor(colors.primary) as string);
            if (c1) {
                const c = ({
                    from: node.previousConnection,
                    to: this.resolveConnectable(node.previousConnection.getFrom(), node.previousConnection) as Connection,
                    fromCircle: c1 as SvgPath,
                    originConn: node.previousConnection,
                    originCircle: c1
                });
                this.setConnect(c);
                eventer.addElement(c1, 'k_connectbubble', {
                    connection: node.previousConnection,
                    node
                }).tagElement(c1, [(this.constructor as typeof Renderer).ELEMENT_TAG, `node_${node.id}`]);
                // fill any waiting connectors from other nodes
                this._fillOtherNodeConnectorCircle(node.previousConnection, c1 as SvgPath, true);
            }
        }

        // Next connection (right)
        if (node.nextConnection) {
            const c2 = this.drawConnector(nodeGroup, state.bg, cY, 'right', parseColor(colors.primary) as string);
            if (c2) {
                const c = ({
                    from: node.nextConnection,
                    to: this.resolveConnectable(node.nextConnection.getTo(), node.nextConnection) as Connection,
                    fromCircle: c2 as SvgPath,
                    originConn: node.nextConnection,
                    originCircle: c2
                });
                this.setConnect(c);
                eventer.addElement(c2, 'k_connectbubble', {
                    connection: node.nextConnection,
                    node
                }).tagElement(c2, [(this.constructor as typeof Renderer).ELEMENT_TAG, `node_${node.id}`]);
                // fill any waiting connectors from other nodes
                this._fillOtherNodeConnectorCircle(node.nextConnection, c2 as SvgPath, false);
            }
        }
    }
    // REFRESHING TRANSFORMS AND COMMENTS -
    /**
     * Refreshes the comment transforms.
     * @returns Void.
     */
    refreshComments() {
        return this._commentDrawer?.refreshCommentTransforms?.();
    }
    /**
     * Clears all comments from the workspace.
     * @returns Void.
     */
    clearComments() {
        return this._commentDrawer?.clearAllComments?.();
    }
    /**
     * Draws all comments in the workspace.
     * @returns Void.
     */
    drawComments() {
        return this._commentDrawer?.drawAllComments?.();
    }
    /**
     * Gets the current zoom level of the workspace.
     * @returns The zoom level.
     */
    getZoom() {
        return this._ws.getZoom() ?? 1;
    }
    /**
     * Applies the current zoom level to the specified node group.
     * @param nodeG - The SVG group element of the node.
     * @param node - The node to apply zoom to.
     */
    applyZoomToNode(nodeG: G, node: NodeSvg) {
        const zoom = this.getZoom();
        const { x, y } = this._ws.workspaceToScreen(node.relativeCoords.x, node.relativeCoords.y);
        nodeG.attr({ transform: `translate(${x}, ${y}) scale(${zoom})` });
    }
    /**
     * Refreshes the transforms of all nodes in the workspace.
     * @returns Void.
     */
    refreshNodeTransforms() {
        const nodeGroups = this.svg.find(`.${(this.constructor as typeof Renderer).NODE_G_TAG}`);
        const zoom = this.getZoom();

        for (let nodeG of nodeGroups) {
            const node = this._ws.getNode(unescapeAttr(nodeG.attr('data-node-id')));
            if (!node) continue;
            const { x, y } = this._ws.workspaceToScreen(node.relativeCoords.x, node.relativeCoords.y);
            nodeG.attr({ transform: `translate(${x}, ${y}) scale(${zoom})` });
        }

        this.refreshConnectionLines();
        this.refreshComments();
    }

    /**
     * Refreshes all connection lines in the workspace.
     * @returns Void.
     */
    refreshConnectionLines() {
        this.clearLines();
        this.drawLinesForAllNodes();
    }
    /**
     * Gets the colors for the current node.
     * @returns The color style of the node.
     */
    getNodeColors(): ColorStyle {
        const node: NodeSvg = this.node as NodeSvg;
        const colors: ColorStyle = node.colors ?? {
            primary: '#000',
            secondary: '#000',
            tertirary: '#000',
            category: ''
        };
        return colors;
    }
    // CONNECTOR BUBBLE HANDLING + CONNECTION RESOLVING -
    /**
     * Fill every node's connector bubble data with the corresponding bubble its connected to on a sibling node.
     */
    fillAllNodeConnectorBubbles() {
        for (const state of this._drawStates) {
            for (const connPair of state.pendingConnections) {
                const { originConn } = connPair;
                if (!originConn) continue;

                // Only try to fill missing sides with real circles from other pending connections
                if (!connPair.fromCircle) {
                    const match = this._drawStates
                        .flatMap(s => s.pendingConnections)
                        .find(p => p.originConn === connPair.from && p.originCircle);
                    if (match) connPair.fromCircle = match.originCircle;
                }

                if (!connPair.toCircle) {
                    const match = this._drawStates
                        .flatMap(s => s.pendingConnections)
                        .find(p => p.originConn === connPair.to && p.originCircle);
                    if (match) connPair.toCircle = match.originCircle;
                }
            }
        }
    }
    /**
     * Resolves the connectable to the appropriate connection based on the originating connection.
     * @param connectable - The connectable entity (NodeSvg or Field).
     * @param fromConn - The originating connection.
     * @returns 
     */
    resolveConnectable(connectable: Connectable, fromConn: Connection): Connection | null | undefined {
        if (!connectable || !fromConn) return undefined;

        // If the connection is an input (previous), return the connectable's output (next) connection
        if (fromConn.isPrevious) {

            if (connectable instanceof NodeSvg) return connectable.nextConnection;
            // @ts-ignore
            if (connectable instanceof Field) return connectable.connection;
        }

        // If the connection is an output (next), return the connectable's input (previous) connection
        if (!fromConn.isPrevious) {
            if (connectable instanceof NodeSvg) return connectable.previousConnection;
            // @ts-ignore
            if (connectable instanceof Field) return connectable.connection;
        }
    }
    /**
     * Fills in the connector circle for other nodes based on the given connection.
     * @param conn - The connection to match.
     * @param circle - The SVG path of the connector circle.
     * @param isPrevious - Whether the connection is a previous connection.
     */
    _fillOtherNodeConnectorCircle(conn: Connection, circle: SvgPath, isPrevious: boolean) {
        for (const state of this._drawStates) {
            for (const connPair of state.pendingConnections) {
                // Only fill if the connection actually matches
                if (isPrevious) {
                    // fill toCircle if this connPair expects 'conn' as its 'to'
                    if (connPair.to === conn && !connPair.toCircle) {
                        connPair.toCircle = circle;
                    }
                } else {
                    // fill fromCircle if this connPair expects 'conn' as its 'from'
                    if (connPair.from === conn && !connPair.fromCircle) {
                        connPair.fromCircle = circle;
                    }
                }
            }
        }
    }
    // LINE DRAWING -
    /**
     * Draw the connection lines between node's connector bubbles.
     */
    drawLinesForAllNodes() {
        const c = this.constants;
        const wsSvg = this._ws.svg;

        this.fillAllNodeConnectorBubbles();
        const drawnCircles = new Set<SvgPath>();

        for (const state of this._drawStates) {
            for (const connPair of state.pendingConnections) {
                const { fromCircle, toCircle } = connPair;
                if (connPair.from !== connPair.originConn) continue;
                if (!fromCircle || !toCircle) continue;

                if (drawnCircles.has(fromCircle) || drawnCircles.has(toCircle)) continue;

                drawnCircles.add(fromCircle);
                drawnCircles.add(toCircle);

                const fromEl = fromCircle.node as SVGPathElement;
                const toEl = toCircle.node as SVGPathElement;

                const fromBBox = fromEl.getBBox();
                const toBBox = toEl.getBBox();

                const fromCTM = fromEl.getScreenCTM()!;
                const toCTM = toEl.getScreenCTM()!;

                const startX = fromBBox.x + fromBBox.width / 2;
                const startY = fromBBox.y + fromBBox.height / 2;
                const endX = toBBox.x + toBBox.width / 2;
                const endY = toBBox.y + toBBox.height / 2;

                const absStartX = startX * fromCTM.a + startY * fromCTM.c + fromCTM.e;
                const absStartY = startX * fromCTM.b + startY * fromCTM.d + fromCTM.f;
                const absEndX = endX * toCTM.a + endY * toCTM.c + toCTM.e;
                const absEndY = endX * toCTM.b + endY * toCTM.d + toCTM.f;

                // STRAIGHT LINE ONLY
                const pathStr = `M ${absStartX} ${absStartY} L ${absEndX} ${absEndY}`;

                const zoom = this._ws.getZoom();
                const strokeWidth = c.CONNECTOR_LINE_WIDTH * zoom;
                const line = wsSvg.path(pathStr)
                    .stroke({ color: parseColor(fromCircle.fill() as Color), width: strokeWidth })
                    .fill('none')
                    .attr({ class: (this.constructor as typeof Renderer).CONN_LINE_TAG });

                eventer.addElement(line, 'k_connline', {
                    fromConn: connPair.from,
                    toConn: connPair.to,
                    renderer: this
                }).tagElement(line, [(this.constructor as typeof Renderer).ELEMENT_TAG, (this.constructor as typeof Renderer).LINE_X_MARK_TAG]);
            }
        }
    }

    /**
     * Clear connection lines and their X marks.
     */
    clearLines() {
        for (let line of this.getWs().svg.find(`.${(this.constructor as typeof Renderer).CONN_LINE_TAG}`)) {
            line.remove();
        }
        for (let mark of this.getWs().svg.find(`.${(this.constructor as typeof Renderer).LINE_X_MARK_TAG}`)) {
            mark.remove();
        }
    }
    /**
     * Clear the entire screen.
     */
    clearScreen() {
        // Destroy elements that were tagged (eventer system)
        eventer.destroyByTag((this.constructor as typeof Renderer).ELEMENT_TAG);

        // Remove all SVG children **except the background pattern rect**
        this._ws.svg.children().forEach((el) => {
            const isBackground = el.hasClass((this.constructor as typeof Renderer).BACKGROUND_PATTERN);
            const isDefs = el.node.tagName == 'defs';
            const isBgRect = el.classes().includes(WorkspaceSvg.BACKGROUND_CLASS);
            if (!isBackground && !isDefs && !isBgRect) el.remove();
        });

        // Reset internal draw state
        this._drawStates = [];
    }
    /**
     * Remove pending connections for a specific connection
     * @param conn - The connection
     */
    undoPendingConnsFor(conn: ConnectorToFrom) {
        for (let state of this._drawStates) {
            for (let conn0 of state.pendingConnections) {
                if (conn0.toCircle == conn.originCircle) {
                    delete conn0.toCircle;
                }
                if (conn0.fromCircle == conn.originCircle) {
                    delete conn0.fromCircle;
                }
            }
        }
    }
    /**
     * Called whenever a node must be visually rendered or rerendered.
     * Implementations must be idempotent.
     * @param node - The node to render/rerender
     * @returns SVG group of the node.
     */
    rerenderNode(node: NodeSvg) {
        // wipe old drawstate + events for this node
        const idx = this._drawStates.findIndex(s => s.id === node.id);
        if (idx !== -1) {
            const state = this._drawStates[idx];
            for (let pendingConn of state!.pendingConnections) {
                this.undoPendingConnsFor(pendingConn);
            }
            state!.group?.remove();
            eventer.destroyByTag(`node_${node.id}`);
            this._drawStates.splice(idx, 1);
        }

        // rebuild node
        this.startNode(node);
        this.drawNode();
        this.representer.build(this.node as NodeSvg, this, this.state as DrawState);
        this.storeState();

        // refresh *all* lines once the node is back in place
        this.refreshNodeTransforms();
        return (node.svg as RepresenterNode).getRaw();
    }

}

export default Renderer;
