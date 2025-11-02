import RendererConstants from "./constants";
import WorkspaceSvg from '../src/workspace-svg';
import NodeSvg from '../src/nodesvg';
import { G, Path as SvgPath, Svg, Rect } from "@svgdotjs/svg.js";
import { AnyField, FieldRawBoxData } from "../src/field";
import Connection, { Connectable } from "../src/connection";
import CommentRenderer from "../comment-renderer/renderer";
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
    _drawStates: DrawState[];
    _commentDrawer: CommentRenderer;
    representer: import('./representer').default;
    static get NODE_G_TAG(): string;
    static get ELEMENT_TAG(): string;
    static get CONN_LINE_TAG(): string;
    static get CONNECTOR_TAG(): string;
    static get LINE_X_MARK_TAG(): string;
    static get NAME(): string;
    constructor(workspace: WorkspaceSvg, overrides?: Partial<RendererConstants>);
    initRepresenter(): void;
    initCommentRenderer(): void;
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
    measureTextHeight(text: string, fontSize?: number, fontFamily?: string): number;
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
        rect: Rect;
        txt: import("@svgdotjs/svg.js", { with: { "resolution-mode": "import" } }).Text;
        rawBox: FieldRawBoxData;
    };
    drawFieldLabel(fieldGroup: G, field: AnyField, startX?: number): number;
    drawNodeXButton(): void;
    drawConnector(nodeGroup: G, nodeBg: SvgPath, y: number, side: 'left' | 'right', color: string): SvgPath | void | undefined | null;
    drawNodeLabel(nodeGroup: G): void;
    resolveConnectable(connectable: Connectable, fromConn: Connection): Connection | null | undefined;
    private _fillOtherNodeConnectorCircle;
    refreshComments(): void;
    clearComments(): void;
    drawComments(): void;
    getZoom(): number;
    applyZoomToNode(nodeG: G, node: NodeSvg): void;
    refreshNodeTransforms(): void;
    refreshConnectionLines(): void;
    createNodeDrawState(nodeGroup: G, id: string): DrawState;
    drawNode(): void;
    fillAllNodeConnectorBubbles(): void;
    drawLinesForAllNodes(): void;
    clearLines(): void;
    clearScreen(): void;
    undoPendingConnsFor(conn: ConnectorToFrom): void;
    rerenderNode(node: NodeSvg): G | null | undefined;
}
export default Renderer;
//# sourceMappingURL=renderer.d.ts.map