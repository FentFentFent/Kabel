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
    topbar?: SvgPath | null;
    bg?: SvgPath | null;
    group?: G | null;
    fieldCol?: G | null;
    fieldPosY?: number | null; // starts under topbar, goes down by field height each time one is drawn. This determines position
    xButton?: G;
    pendingConnections: ConnectorToFrom[]
}

function drawState(nodeGroup: G, id: string): DrawState {
    return {
        id,
        group: nodeGroup,
        fieldPosY: 0,
        pendingConnections: []
    }
}

class Renderer {
    _constants: RendererConstants;
    _currentNode: NodeSvg | null;
    _nodeGroup: G | null;
    _nodeDraw: DrawState | null;
    _ws: WorkspaceSvg;
    _drawStates: DrawState[];
    _commentDrawer!: CommentRenderer;
    static get NODE_G_TAG() {
        return 'AtlasNodeSVG';
    }
    static get ELEMENT_TAG() {
        return 'AtlasElement'
    }
    static get CONN_LINE_TAG() {
        return 'AtlasConnectionLine';
    }
    static get CONNECTOR_TAG() {
        return 'AtlasConnectionBubble';
    }
    static get LINE_X_MARK_TAG() {
        return 'AtlasLineXMark';
    }
    static get NAME() {
        return 'atlas'; // default is called atlas.
    }

    constructor(workspace: WorkspaceSvg, overrides: Partial<RendererConstants> = {}) {
        this._ws = workspace;
        this._currentNode = null;
        this._constants = new RendererConstants(overrides);
        this._nodeGroup = null;
        this._nodeDraw = null;
        this._drawStates = [];
        this.initCommentRenderer()

    }
    initCommentRenderer() {
        this._commentDrawer = new CommentRenderer(this.getWs());
    }
    enqueueSetConnect(c: ConnectorToFrom) {
        this.state?.pendingConnections?.push?.(c);
    }
    setConstants(c: Partial<RendererConstants> = {}) {
        return Object.assign(this._constants, c);
    }
    get constants(): RendererConstants {
        if (!this.node) return this._constants;

        const { primary, secondary, tertiary, ...restColors } = this.node.colors;

        return {
            ...this._constants,
            ...restColors
        };
    }

    set constants(c: Partial<RendererConstants>) {
        this.setConstants(c);
    }
    get node() {
        return this._currentNode;
    }
    get svg(): Svg {
        return this.getWs().svg; // Svg.js instance
    }
    get state(): null | undefined | DrawState {
        return this._nodeDraw;
    }
    getWs() {
        return this._ws;
    }
    getNodeBaseMeasurements() {
        const c = this.constants;
        return {
            width: c.NODE_BASE_WIDTH,
            height: c.NODE_BASE_HEIGHT
        }
    }
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


    measureRawField(text: string = "") {
        const c = this.constants;
        const textW = this.measureTextWidth(text);
        const width = Math.max(c.FIELD_RAW_BASE_WIDTH, textW + c.INPUT_BOX_PADDING * 2);
        const height = c.FIELD_RAW_BASE_HEIGHT;
        return { width, height };
    }
    private measureLabel(field: AnyField): { width: number, height: number } {
        const c = this.constants;
        const label = field.getLabel?.();
        if (!label) return { width: 0, height: 0 };

        const width = this.measureTextWidth(label);
        const height = this.measureTextHeight(label);

        return { width, height };
    }

    private measureRaw(field: AnyField): { width: number, height: number } {
        if (!field.hasRaw()) return { width: 0, height: 0 };

        const c = this.constants;
        const raw = this.measureRawField(field.getValue?.() ?? "");
        return {
            width: raw.width,
            height: raw.height
        };
    }

    private measureCustom(field: AnyField): { width: number, height: number } {
        if (!field.isCustomEditor()) return { width: 0, height: 0 };

        const c = this.constants;
        const m = field.measureMyself();
        if (!m) return { width: 0, height: 0 };

        let width = m.width as number;
        let height = m.height as number;

        return { width, height };
    }
    getFieldMeasurementPadding() {
        return { width: this.constants.FIELD_SPACEX, height: 0 }
    }
    measureField(field: AnyField) {

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

    measureNodeDimensions() {
        if (!this.node) return;

        const c = this.constants;
        const node: NodeSvg = this.node;
        const fieldMeasurements: { width: number; height: number }[] = [];

        const BASE = this.getNodeBaseMeasurements();
        let totalWidth = BASE.width;
        let totalHeight = BASE.height; // start at base
        if (node.labelText) {
            const labelW = this.measureTextWidth(node.labelText, c.FONT_SIZE, c.FONT_FAMILY);
            totalWidth = Math.max(
                totalWidth,
                labelW + c.TOPBAR_LABEL_MARGIN_X * 2  // add left/right margin
            );
        }

        let y = c.TOPBAR_HEIGHT + c.FIELD_SPACEY; // current y position for fields

        for (let field of node.allFields()) {
            let width = 0, height = 0;

            const fldM = this.measureField(field);
            width = fldM.width;
            height = fldM.height;
            // This adds to a list of all the like widths and heights for a field
            fieldMeasurements.push(fldM);
            totalWidth = Math.max(totalWidth, width + c.FIELD_MARGIN_X * 2);

            // Check if this field goes beyond current totalHeight
            const bottomOfField = y + height;
            if (bottomOfField + c.FIELD_MARGIN_Y > totalHeight) {
                totalHeight = bottomOfField + c.FIELD_MARGIN_Y; // grow node only if needed
            }

            y += height + c.FIELD_MARGIN_Y;
        }
        totalHeight += c.FOOTER_HEIGHT
        return {
            width: totalWidth,
            height: totalHeight,
            fields: fieldMeasurements
        };
    }
    renderNode(nodeIdOrNode: NodeSvg | string) {
        this.startNode(nodeIdOrNode);
        this.drawNode();
        this.storeState();
    }
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
    storeState() {
        this._drawStates.push(this.state as DrawState);
    }
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

    drawNodeXButton() {
        const node = this.node;
        const state = this._nodeDraw;
        if (!node || !state || !state.topbar || !state.group) return;

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
    private _fillOtherNodeConnectorCircle(conn: Connection, circle: SvgPath, isPrevious: boolean) {
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

    refreshComments() {
        return this._commentDrawer?.refreshCommentTransforms?.();
    }
    clearComments() {
        return this._commentDrawer?.clearAllComments?.();
    }
    drawComments() {
        return this._commentDrawer?.drawAllComments?.();
    }
    refreshNodeTransforms() {
        const nodeGroups: List<G> = this.svg.find(`.${(this.constructor as typeof Renderer).NODE_G_TAG}`) as List<G>;
        for (let nodeG of nodeGroups) {
            const node: NodeSvg | undefined = this.getWs().getNode(unescapeAttr(nodeG.attr('data-node-id')));
            if (!node) continue;
            const screenPos = this._ws.workspaceToScreen(
                node.relativeCoords.x,
                node.relativeCoords.y
            );
            nodeG.attr({ transform: `translate(${screenPos.x}, ${screenPos.y})` });
        }
        this.refreshConnectionLines();
        this.refreshComments();
    }
    refreshConnectionLines() {
        this.clearLines();
        this.drawLinesForAllNodes();
    }
    createNodeDrawState(nodeGroup: G, id: string): DrawState {
        return drawState(nodeGroup, id); // wraps this method so you can define your own drawstates by overriding this method
    }
    drawNode() {
        if (!this.node) return;

        const node: NodeSvg = this.node;
        const c = this.constants;
        const colors: ColorStyle = node.colors ?? {
            primary: '#000',
            secondary: '#000',
            tertirary: '#000',
            category: ''
        };

        // Main node group
        const nodeGroup = this.svg.group().attr({ 'data-node-id': escapeAttr(node.id), 'class': (this.constructor as typeof Renderer).NODE_G_TAG });
        // compute screen position from workspace-space relativeCoords
        const screenPos = this._ws.workspaceToScreen(
            node.relativeCoords.x,
            node.relativeCoords.y
        );

        // apply it to the top-level node group
        nodeGroup.attr({ transform: `translate(${screenPos.x}, ${screenPos.y})` });

        const state = this.createNodeDrawState(nodeGroup, node.id);
        this._nodeDraw = state;

        // Measure node
        const measurements = this.measureNodeDimensions();
        const width = measurements?.width ?? c.NODE_BASE_WIDTH;
        const height = measurements?.height ?? c.NODE_BASE_HEIGHT;

        // Base rectangle
        const radius = c.CORNER_RADIUS;
        state.bg = nodeGroup.path(Path.roundedRect(width, height, radius))
            .fill(parseColor(c.NODE_BG_COLOR))
            .stroke({ color: parseColor(c.NODE_OUTLINE_COLOR), width: 2 } as StrokeData);

        // Topbar
        state.topbar = nodeGroup.path(Path.roundedRect(width, c.TOPBAR_HEIGHT, radius))
            .fill(parseColor(colors.primary))
            .stroke({ color: parseColor(colors.tertiary), width: 2 } as StrokeData);

        // add the X button
        this.drawNodeXButton();
        this.drawNodeLabel(nodeGroup);
        eventer.addElement(nodeGroup, 'k_draggable', {
            dragel: state.topbar, // the handle
            node: node,     // NodeSvg instance
            type: 2
        }).tagElement(nodeGroup, [(this.constructor as typeof Renderer).ELEMENT_TAG, `node_${node.id}`]);
        // Outer fields group positioned under topbar using transform
        const fieldsGroup = nodeGroup.group();
        fieldsGroup.attr({ transform: `translate(0, ${c.TOPBAR_HEIGHT + c.FIELD_SPACEY})` });
        state.fieldCol = fieldsGroup;


        let y = 0;
        node.allFields().forEach((field, idx) => {
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
                // fallback: renderer draws raw/connector as before
                let rawData, cBubbleData = undefined;
                // if raw, draw right after label
                if (field.hasRaw()) {
                    const { rawBox } = this.drawFieldRaw(fieldGroup, field, xUsed);
                    rawData = rawBox;
                }
                // @ts-ignore
                if (field.hasConnectable() && field!.connection) {
                    // @ts-ignore
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
                            // @ts-ignore
                            from: field!.connection as Connection,
                            // @ts-ignore (typescript intellisense mad that field.connection isnt on some field types, so we ignore it.)
                            to: field!.connection.getTo()?.previousConnection as Connection,
                            fromCircle: c3 as SvgPath,
                            originCircle: c3 as SvgPath,
                            // @ts-ignore
                            originConn: field!.connection as Connection
                        };
                        cBubbleData = {
                            connector: c3,
                            connState: c
                        }
                        this.enqueueSetConnect(c);
                        eventer.addElement(c3, 'k_connectbubble', {
                            // @ts-ignore
                            connection: field!.connection,
                            field
                        }).tagElement(c3, [(this.constructor as typeof Renderer).ELEMENT_TAG, `node_${node.id}`]);
                    }
                }
                field.onDraw(rawData, cBubbleData);
            }
            y += fm.height + c.FIELD_MARGIN_Y;
        });

        state.fieldPosY = y;

        /**
         * Draw connectors.
         */
        const bbox = state.bg?.bbox();
        const cY = (bbox?.height ?? height) - c.FOOTER_HEIGHT;

        // Previous connection (left)
        if (node.previousConnection) {
            const c1 = this.drawConnector(nodeGroup, state.bg, cY, 'left', colors.primary as string);
            if (c1) {
                const c = ({
                    from: node.previousConnection,
                    to: this.resolveConnectable(node.previousConnection.getFrom(), node.previousConnection) as Connection,
                    fromCircle: c1 as SvgPath,
                    originConn: node.previousConnection,
                    originCircle: c1
                });
                this.enqueueSetConnect(c);
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
            const c2 = this.drawConnector(nodeGroup, state.bg, cY, 'right', colors.primary as string);
            if (c2) {
                const c = ({
                    from: node.nextConnection,
                    to: this.resolveConnectable(node.nextConnection.getTo(), node.nextConnection) as Connection,
                    fromCircle: c2 as SvgPath,
                    originConn: node.nextConnection,
                    originCircle: c2
                });
                this.enqueueSetConnect(c);
                eventer.addElement(c2, 'k_connectbubble', {
                    connection: node.nextConnection,
                    node
                }).tagElement(c2, [(this.constructor as typeof Renderer).ELEMENT_TAG, `node_${node.id}`]);
                // fill any waiting connectors from other nodes
                this._fillOtherNodeConnectorCircle(node.nextConnection, c2 as SvgPath, false);
            }
        }

        node.svgGroup = nodeGroup;

    }
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



    drawLinesForAllNodes() {
        const c = this.constants;
        const wsSvg = this._ws.svg;

        this.fillAllNodeConnectorBubbles();
        const drawnCircles = new Set<SvgPath>(); // store circles we've already drawn lines from/to

        for (const state of this._drawStates) {
            for (const connPair of state.pendingConnections) {
                const { fromCircle, toCircle } = connPair;
                if (connPair.from !== connPair.originConn) continue;
                if (!fromCircle || !toCircle) continue;

                // skip if either circle was already used
                if (drawnCircles.has(fromCircle) || drawnCircles.has(toCircle)) continue;

                // mark circles as used
                drawnCircles.add(fromCircle);
                drawnCircles.add(toCircle);
                // Get DOM elements
                const fromEl = fromCircle.node as SVGPathElement;
                const toEl = toCircle.node as SVGPathElement;

                // Use getBBox + getScreenCTM for absolute coordinates
                const fromBBox = fromEl.getBBox();
                const toBBox = toEl.getBBox();

                const fromCTM = fromEl.getScreenCTM()!;
                const toCTM = toEl.getScreenCTM()!;

                const startX = fromBBox.x + fromBBox.width / 2;
                const startY = fromBBox.y + fromBBox.height / 2;
                const endX = toBBox.x + toBBox.width / 2;
                const endY = toBBox.y + toBBox.height / 2;

                // Transform to screen coordinates
                const absStartX = startX * fromCTM.a + startY * fromCTM.c + fromCTM.e;
                const absStartY = startX * fromCTM.b + startY * fromCTM.d + fromCTM.f;
                const absEndX = endX * toCTM.a + endY * toCTM.c + toCTM.e;
                const absEndY = endX * toCTM.b + endY * toCTM.d + toCTM.f;

                // Draw the line
                let pathStr: string;
                if (c.CONNECTOR_LINE_CURVED) {
                    const dx = Math.abs(absEndX - absStartX);
                    const cp1x = absStartX + Math.sign(absEndX - absStartX) * Math.max(30, dx * 0.3);
                    const cp2x = absEndX - Math.sign(absEndX - absStartX) * Math.max(30, dx * 0.3);
                    pathStr = `M ${absStartX} ${absStartY} C ${cp1x} ${absStartY}, ${cp2x} ${absEndY}, ${absEndX} ${absEndY}`;
                } else {
                    pathStr = `M ${absStartX} ${absStartY} L ${absEndX} ${absEndY}`;
                }

                const line = wsSvg.path(pathStr)
                    .stroke({ color: parseColor(fromCircle.fill() as Color), width: c.CONNECTOR_LINE_WIDTH })
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




    clearLines() {
        for (let line of this.getWs().svg.find(`.${(this.constructor as typeof Renderer).CONN_LINE_TAG}`)) {
            line.remove();
        }
        for (let mark of this.getWs().svg.find(`.${(this.constructor as typeof Renderer).LINE_X_MARK_TAG}`)) {
            mark.remove();
        }
    }

    clearScreen() {
        eventer.destroyByTag((this.constructor as typeof Renderer).ELEMENT_TAG)
        this._ws.svg.clear();
        this._drawStates = [];
    }
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
        this.storeState();

        // refresh *all* lines once the node is back in place
        this.refreshConnectionLines();

        return node.svgGroup;
    }

}

export default Renderer;
