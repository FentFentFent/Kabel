import Coordinates from "./coordinates";
import NodeSvg from "./nodesvg";
import { Svg } from '@svgdotjs/svg.js';
import Renderer from '../renderers/renderer';
import { InjectOptions } from "./inject";
import WorkspaceCoords from "./workspace-coords";
import WorkspaceController from '../controllers/base';
/**
 * Represents the visual workspace containing nodes and connections.
 * Handles rendering, panning, and coordinate transformations.
 */
declare class WorkspaceSvg {
    /** Top-left offset of the workspace viewport */
    _camera: WorkspaceCoords;
    /** Node storage by unique ID */
    _nodeDB: Map<string, NodeSvg>;
    /** Root HTML container for the workspace */
    _root: HTMLElement;
    /** Top-level wrapper for the SVG */
    _wsTop: HTMLElement;
    /** SVG.js instance for rendering */
    svg: Svg;
    /** Renderer instance for drawing nodes and connections */
    renderer: Renderer;
    /** Options for workspace behavior and rendering overrides */
    options: InjectOptions;
    /** Flag to temporarily prevent redraws */
    noRedraw: boolean;
    controller: WorkspaceController;
    /**
     * Creates a new WorkspaceSvg instance.
     * @param root - The root HTML element containing the workspace.
     * @param wsTop - The top-level wrapper element for the SVG.
     * @param options - Configuration and renderer override options.
     */
    constructor(root: HTMLElement, wsTop: HTMLElement, options: InjectOptions);
    /**
     * Returns the current width and height of the workspace's svg content size in pixels.
     * Useful for camera positioning.
     */
    getContentSize(): {
        width: number;
        height: number;
    };
    /**
     * Returns the current width and height of the workspace in pixels.
     * Useful for camera centering, zoom calculations, and viewport sizing.
     */
    getSize(): {
        width: number;
        height: number;
    };
    /**
     * Updates all connection lines & node screen positions without a full redraw.
     * Used when nodes are dragged or the camera moves.
     */
    refresh(): void;
    /** Draws all nodes in the workspace. */
    drawAllNodes(): void;
    /** Redraws the entire workspace unless noRedraw is set. */
    redraw(): void;
    /**
     * Converts workspace coordinates to screen (SVG) coordinates.
     * @param x - X position in workspace coordinates.
     * @param y - Y position in workspace coordinates.
     * @returns Screen coordinates as a Coordinates instance.
     */
    workspaceToScreen(x: number, y: number): Coordinates;
    /**
     * Converts screen (SVG) coordinates to workspace coordinates.
     * @param x - X position in screen coordinates.
     * @param y - Y position in screen coordinates.
     * @returns Workspace coordinates as a Coordinates instance.
     */
    screenToWorkspace(x: number, y: number): Coordinates;
    /**
     * Draws a node by its ID.
     * @param id - The ID of the node to render.
     * @returns The rendered node.
     */
    drawNode(id: string): void;
    /**
     * Adds a node to the workspace.
     * @param node - The node instance to add.
     * @param nodeId - Optional custom ID to use instead of node.id.
     */
    addNode(node: NodeSvg, nodeId?: string): void;
    /**
     * Removes a node by its ID.
     * @param id - The ID of the node to remove.
     */
    removeNodeById(id: string): void;
    /**
     * Removes a node by its instance.
     * @param node - The node instance to remove.
     */
    removeNode(node: NodeSvg): void;
    /**
     * Retrieves a node by its ID.
     * @param id - The ID of the node.
     * @returns The NodeSvg instance or undefined if not found.
     */
    getNode(id: string): NodeSvg | undefined;
    /**
     * Pans the camera by the given delta values.
     * @param dx - Change in X direction.
     * @param dy - Change in Y direction.
     */
    pan(dx: number, dy: number): void;
}
export default WorkspaceSvg;
//# sourceMappingURL=workspace-svg.d.ts.map