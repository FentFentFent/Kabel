import RendererConstants from "./constants";
import WorkspaceSvg from '../src/workspace-svg';
import NodeSvg from '../src/nodesvg';
import * as Path from '../util/path';
import { parseColor } from "../util/parse-color";
import { G, Path as SvgPath, Svg, StrokeData, Element, List } from "@svgdotjs/svg.js";
import { Color, ColorStyle, Hex } from "../src/visual-types";
import Field, { AnyField, DummyField } from "../src/field";
import eventer from '../util/eventer';
import Connection, { Connectable } from "../src/connection";
import escapeAttr from '../util/escape-html';
import unescapeAttr from '../util/unescape-html';
export interface ConnectorToFrom {
    to: Connection,
    from: Connection,
    fromCircle?: SvgPath,
    toCircle?: SvgPath
}
export interface DrawState {
    id: string;
    topbar?: SvgPath | null;
    bg?: SvgPath | null;
    group?: G | null;
    fieldCol?: G | null;
    fieldPosY?: number | null; // starts under topbar, goes down by field height each time one is drawn. This determines position
    xButton?: G;
    connectorsAwaitingConnection: ConnectorToFrom[]
}

function drawState(nodeGroup: G, id: string): DrawState {
    return {
        id,
        group: nodeGroup,
        fieldPosY: 0,
        connectorsAwaitingConnection: []
    }
}

class Renderer {
    _constants: RendererConstants;
    _currentNode: NodeSvg | null;
    _nodeGroup: G | null;
    _nodeDraw: DrawState | null;
    _ws: WorkspaceSvg;
    _svgElements: Element[];
    _drawStates: DrawState[];
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
    static get NAME() {
        return 'atlas'; // default is called atlas.
    }

    constructor(workspace: WorkspaceSvg, overrides: Partial<RendererConstants> = {}) {
        this._ws = workspace;
        this._currentNode = null;
        this._constants = new RendererConstants(overrides);
        this._nodeGroup = null;
        this._nodeDraw = null;
        this._svgElements = [];
        this._drawStates = [];
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


    measureRawField(text: string = "") {
        const c = this.constants;
        const textW = this.measureTextWidth(text);
        const width = Math.max(c.FIELD_RAW_BASE_WIDTH, textW + c.INPUT_BOX_PADDING * 2);
        const height = c.FIELD_RAW_BASE_HEIGHT;
        return { width, height };
    }
    measureField(field: AnyField) {
        let width = 0, height = 0;
        const c = this.constants;
        if (field.getLabel()) {
            width += field.getLabel().length * c.FONT_SIZE * 0.6;
            height = Math.max(height, c.FONT_SIZE + 4);
            // Calculate label stuff.
        }

        if (field.hasRaw()) {
            const labelWidth = field.getLabel()
                ? this.measureTextWidth(field.getLabel())
                : 0;

            const raw = this.measureRawField(field.getValue?.() ?? "");

            width = labelWidth + c.LABEL_SPACING + raw.width;
            height = Math.max(height, raw.height, c.FONT_SIZE + 4);
        }


        if (field.isCustomEditor()) {
            // Fields with a custom look handle their own measurings.
            const measurements = field.measureMyself();
            if (measurements) {
                width = Math.max(width, measurements.width as number);
                height = Math.max(height, measurements.height as number);
                if (field.getLabel()) {
                    width += field.getLabel().length * c.FONT_SIZE * 0.6;
                    width += c.LABEL_SPACING;
                    height = Math.max(height, c.FONT_SIZE + 4);
                    // Calculate label stuff.
                }
            }
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
        const value = field.getValue?.() ?? "";

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
        }).tagElement(rect, [(this.constructor as typeof Renderer).ELEMENT_TAG])

        return { rect, txt };
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
        })
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
            for (const connPair of state.connectorsAwaitingConnection) {
                // Check if this connector is referenced in another node's connector
                if (isPrevious && connPair.to === conn && !connPair.toCircle) {
                    connPair.toCircle = circle;
                }
                if (!isPrevious && connPair.from === conn && !connPair.fromCircle) {
                    connPair.fromCircle = circle;
                }
            }
        }
    }
    refreshNodeTransforms() {
        const nodeGroups: List<G> = this.svg.find(`.${(this.constructor as typeof Renderer).NODE_G_TAG}`) as List<G>;
        for (let nodeG of nodeGroups) {
            const node: NodeSvg | undefined = this.getWs().getNode(unescapeAttr(nodeG.attr('data-node-id')));
            console.log(node);
            if (!node) continue;
            const screenPos = this._ws.workspaceToScreen(
                node.relativeCoords.x,
                node.relativeCoords.y
            );
            nodeG.attr({ transform: `translate(${screenPos.x}, ${screenPos.y})` });
        }
        this.refreshConnectionLines();
    }
    refreshConnectionLines() {
        this.clearLines();
        this.drawLinesForAllNodes();
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

        const state = drawState(nodeGroup, node.id);
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
        }).tagElement(nodeGroup, [(this.constructor as typeof Renderer).ELEMENT_TAG]);
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

            state.fieldPosY = y;

            // draw label first, get its used width
            const xUsed = this.drawFieldLabel(fieldGroup, field);

            // if raw, draw right after label
            if (field.hasRaw()) {
                this.drawFieldRaw(fieldGroup, field, xUsed);
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
                state.connectorsAwaitingConnection.push({
                    from: node.previousConnection,
                    to: this.resolveConnectable(node.previousConnection.getFrom(), node.previousConnection) as Connection,
                    fromCircle: c1 as SvgPath
                });

                // fill any waiting connectors from other nodes
                this._fillOtherNodeConnectorCircle(node.previousConnection, c1 as SvgPath, true);
            }
        }

        // Next connection (right)
        if (node.nextConnection) {
            const c2 = this.drawConnector(nodeGroup, state.bg, cY, 'right', colors.primary as string);
            if (c2) {
                state.connectorsAwaitingConnection.push({
                    from: node.nextConnection,
                    to: this.resolveConnectable(node.nextConnection.getTo(), node.nextConnection) as Connection,
                    fromCircle: c2 as SvgPath
                });

                // fill any waiting connectors from other nodes
                this._fillOtherNodeConnectorCircle(node.nextConnection, c2 as SvgPath, false);
            }
        }


    }

    drawLinesForAllNodes() {
        const c = this.constants;
        const wsSvg = this._ws.svg;


        for (const state of (this as any)._drawStates) {
            if (!state.connectorsAwaitingConnection) continue;
            for (const { fromCircle, toCircle } of state.connectorsAwaitingConnection) {
                if (!fromCircle || !toCircle) continue;

                const a = fromCircle.rbox();
                const b = toCircle.rbox();
                const startX = a.cx, startY = a.cy;
                const endX = b.cx, endY = b.cy;

                if (c.CONNECTOR_LINE_CURVED) {
                    // cubic bezier: control points spread horizontally
                    const dx = Math.abs(endX - startX);
                    const cp1x = startX + Math.sign(endX - startX) * Math.max(30, dx * 0.3);
                    const cp2x = endX - Math.sign(endX - startX) * Math.max(30, dx * 0.3);
                    const pathStr = `M ${startX} ${startY} C ${cp1x} ${startY}, ${cp2x} ${endY}, ${endX} ${endY}`;
                    const line = wsSvg.path(pathStr)
                        .stroke({ color: parseColor(fromCircle.fill() as Color), width: c.CONNECTOR_LINE_WIDTH })
                        .fill('none')
                        .attr({ class: (this.constructor as typeof Renderer).CONN_LINE_TAG });
                    (this as any)._svgElements.push(line);
                } else {
                    // fallback straight line
                    const pathStr = `M ${startX} ${startY} L ${endX} ${endY}`;
                    const line = wsSvg.path(pathStr)
                        .stroke({ color: parseColor(fromCircle.fill() as Color), width: c.CONNECTOR_LINE_WIDTH })
                        .fill('none')
                        .attr({ class: (this.constructor as typeof Renderer).CONN_LINE_TAG });
                    (this as any)._svgElements.push(line);
                }
            }
        }
    }

    clearLines() {
        for (let line of this.getWs().svg.find(`.${(this.constructor as typeof Renderer).CONN_LINE_TAG}`)) {
            line.remove();
        }
    }

    clearScreen() {
        eventer.destroyByTag((this.constructor as typeof Renderer).ELEMENT_TAG)
        this._ws.svg.clear();
        this._drawStates = [];
    }
}

export default Renderer;
