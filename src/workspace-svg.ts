import Coordinates from "./coordinates";
import NodeSvg from "./nodesvg";
import { Svg, SVG, Pattern, Rect } from '@svgdotjs/svg.js';
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
import waitFrames from "../util/wait-anim-frames";
import { addWindowListener } from "../util/window-listeners";
import Grid from "./grid";
import UndoRedoHistory from "./undo-redo";
import hasProp from "../util/has-prop";
import Workspace from "./workspace";
import Themes from '../themes/themes';
import { Color } from "./visual-types";
import { parseColor } from "../util/parse-color";

export interface IDragState {
    isDragging: boolean;
    startX: number;
    startY: number;
    lastX: number;
    lastY: number;
    deltaX: number;
    deltaY: number;
    offsetX: number;
    offsetY: number;
    node: NodeSvg | null;
}

function resolveController(options: InjectOptions): typeof WorkspaceController {
    if (options?.controls) {
        if (options?.controls.wasd) {
            return WASDController;
        }
    }
    return WorkspaceController;
}

export interface WSTheme {
    UIStyles?: {
        workspaceBGColor?: Color;
        toolboxCategoriesBG?: Partial<CSSStyleDeclaration>;
        toolboxFlyoutBG?: Partial<CSSStyleDeclaration>;
    }
}
type ThemeKeys = keyof typeof Themes; // "Classic" | "Dark"
/** 
 * Represents the visual workspace containing nodes and connections.
 * Handles rendering, panning, and coordinate transformations.
 */
class WorkspaceSvg extends Workspace {
    static get BACKGROUND_CLASS() {
        return 'WorkspaceBackgroundRect';
    }
    /**
     * Theme of the workspace
     */
    theme!: WSTheme;
    /**
     * Workspace background pattern items.
     */
    grid?: Grid;
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
    /** The background element */
    _backgroundRect!: Rect;
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
     * Undo/redo history
     */
    history: UndoRedoHistory;
    /**
     * Whether to record undo/redo history or not
     */
    recordHistory: boolean = true;
    /**
     * Stack of old recordHistory values for toggleHistory
     */
    recordHistoryRecord: boolean[];
    /**
     * Internal flag to indicate if the camera has moved this frame.
     */
    _didMove: boolean = false;
    /**
     * Listeners to call when the workspace moves.
     */
    moveListeners: (() => void)[];
    /** Current drag state for node dragging */
    dragState: IDragState | null = null;
    /**
     * Creates a new WorkspaceSvg instance.
     * @param root - The root HTML element containing the workspace.
     * @param wsTop - The top-level wrapper element for the SVG.
     * @param options - Configuration and renderer override options.
     */
    constructor(root: HTMLElement, wsTop: HTMLElement, options: InjectOptions) {
        super();
        this.isHeadless = false;
        wsTop.style.width = '100%';
        wsTop.style.height = '100%';

        this._root = root;
        this._wsTop = wsTop;
        this.svg = SVG().addTo(this._wsTop).size('100%', '100%');
        this.options = options;
        let RClass: typeof Renderer = RMap.resolve(options.renderer);
        this.renderer = new RClass(this, this.options.rendererOverrides || {});

        const themeKey = (typeof options.theme === 'string' && options.theme in Themes)
            ? options.theme as ThemeKeys
            : 'Classic';

        const theme = (typeof options.theme === 'object' && options.theme)
            ? options.theme
            : Themes[themeKey];

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
        this.history = new UndoRedoHistory(this);
        this.recordHistoryRecord = [];
        this.moveListeners = [];
        if (options.initUndoRedo !== false) {
            this.history.emitChange();
        }
        this.theme = {}; //placeholder
        this._initBackground();

        this.setTheme(theme); // set theme to user-defined theme.
    }
    setTheme(theme: WSTheme) {
        try {
            this.theme = structuredClone(theme);
        } catch {
            this.theme = Object.assign({}, theme);
        }
        // Clone theme so you can mutate ws.theme seperate from Kabels.Themes[ThemeName]
        if (this.toolbox) this.toolbox.updateStyles(this.theme);
        if (this.theme.UIStyles) {
            this._backgroundRect.fill(parseColor(this.theme.UIStyles.workspaceBGColor || '#fffffff'))
        }
    }
    /**
     * Getter and setter for whether we moved or not this frame.
     */
    get didMove() { return this._didMove; }
    set didMove(value: boolean) {
        this._didMove = value;
        if (value) {
            waitFrames(1, () => { this._didMove = false; });
        }
    }
    /**
     * Sets the drag state of the workspace.
     * @param params - Drag state parameters.
     * @returns Void.
     */
    setDragState(params: {
        node: NodeSvg | null;
        startX: number;
        startY: number;
        currentX: number;
        currentY: number;
        offsetX?: number;
        offsetY?: number;
    }) {
        if (!params.node) {
            this.dragState = null;
            return;
        }

        const {
            node,
            startX,
            startY,
            currentX,
            currentY,
            offsetX = 0,
            offsetY = 0
        } = params;

        this.dragState = {
            isDragging: true,
            node,
            startX,
            startY,
            offsetX,
            offsetY,
            lastX: currentX,
            lastY: currentY,
            deltaX: currentX - startX,
            deltaY: currentY - startY
        };
    }
    beginDrag(node: NodeSvg, startX: number, startY: number, offsetX: number = 0, offsetY: number = 0) {
        this.dragState = {
            isDragging: true,
            node,
            startX,
            startY,
            offsetX,
            offsetY,
            lastX: startX,
            lastY: startY,
            deltaX: 0,
            deltaY: 0
        };
    }
    /**
     * Updates the current drag position.
     * @param currentX - Current X position.
     * @param currentY - Current Y position.
     * @returns Void.
     */
    updateDrag(currentX: number, currentY: number) {
        if (!this.dragState || !this.dragState.node) return;

        this.dragState.lastX = currentX;
        this.dragState.lastY = currentY;
        this.dragState.deltaX = currentX - this.dragState.startX;
        this.dragState.deltaY = currentY - this.dragState.startY;
    }
    endDrag() {
        // Set drag state.isDragging to false instead of clearing.
        if (this.dragState) this.dragState.isDragging = false;
    }


    /**
     * Fires all move listeners registered to this workspace.
     */
    fireMoveListeners() {
        this.moveListeners.forEach(e => e());
    }
    /**
     * Adds a move listener to the workspace.
     * @param listener - The listener function to add.
     * @returns A function to remove the added listener.
     */
    addMoveListener(listener: () => void): () => void {
        this.moveListeners.push(listener);
        return () => {
            this.removeMoveListener(listener);
        }
    }
    /**
     * Removes a move listener from the workspace.
     * @param listener - The listener function to remove.
     */
    removeMoveListener(listener: () => void) {
        this.moveListeners = this.moveListeners.filter(e => e != listener);
    }
    /**
     * Emits a change event for the workspace, triggering
     * undo/redo history tracking.
     */
    emitChange() {
        this.history.emitChange();
    }

    /**
     * Temporarily sets the workspace's history recording state.
     * Pushes the previous state onto a stack for later restoration.
     * 
     * @param {boolean} value - Whether history recording should be enabled.
     */
    toggleHistory(value: boolean) {
        this.recordHistoryRecord.push(this.recordHistory);
        this.recordHistory = value;
    }

    /**
     * Restores the previous history recording state from the stack.
     * Use after a temporary toggle to revert to the previous state.
     */
    untoggleHistory() {
        if (this.recordHistoryRecord.length == 0 || this.recordHistoryRecord.length < 0) return;
        this.recordHistory = this.recordHistoryRecord.pop() as boolean;
    }

    /**
     * Sets the background grid up based on user selected options.
     */
    _initBackground() {
        try {
            this._backgroundRect = this.svg.rect(this.svg.width(), this.svg.height())
                .fill(parseColor(this.theme.UIStyles?.workspaceBGColor || '#ffffff'))
                .addClass(WorkspaceSvg.BACKGROUND_CLASS)
                .addTo(this.svg);

            // ensure it has a parent
            this.svg.add(this._backgroundRect);

            // now you can safely move it to the back
            this._backgroundRect.back();
        } catch (e) {
            console.error(e);
        }
        if (this.options.grid) {
            this.grid = new Grid(this, this.svg, this.options.grid);
        }
    }
    /**
     * Updates the transform of the background grid
     */
    _updateBackgroundTransform() {
        this.grid?.updateTransform?.();
        try {
            this._backgroundRect.back();
        } catch (e) {
            console.error(e);
        }
    }

    /**
     * Get the current zoom factor of the workspace.
     * @returns - The zoom factor
     */
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
        this._updateBackgroundTransform();
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
        this.history.emitChange();

    }

    /**
     * Create a new node of *type*.
     * @param type - The node's prototype name.
     */
    newNode(type: keyof typeof NodePrototypes, add: boolean = true): NodeSvg | undefined {
        if (!NodePrototypes[type]) return;
        const node = newHeadlessNode(type as string);
        if (!node) return;
        if (add) this.addNode(node);
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
        const node = this.newNode(type, false);
        if (!node) return;
        node.relativeCoords.set(x, y);
        this.addNode(node);
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
        this.history.emitChange();

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
    getNode(id: string | NodeSvg): NodeSvg | undefined {
        if (id instanceof NodeSvg) return id;
        return this._nodeDB.get(id);
    }

    /**
     * Pans the camera by the given delta values.
     * @param dx - Change in X direction.
     * @param dy - Change in Y direction.
     */
    pan(dx: number, dy: number) {
        this.controller.pan(dx, dy);
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
    fromJson(json: { nodes: any[]; circular: boolean }, recordBigEvent: boolean = false) {
        this.toggleHistory(false); // disable recording

        for (let [_, node] of this._nodeDB.entries()) {
            this.removeNode(node);
        }
        if (json.circular) {
            for (let node of json.nodes) {
                NodeSvg.deserialize(node, this);
            }
        } else {
            for (let node of json.nodes) {
                NodeSvg.fromJson(node, this);
            }
        }

        this.untoggleHistory(); // restore previous history state

        // only emit a single snapshot if we were told to treat it as a user-level event
        if (recordBigEvent && this.recordHistory) {
            this.history.emitChange();
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
