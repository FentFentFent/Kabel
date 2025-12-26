import NodeSvg from "./nodesvg";
import { Svg, Rect } from '@svgdotjs/svg.js';
import Renderer from '../renderers/renderer';
import { InjectOptions } from "./inject";
import WorkspaceCoords from "./workspace-coords";
import WorkspaceController from '../controllers/base';
import Toolbox from "./toolbox";
import NodePrototypes from "./prototypes";
import Widget from "./widget";
import ContextMenuHTML from "./context-menu";
import CommentModel from "./comment";
import Grid from "./grid";
import UndoRedoHistory from "./undo-redo";
import Workspace from "./workspace";
import { Color } from "./visual-types";
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
export interface WSTheme {
    UIStyles?: {
        workspaceBGColor?: Color;
        toolboxCategoriesBG?: Partial<CSSStyleDeclaration>;
        toolboxFlyoutBG?: Partial<CSSStyleDeclaration>;
    };
}
/**
 * Represents the visual workspace containing nodes and connections.
 * Handles rendering, panning, and coordinate transformations.
 */
declare class WorkspaceSvg extends Workspace {
    static get BACKGROUND_CLASS(): string;
    /**
     * Theme of the workspace
     */
    theme: WSTheme;
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
    _backgroundRect: Rect;
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
    _widgetDB: Map<string, Widget>;
    /**
     * A manager for the context menu widget
     */
    _ctxMenu: ContextMenuHTML;
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
    recordHistory: boolean;
    /**
     * Stack of old recordHistory values for toggleHistory
     */
    recordHistoryRecord: boolean[];
    /**
     * Internal flag to indicate if the camera has moved this frame.
     */
    _didMove: boolean;
    /**
     * Listeners to call when the workspace moves.
     */
    moveListeners: (() => void)[];
    /** Current drag state for node dragging */
    dragState: IDragState | null;
    /**
     * Creates a new WorkspaceSvg instance.
     * @param root - The root HTML element containing the workspace.
     * @param wsTop - The top-level wrapper element for the SVG.
     * @param options - Configuration and renderer override options.
     */
    constructor(root: HTMLElement, wsTop: HTMLElement, options: InjectOptions);
    setTheme(theme: WSTheme): void;
    /**
     * Getter and setter for whether we moved or not this frame.
     */
    get didMove(): boolean;
    set didMove(value: boolean);
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
    }): void;
    beginDrag(node: NodeSvg, startX: number, startY: number, offsetX?: number, offsetY?: number): void;
    /**
     * Updates the current drag position.
     * @param currentX - Current X position.
     * @param currentY - Current Y position.
     * @returns Void.
     */
    updateDrag(currentX: number, currentY: number): void;
    endDrag(): void;
    /**
     * Fires all move listeners registered to this workspace.
     */
    fireMoveListeners(): void;
    /**
     * Adds a move listener to the workspace.
     * @param listener - The listener function to add.
     * @returns A function to remove the added listener.
     */
    addMoveListener(listener: () => void): () => void;
    /**
     * Removes a move listener from the workspace.
     * @param listener - The listener function to remove.
     */
    removeMoveListener(listener: () => void): void;
    /**
     * Emits a change event for the workspace, triggering
     * undo/redo history tracking.
     */
    emitChange(): void;
    /**
     * Temporarily sets the workspace's history recording state.
     * Pushes the previous state onto a stack for later restoration.
     *
     * @param {boolean} value - Whether history recording should be enabled.
     */
    toggleHistory(value: boolean): void;
    /**
     * Restores the previous history recording state from the stack.
     * Use after a temporary toggle to revert to the previous state.
     */
    untoggleHistory(): void;
    /**
     * Sets the background grid up based on user selected options.
     */
    _initBackground(): void;
    /**
     * Updates the transform of the background grid
     */
    _updateBackgroundTransform(): void;
    /**
     * Get the current zoom factor of the workspace.
     * @returns - The zoom factor
     */
    getZoom(): number;
    /**
     * Refresh comments.
     */
    refreshComments(): void;
    /**
     * Get all comments
     * @returns {CommentModel[]}
     */
    getComments(): CommentModel[];
    /**
     * Duplicate node data from one to another
     * @param nodeSvg - The node
     */
    cloneNode(nodeSvg: NodeSvg): void;
    /**
     * Internal: Add widget to DB
     * @param wdgt - The widget
     */
    _addWidgetToDB(wdgt: Widget): void;
    /**
     * Internal: Delete a widget from DB.
     * @param wdgt - Widget to delete
     */
    _delWidgetFromDB(wdgt: Widget): void;
    /**
     * Create a new widget of type.
     * @param type - The prototype
     * @returns {Widget|void}
     */
    newWidget(type: string): void | Widget;
    /**
     * Get a widget
     * @param id - Identifier
     * @returns {Widget|undefined} - A widget
     */
    getWidget(id: string): Widget | undefined;
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
    /** Draws all nodes in the workspace. Very heavy. */
    drawAllNodes(): void;
    /** Redraws the entire workspace unless noRedraw is set. */
    redraw(): void;
    /**
     * Converts workspace coordinates to screen (SVG) coordinates.
     * @param x - X position in workspace coordinates.
     * @param y - Y position in workspace coordinates.
     * @returns Screen coordinates as a Coordinates instance.
     */
    workspaceToScreen(workX: number, workY: number): {
        x: number;
        y: number;
    };
    /**
     * Converts screen (SVG) coordinates to workspace coordinates.
     * @param x - X position in screen coordinates.
     * @param y - Y position in screen coordinates.
     * @returns Workspace coordinates as a Coordinates instance.
     */
    screenToWorkspace(screenX: number, screenY: number): {
        x: number;
        y: number;
    };
    /**
     * Draws a node by its ID.
     * @param id - The ID of the node to render.
     * @returns The rendered node.
     */
    drawNode(id: string): import("@svgdotjs/svg.js", { with: { "resolution-mode": "import" } }).G | null | undefined;
    /**
     * Adds a node to the workspace.
     * @param node - The node instance to add.
     * @param nodeId - Optional custom ID to use instead of node.id.
     */
    addNode(node: NodeSvg, nodeId?: string): void;
    /**
     * Create a new node of *type*.
     * @param type - The node's prototype name.
     */
    newNode(type: keyof typeof NodePrototypes, add?: boolean): NodeSvg | undefined;
    /**
     * Spawns a node at x, y of prototype type
     * @param type - The node prototype name
     * @param x - X position
     * @param y - Y position
     * @returns {Node} - The new node
     */
    spawnAt(type: keyof typeof NodePrototypes, x: number, y: number): NodeSvg | undefined;
    /**
     * Dereference a node from all of its connected neighbors
     */
    derefNode(node: NodeSvg): void;
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
    getNode(id: string | NodeSvg): NodeSvg | undefined;
    /**
     * Pans the camera by the given delta values.
     * @param dx - Change in X direction.
     * @param dy - Change in Y direction.
     */
    pan(dx: number, dy: number): void;
    /**
     * Comment methods
     */
    /**
     * Adds a comment, returns the model.
     */
    addComment(): CommentModel;
    /**
     * Gets a comment by id
     * @param id - The comment id.
     */
    getComment(id: string): CommentModel | undefined;
    /**
     * Remove a comment by its instance or id.
     * @param commentOrId - The comment instance or its id.
     */
    removeComment(commentOrId: CommentModel | string): boolean;
    /**
     * Redraw all comments in this workspace.
     */
    redrawComments(): void;
    /**
     * Deserialize this workspace from json data.
     * @param json - Serialized workspace
     */
    fromJson(json: {
        nodes: any[];
        circular: boolean;
    }, recordBigEvent?: boolean): void;
    /**
     * Serialize this workspace, optionally using circular references.
     */
    toJson(circular: boolean): {
        circular: boolean;
        nodes: (import("./nodesvg").SerializedNode | {
            [id: string]: Omit<import("./nodesvg").SerializedNode, "previousConnection" | "nextConnection"> & {
                previousConnection?: {
                    field?: import("./field").FieldOptions;
                    node?: string;
                };
                nextConnection?: {
                    field?: import("./field").FieldOptions;
                    node?: string;
                };
            };
        })[];
    };
}
export default WorkspaceSvg;
//# sourceMappingURL=workspace-svg.d.ts.map