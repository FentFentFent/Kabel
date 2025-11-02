import Coordinates from "./coordinates";
import NodeSvg from "./nodesvg";
import { Svg, SVG } from '@svgdotjs/svg.js';
import Renderer from '../renderers/renderer';
import { InjectOptions } from "./inject";
import WorkspaceCoords from "./workspace-coords";
import WorkspaceController from '../controllers/base';
import WASDController from '../controllers/wasd';
import { RMap } from "./renderer-map";
import Toolbox from "./toolbox";
import NodePrototypes from "./prototypes";
import newHeadlessNode from "./headless-node";
import Widget from "./widget";
import WidgetPrototypes from "./widget-prototypes";
import ContextMenuHTML from "./context-menu";
import CommentModel from "./comment";
import Field, { ConnectableField } from "./field";


function resolveController(options: InjectOptions): typeof WorkspaceController {
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
     * Toolbox for the workspace.
     */
    toolbox?: Toolbox;
    /**
     * A list of widgets active in this workspace
     */
    _widgetDB: Map<string, Widget>

    /**
     * A manager for the context menu widget
     */
    _ctxMenu: ContextMenuHTML
    /**
     * A list of comments for this workspace.
     */
    _commentDB: Set<CommentModel>;
    /**
     * Creates a new WorkspaceSvg instance.
     * @param root - The root HTML element containing the workspace.
     * @param wsTop - The top-level wrapper element for the SVG.
     * @param options - Configuration and renderer override options.
     */
    constructor(root: HTMLElement, wsTop: HTMLElement, options: InjectOptions) {
        wsTop.style.width = '100%';
        wsTop.style.height = '100%';

        this._root = root;
        this._wsTop = wsTop;
        this.svg = SVG().addTo(this._wsTop).size('100%', '100%');
        this.options = options;
        let RClass: typeof Renderer = RMap.resolve(options.renderer);
        this.renderer = new RClass(this, this.options.rendererOverrides || {});
        if (this.options.toolbox) {
            this.toolbox = new Toolbox(this);
        }
        this._camera = new WorkspaceCoords(0, 0);
        this._nodeDB = new Map();
        this.noRedraw = false;
        this.controller = new (options.Controller ?? resolveController(options))(this);
        this._widgetDB = new Map();
        this._ctxMenu = new ContextMenuHTML(this);
        this._commentDB = new Set();
    }
    getZoom() {
        return this.controller.getZoom();
    }
    /**
     * Refresh comments.
     */
    refreshComments() {
        this.renderer.refreshComments();
    }
    /**
     * Get all comments
     * @returns {CommentModel[]}
     */
    getComments() {
        return Array.from(this._commentDB);
    }
    /**
     * Duplicate node data from one to another
     * @param nodeSvg - The node
     */
    cloneNode(nodeSvg: NodeSvg) {
        const n = new NodeSvg(nodeSvg.prototype, this);
        n.init();
        n.fromNode(nodeSvg);
        this.redraw();
    }
    /**
     * Internal: Add widget to DB
     * @param wdgt - The widget
     */
    _addWidgetToDB(wdgt: Widget) {
        this._widgetDB.set(wdgt.id, wdgt);
    }
    /**
     * Internal: Delete a widget from DB.
     * @param wdgt - Widget to delete
     */
    _delWidgetFromDB(wdgt: Widget) {
        this._widgetDB.delete(wdgt.id);
    }
    /**
     * Create a new widget of type.
     * @param type - The prototype
     * @returns {Widget|void}
     */
    newWidget(type: string): void | Widget {
        const opts = WidgetPrototypes[type];
        if (!opts) return;
        if (opts.cls) {
            const wdgt = new (opts.cls)(this, opts);
            this._addWidgetToDB(wdgt);
            return wdgt;
        }
        const wdgt = new Widget(this, opts);
        this._addWidgetToDB(wdgt);
        return wdgt;
    }
    /**
     * Get a widget
     * @param id - Identifier
     * @returns {Widget|undefined} - A widget
     */
    getWidget(id: string): Widget | undefined {
        if (this._widgetDB.has(id)) return this._widgetDB.get(id);
        return undefined;
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

    /** Draws all nodes in the workspace. Very heavy. */
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
        this.renderer.clearComments();
        this.renderer.drawComments();
    }

    /**
     * Converts workspace coordinates to screen (SVG) coordinates.
     * @param x - X position in workspace coordinates.
     * @param y - Y position in workspace coordinates.
     * @returns Screen coordinates as a Coordinates instance.
     */
    workspaceToScreen(workX: number, workY: number) {
        const zoom = this.getZoom();
        // _camera represents the top-left of the visible viewport in workspace coords
        const x = (workX - this._camera.x) * zoom;
        const y = (workY - this._camera.y) * zoom;
        return { x, y };
    }

    /**
     * Converts screen (SVG) coordinates to workspace coordinates.
     * @param x - X position in screen coordinates.
     * @param y - Y position in screen coordinates.
     * @returns Workspace coordinates as a Coordinates instance.
     */
    screenToWorkspace(screenX: number, screenY: number) {
        const zoom = this.getZoom();
        const workX = screenX / zoom + this._camera.x;
        const workY = screenY / zoom + this._camera.y;
        return { x: workX, y: workY };
    }

    /**
     * Draws a node by its ID.
     * @param id - The ID of the node to render.
     * @returns The rendered node.
     */
    drawNode(id: string) {
        return this.renderer.rerenderNode(this._nodeDB.get(id) as NodeSvg);
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
        if (node.workspace !== this) {
            node.workspace = this;
        }
        this._nodeDB.set(id, node);
        this.drawNode(id);
    }

    /**
     * Create a new node of *type*.
     * @param type - The node's prototype name.
     */
    newNode(type: keyof typeof NodePrototypes): NodeSvg | undefined {
        if (!NodePrototypes[type]) return;
        const node = newHeadlessNode(type as string);
        if (!node) return;
        this.addNode(node);
        return node;
    }
    /**
     * Spawns a node at x, y of prototype type
     * @param type - The node prototype name
     * @param x - X position
     * @param y - Y position
     * @returns {Node} - The new node
     */
    spawnAt(type: keyof typeof NodePrototypes, x: number, y: number): NodeSvg | undefined {
        const node = this.newNode(type);
        if (!node) return;
        node.relativeCoords.set(x, y);
        this.drawNode(node.id);
        return node;
    }
    /**
     * Dereference a node from all of its connected neighbors
     */
    derefNode(node: NodeSvg) {
        // Disconnect from previous node or field
        const prev = node.previousConnection?.getFrom?.();
        if (prev instanceof NodeSvg) {
            prev.nextConnection?.disconnectTo();
        } else if (prev instanceof ConnectableField && prev.hasConnectable()) {
            prev.disconnect();
        }

        // Disconnect from next node
        const next = node.nextConnection?.getTo?.();
        if (next instanceof NodeSvg) {
            next.previousConnection?.disconnectFrom();
        }

        // Disconnect all fields
        for (let field of node.allFields()) {
            if ((field as ConnectableField).hasConnectable?.()) {
                (field as ConnectableField).disconnect();
            }
        }
    }
    /**
     * Removes a node by its ID.
     * @param id - The ID of the node to remove.
     */
    removeNodeById(id: string) {
        const node = this._nodeDB.get(id);
        if (!node) return;
        this.derefNode(node);
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
    /**
     * Comment methods
     */

    /**
     * Adds a comment, returns the model.
     */
    addComment() {
        const model = new CommentModel(this);
        this._commentDB.add(model);
        this.redrawComments();
        return model;
    }
    /**
     * Gets a comment by id
     * @param id - The comment id.
     */
    getComment(id: string) {
        return Array.from(this._commentDB).find(e => e.id === id);
    }
    /**
     * Remove a comment by its instance or id.
     * @param commentOrId - The comment instance or its id.
     */
    removeComment(commentOrId: CommentModel | string) {
        let comment: CommentModel | undefined;

        if (typeof commentOrId === "string") {
            comment = this.getComment(commentOrId);
        } else {
            comment = commentOrId;
        }

        if (!comment) return false;

        this._commentDB.delete(comment);
        this.redrawComments();
        return true;
    }
    /**
     * Redraw all comments in this workspace.
     */
    redrawComments() {
        this.renderer.clearComments();
        this.renderer.drawComments();
    }
    /**
     * Deserialize this workspace from json data.
     * @param json - Serialized workspace
     */
    fromJson(json: {nodes: any[], circular: boolean }) {
        if (json.circular) {
            for (let node of json.nodes) {
                NodeSvg.deserialize(node, this);
            }
        } else {
            for (let node of json.nodes) {
                NodeSvg.fromJson(node, this);
            }
        }
    }
    /**
     * Serialize this workspace, optionally using circular references.
     */
    toJson(circular: boolean) {
        const nodes = [];
        if (circular) {
            for (let [id, node] of this._nodeDB) {
                if (node.topLevel) {
                    nodes.push(node.serialize());
                }
            }
        } else {
            for (let [id, node] of this._nodeDB) {
                if (node.topLevel) {
                    nodes.push(node.toJson());
                }
            }
        }

        return {
            circular,
            nodes
        }
    }
}

export default WorkspaceSvg;
