import RendererConstants from "./constants";
import WorkspaceSvg from '../src/workspace-svg';
import NodeSvg from '../src/nodesvg';
import { G, Path as SvgPath, Svg, Element } from "@svgdotjs/svg.js";
import { AnyField } from "../src/field";
import Connection, { Connectable } from "../src/connection";
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
    topbar?: SvgPath | null;
    bg?: SvgPath | null;
    group?: G | null;
    fieldCol?: G | null;
    fieldPosY?: number | null;
    xButton?: G;
    pendingConnections: ConnectorToFrom[];
}
declare class Renderer {
    _constants: RendererConstants;
    _currentNode: NodeSvg | null;
    _nodeGroup: G | null;
    _nodeDraw: DrawState | null;
    _ws: WorkspaceSvg;
    _svgElements: Element[];
    _drawStates: DrawState[];
    _cachedLinesQueue: ConnectorToFrom[];
    static get NODE_G_TAG(): string;
    static get ELEMENT_TAG(): string;
    static get CONN_LINE_TAG(): string;
    static get CONNECTOR_TAG(): string;
    static get NAME(): string;
    constructor(workspace: WorkspaceSvg, overrides?: Partial<RendererConstants>);
    enqueueSetConnect(c: ConnectorToFrom): void;
    setConstants(c?: Partial<RendererConstants>): RendererConstants & Partial<RendererConstants>;
    get constants(): RendererConstants;
    set constants(c: Partial<RendererConstants>);
    get node(): NodeSvg | null;
    get svg(): Svg;
    get state(): null | undefined | DrawState;
    getWs(): WorkspaceSvg;
    getNodeBaseMeasurements(): {
        width: number;
        height: number;
    };
    measureTextWidth(text: string, fontSize?: number, fontFamily?: string): number;
    measureRawField(text?: string): {
        width: number;
        height: number;
    };
    private measureLabel;
    private measureRaw;
    private measureCustom;
    getFieldMeasurementPadding(): {
        width: number;
        height: number;
    };
    measureField(field: AnyField): {
        width: number;
        height: number;
    };
    measureNodeDimensions(): {
        width: number;
        height: number;
        fields: {
            width: number;
            height: number;
        }[];
    } | undefined;
    renderNode(nodeIdOrNode: NodeSvg | string): void;
    startNode(nodeIdOrNode: NodeSvg | string): void;
    storeState(): void;
    drawFieldRaw(fieldGroup: G, field: AnyField, startX?: number): {
        rect: import("@svgdotjs/svg.js", { with: { "resolution-mode": "import" } }).Rect;
        txt: import("@svgdotjs/svg.js", { with: { "resolution-mode": "import" } }).Text;
    };
    drawFieldLabel(fieldGroup: G, field: AnyField, startX?: number): number;
    drawNodeXButton(): void;
    drawConnector(nodeGroup: G, nodeBg: SvgPath, y: number, side: 'left' | 'right', color: string): SvgPath | void | undefined | null;
    drawNodeLabel(nodeGroup: G): void;
    resolveConnectable(connectable: Connectable, fromConn: Connection): Connection | null | undefined;
    private _fillOtherNodeConnectorCircle;
    refreshNodeTransforms(): void;
    refreshConnectionLines(): void;
    createNodeDrawstate(nodeGroup: G, id: string): DrawState;
    drawNode(): void;
    fillAllNodeConnectorBubbles(): void;
    drawLinesForAllNodes(): void;
    clearLines(): void;
    clearScreen(): void;
}
export default Renderer;
//# sourceMappingURL=renderer.d.ts.map