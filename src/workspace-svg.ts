import Coordinates from "./coordinates";
import NodeSvg from "./nodesvg";
import { Svg, SVG } from '@svgdotjs/svg.js';
import Renderer from '../renderers/renderer';
import { InjectOptions } from "./inject";
import WorkspaceCoords from "./workspace-coords";
import WorkspaceController from '../controllers/base';
import WASDController from '../controllers/wasd';
import { RMap } from "./renderer-map";


function resolveController(options: InjectOptions) : typeof WorkspaceController {
    if (options?.controls) {
        if (options?.controls.wasd) {
            return WASDController;
        }
    }
    return WorkspaceController;
}
/** 
 * Represents the visual workspace containing nodes and connections.
 * Handles rendering, panning, and coordinate transformations.
 */
class WorkspaceSvg {
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
    /**
     * A class instance that moves the camera based on user interactions.
     */
    controller: WorkspaceController;
    /**
     * Creates a new WorkspaceSvg instance.
     * @param root - The root HTML element containing the workspace.
     * @param wsTop - The top-level wrapper element for the SVG.
     * @param options - Configuration and renderer override options.
     */
    constructor(root: HTMLElement, wsTop: HTMLElement, options: InjectOptions) {
        wsTop.style.width = '100%';
        wsTop.style.height = '100%';

        this._camera = new WorkspaceCoords(0, 0);
        this._nodeDB = new Map();
        this._root = root;
        this._wsTop = wsTop;
        this.svg = SVG().addTo(this._wsTop).size('100%', '100%');
        this.options = options;
        let RClass: typeof Renderer = RMap.resolve(options.renderer);
        this.renderer = new RClass(this, this.options.rendererOverrides || {});
        this.noRedraw = false;
        this.controller = new (options.Controller ?? resolveController(options))(this);
    }
    /**
     * Returns the current width and height of the workspace's svg content size in pixels.
     * Useful for camera positioning.
     */
    getContentSize(): { width: number; height: number } {
        const bbox = this.svg.bbox();
        return { width: bbox.width, height: bbox.height };
    }
    /**
     * Returns the current width and height of the workspace in pixels.
     * Useful for camera centering, zoom calculations, and viewport sizing.
     */
    getSize(): { width: number; height: number } {
        const rect = this._wsTop.getBoundingClientRect();
        return { width: rect.width, height: rect.height };
    }

    /**
     * Updates all connection lines & node screen positions without a full redraw.
     * Used when nodes are dragged or the camera moves.
     */
    refresh() {
        this.renderer.refreshNodeTransforms();
    }

    /** Draws all nodes in the workspace. */
    drawAllNodes() {
        for (let [nodeId, _] of this._nodeDB) {
            this.drawNode(nodeId);
        }
    }

    /** Redraws the entire workspace unless noRedraw is set. */
    redraw() {
        if (this.noRedraw) return;
        this.renderer.clearScreen();
        this.drawAllNodes();
        this.refresh();
    }

    /**
     * Converts workspace coordinates to screen (SVG) coordinates.
     * @param x - X position in workspace coordinates.
     * @param y - Y position in workspace coordinates.
     * @returns Screen coordinates as a Coordinates instance.
     */
    workspaceToScreen(x: number, y: number): Coordinates {
        const {x: rx, y: ry} = this.controller.workspaceToScreen(x, y);
        return new Coordinates(rx, ry);
    }

    /**
     * Converts screen (SVG) coordinates to workspace coordinates.
     * @param x - X position in screen coordinates.
     * @param y - Y position in screen coordinates.
     * @returns Workspace coordinates as a Coordinates instance.
     */
    screenToWorkspace(x: number, y: number): Coordinates {
        const {x: rx, y: ry} = this.controller.screenToWorkspace(x, y);
        return new Coordinates(rx, ry);
    }

    /**
     * Draws a node by its ID.
     * @param id - The ID of the node to render.
     * @returns The rendered node.
     */
    drawNode(id: string) {
        return this.renderer.renderNode(id);
    }

    /**
     * Adds a node to the workspace.
     * @param node - The node instance to add.
     * @param nodeId - Optional custom ID to use instead of node.id.
     */
    addNode(node: NodeSvg, nodeId?: string) {
        let id = nodeId || node.id;
        if (this._nodeDB.has(id)) {
            console.warn(`Node with id ${id} already exists, overwriting.`);
        }
        this._nodeDB.set(id, node);
        this.redraw();
    }

    /**
     * Removes a node by its ID.
     * @param id - The ID of the node to remove.
     */
    removeNodeById(id: string) {
        const node = this._nodeDB.get(id);
        if (!node) return;
        this._nodeDB.delete(id);
        this.redraw();
    }

    /**
     * Removes a node by its instance.
     * @param node - The node instance to remove.
     */
    removeNode(node: NodeSvg) {
        if (!node) return;
        this.removeNodeById(node.id);
    }

    /**
     * Retrieves a node by its ID.
     * @param id - The ID of the node.
     * @returns The NodeSvg instance or undefined if not found.
     */
    getNode(id: string): NodeSvg | undefined {
        return this._nodeDB.get(id);
    }

    /**
     * Pans the camera by the given delta values.
     * @param dx - Change in X direction.
     * @param dy - Change in Y direction.
     */
    pan(dx: number, dy: number) {
        this._camera.x += dx;
        this._camera.y += dy;
    }
}

export default WorkspaceSvg;
