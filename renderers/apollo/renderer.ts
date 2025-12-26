
import { Path as SvgPath, StrokeData, G } from "@svgdotjs/svg.js";
import * as Path from '../../util/path'
import { ColorStyle, Hex } from "../../src/visual-types";
import WorkspaceSvg from "../../src/workspace-svg";
import Renderer, { DrawState, NodeMeasurements } from "../renderer"; // Saying the value of "Renderer" is undefined when it's clearly defined and theres no circular refs.
import ApolloConstants from "./constants";
import { parseColor } from "../../util/parse-color";
import eventer from "../../util/eventer";
import NodeSvg from "../../src/nodesvg";
import Connection from "../../src/connection";
import { AnyField, FieldRawBoxData } from "../../src/field";
console.log(Renderer);

function darkenColor(hex: string, amount: number = 0.2): string {
    // Remove # if present
    hex = hex.replace(/^#/, "");

    // Parse r, g, b
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    // Darken each channel
    const newR = Math.max(0, Math.floor(r * (1 - amount)));
    const newG = Math.max(0, Math.floor(g * (1 - amount)));
    const newB = Math.max(0, Math.floor(b * (1 - amount)));

    // Convert back to hex and pad with 0s
    const toHex = (c: number) => c.toString(16).padStart(2, "0");

    return `#${toHex(newR)}${toHex(newG)}${toHex(newB)}`;
}




/**
 * ApolloRenderer
 * 
 * Custom renderer extending the base `Renderer` for a visual programming workspace.
 * This renderer provides a distinct node style:
 * - Node background uses the primary color entirely
 * - Topbar is hidden (but still present for dragging)
 * - Bottom-right dog-ear decoration
 * - Previous connection at the top, next connection at the bottom
 */
class ApolloRenderer extends Renderer {
    declare _constants: ApolloConstants;

    static get NAME() {
        return 'apollo';
    }
    static get ElEMENT_TAG() {
        return 'ApolloElement';
    }
    /**
     * Constructor
     * @param workspace - The WorkspaceSvg instance
     * @param overrides - Partial constant overrides for ApolloConstants
     */
    constructor(workspace: WorkspaceSvg, overrides: Partial<ApolloConstants>) {
        super(workspace, overrides);
    }

    /** 
     * Typed getter for renderer constants
     */
    get constants(): ApolloConstants {
        return super.constants as ApolloConstants;
    }

    /** Initialize constants using Apollo-specific overrides */
    initConstants() {
        this._constants = new ApolloConstants(this.constantOverrides);
    }

    /**
     * Draws the node's topbar.
     * Overridden to hide the topbar visually while retaining its group for dragging.
     * @param state - Current draw state
     * @param colors - Node colors
     * @param measurements - Node dimensions
     */
    drawNodeTopbar(state: DrawState, colors: ColorStyle, measurements: NodeMeasurements | null) {
        const c = this.constants;
        const width = measurements?.width ?? c.NODE_BASE_WIDTH;
        const radius = c.CORNER_RADIUS;

        state.topbar = state.group!.path(Path.roundedRect(width, c.TOPBAR_HEIGHT, radius))
            .fill('transparent');
    }

    /**
     * Draws the node background with rounded corners and bottom-right dog-ear cut.
     * Also creates a shadow.
     * @param state - Current draw state
     * @param measurements - Node dimensions
     */
    drawNodeBase(state: DrawState, measurements: NodeMeasurements | null) {
        const c = this.constants;
        const width = measurements?.width ?? c.NODE_BASE_WIDTH;
        const height = measurements?.height ?? c.NODE_BASE_HEIGHT;
        const r = c.CORNER_RADIUS;

        const dogear = this.constants.SHAPES.Dogear;
        const cutW = dogear?.Width ?? 0;
        const cutH = dogear?.Height ?? 0;

        // Rounded rect with bottom-right cut
        const roundedRect = `M${r},0 H${width - r} Q${width},0 ${width},${r} V${height - cutH} L${width - cutW},${height} H${r} Q0,${height} 0,${height - r} V${r} Q0,0 ${r},0 Z`;

        const colors = this.getNodeColors();
        const primary = parseColor(colors.primary) as string;
        const stroke = parseColor(colors.secondary) as string;

        // Node background
        state.bg = state.group!.path(roundedRect)
            .fill(primary)
            .stroke({ color: stroke, width: 2 });

        // Dog-ear decoration
        this.drawDogEar(state, state.group as G, width, height, colors);

        // Node shadow
        state.shadow = state.group!.path(roundedRect)
            .fill('rgba(0,0,0,0.2)')
            .stroke('none')
            .attr({ 'pointer-events': 'none' })
            .move(Number(state.bg.x()) + 5, Number(state.bg.y()) + 5)
            .back();
    }

    /**
     * Draws a dog-ear decoration at the node's bottom-right corner
     * @param state - Current draw state
     * @param nodeG - Node's SVG group
     * @param w - Node width
     * @param h - Node height
     * @param colors - Node colors
     */
    drawDogEar(state: DrawState, nodeG: G, w: number, h: number, colors: ColorStyle) {
        const pathDef = this.constants.SHAPES.Dogear?.PathMain;
        if (!pathDef) return;

        const dogEar = nodeG.path(pathDef)
            .fill(parseColor(colors.secondary) as string)
            .stroke({ color: parseColor(colors.tertiary) as string, width: 1 } as StrokeData);

        const offsetX = w - this.constants.SHAPES.Dogear!.Width;
        const offsetY = h - this.constants.SHAPES.Dogear!.Height;
        dogEar.move(offsetX, offsetY);
        dogEar.front();
    }

    /**
     * Draws previous and next connections for the node.
     * Previous connection is on top, next is on bottom.
     * @param state - Draw state
     * @param node - NodeSvg instance
     * @param nodeGroup - Node's SVG group
     * @param measurements - Node dimensions
     */
    drawPreviousNextConnections(state: DrawState, node: NodeSvg, nodeGroup: G, measurements: { width: number, height: number } | null = null) {
        if (!state || !node || !state.bg) return;

        const c = this.constants;
        const colors: ColorStyle = this.getNodeColors();
        const bbox = state.bg.bbox();

        // Top connector (previous)
        if (node.previousConnection) {
            const c1 = this.drawPrimaryConnector(nodeGroup, state.bg, 'top', parseColor(this._constants.CONNECTOR_COLOR) as string);
            if (c1) {
                const conn = {
                    from: node.previousConnection,
                    to: this.resolveConnectable(node.previousConnection.getFrom(), node.previousConnection) as Connection,
                    fromCircle: c1 as SvgPath,
                    originConn: node.previousConnection,
                    originCircle: c1
                };
                this.setConnect(conn);
                eventer.addElement(c1, 'k_connectbubble', { connection: node.previousConnection, node })
                    .tagElement(c1, [(this.constructor as typeof Renderer).ELEMENT_TAG, `node_${node.id}`]);
                this._fillOtherNodeConnectorCircle(node.previousConnection, c1 as SvgPath, true);
            }
        }

        // Bottom connector (next)
        if (node.nextConnection) {
            const c2 = this.drawPrimaryConnector(nodeGroup, state.bg, 'bottom', parseColor(this._constants.CONNECTOR_COLOR) as string);
            if (c2) {
                const conn = {
                    from: node.nextConnection,
                    to: this.resolveConnectable(node.nextConnection.getTo(), node.nextConnection) as Connection,
                    fromCircle: c2 as SvgPath,
                    originConn: node.nextConnection,
                    originCircle: c2
                };
                this.setConnect(conn);
                eventer.addElement(c2, 'k_connectbubble', { connection: node.nextConnection, node })
                    .tagElement(c2, [(this.constructor as typeof Renderer).ELEMENT_TAG, `node_${node.id}`]);
                this._fillOtherNodeConnectorCircle(node.nextConnection, c2 as SvgPath, false);
            }
        }
    }

    /**
     * Draws a primary connector (triangle or circle) on either the top or bottom edge.
     * @param nodeGroup - Node's SVG group
     * @param nodeBg - Node background path
     * @param side - 'top' or 'bottom'
     * @param color - Connector color
     * @returns SvgPath of the connector
     */
    drawPrimaryConnector(nodeGroup: G, nodeBg: SvgPath, side: 'top' | 'bottom', color: string): SvgPath | void {
        const c = this.constants;
        if (!nodeGroup || !nodeBg) return;

        const bbox = nodeBg.bbox();
        const triSize = c.CONNECTOR_TRI_SIZE;
        const radius = c.CONNECTOR_RADIUS;
        const x = bbox.width / 2;
        let y: number;
        let element: SvgPath;

        if (c.CONNECTOR_TRIANGLE) {
            let path = Path.roundedTri(triSize, triSize, 1);
            if (side === 'top') y = -triSize;
            else { y = bbox.height; path = Path.rotatePath(path, 180, triSize / 2, triSize / 2); }

            element = nodeGroup.path(path)
                .fill(parseColor(color as Hex))
                .stroke({ color: parseColor('#00000000'), width: 0 })
                .transform({ translateX: x - triSize / 2, translateY: y });
        } else {
            const circlePath = Path.circle(radius);
            y = side === 'top' ? 0 : bbox.height;

            element = nodeGroup.path(circlePath)
                .fill(parseColor(color as Hex))
                .stroke({ color: parseColor('#00000000'), width: 0 })
                .move(x - radius, y - radius);
        }

        element.attr({ class: (this.constructor as typeof Renderer).CONNECTOR_TAG });
        return element;
    }
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

        // Draw the rectangle
        const rect = fieldGroup.rect(width, height)
            .fill(parseColor(c.FIELD_RAW_COLOR))
            .stroke({ color: parseColor(c.FIELD_RAW_OUTLINE_COLOR), width: c.FIELD_RAW_OUTLINE_STROKE })
            .radius(20);

        // Draw the text
        const txt = fieldGroup.text(value)
            .font({
                family: c.FONT_FAMILY,
                size: c.FONT_SIZE,
                anchor: 'start'
            })
            .fill(parseColor(c.FIELD_RAW_TEXT_COLOR));
        txt.node.style.userSelect = 'none';

        const rawBox: FieldRawBoxData = { box: rect, txt };

        // Measure text dimensions
        const textBBox = txt.bbox();

        // Vertical centering
        const offsetY = (height - textBBox.height) / 2;

        // Horizontal centering with padding
        const paddedWidth = width - 2 * c.INPUT_BOX_PADDING;
        const offsetX = startX + c.INPUT_BOX_PADDING + Math.max(0, (paddedWidth - textBBox.width) / 2);

        // Move elements
        rect.move(startX, 0);
        txt.move(offsetX, offsetY);

        // Add event listener
        eventer.addElement(rect, "k_inputbox", {
            field,
            text: txt,
            renderer: this,
            startX
        }).tagElement(rect, [(this.constructor as typeof Renderer).ELEMENT_TAG, `node_${this.node!.id}`]);

        return { rect, txt, rawBox };
    }

    /**
     * Draws the full node (base, topbar, fields, connectors, label, etc.)
     */
    drawNode() {
        if (!this.node) return;

        const colors = this.getNodeColors();
        const node = this.node;
        const state = this.drawState(this.createNodeGroup(node), node.id);
        this._nodeDraw = state;

        const measurements = this.measureNodeDimensions();
        if (!measurements) return;

        this.drawNodeBase(state, measurements as NodeMeasurements);
        this.drawNodeTopbar(state, colors, measurements as NodeMeasurements);
        this.drawNodeXButton();
        this.drawNodeLabel(state.group!);
        this.makeNodeDraggable(state.group!, state.topbar!, node);

        this.createFieldGroup(state);
        this.drawAllFieldsForNode(measurements as NodeMeasurements);
        this.drawPreviousNextConnections(state, node, state.group!, measurements as NodeMeasurements);
    }
}


export default ApolloRenderer;