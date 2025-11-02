import { G, Line } from "@svgdotjs/svg.js";
import NodeSvg from "./nodesvg";
import WorkspaceSvg from "./workspace-svg";
import Coordinates from "./coordinates";
import { generateUID } from "../util/uid";

/**
 * Represents a comment attached to either a NodeSvg or a WorkspaceSvg.
 */
class CommentModel {
    /** The comment text */
    _text: string;

    /** True if this comment belongs to the workspace instead of a node */
    _isWorkspaceComment: boolean;

    /** Parent NodeSvg or WorkspaceSvg to which this comment belongs */
    _parent: NodeSvg | WorkspaceSvg;

    /** SVG group representing this comment in the DOM */
    svgGroup?: G|undefined;

    /** Coordinates relative to parent */
    relativeCoords: Coordinates;

    /** Optional SVG line connecting the comment to its node */
    svgLine?: Line|undefined;

    /** Temporary bounding box info for input handling */
    _tempInputBBox?: { width: number; height: number; textX: number; textY: number };

    /** Unique identifier for this comment */
    id: string;

    /**
     * Creates a new comment attached to a node or workspace.
     * @param parent - NodeSvg or WorkspaceSvg this comment belongs to
     */
    constructor(parent: NodeSvg | WorkspaceSvg) {
        this._parent = parent;
        this._isWorkspaceComment = parent instanceof WorkspaceSvg;
        this._text = "";
        this.relativeCoords = new Coordinates(0, 0); // Coordinates relative to this._parent
        this.id = generateUID("nanoid", {
            alphabet: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0129384756!)@(#*$&%^",
        });
    }

    /**
     * Sets the text of the comment without triggering a redraw.
     * @param value - New text content
     * @returns The updated text
     */
    setTextNoRedraw(value: string): string {
        return (this._text = value);
    }

    /**
     * Retrieves the current text of the comment.
     * @returns The comment text
     */
    getText(): string {
        return this._text;
    }

    /**
     * Sets the text of the comment and triggers a redraw of all comments in the workspace.
     * @param value - New text content
     * @returns The updated text
     */
    setText(value: string): string {
        const res = (this._text = value);
        this.getWorkspace().renderer.clearComments();
        this.getWorkspace().renderer.drawComments();
        return res;
    }

    /**
     * Returns true if this comment is attached to a node.
     */
    isNodeComment(): boolean {
        return !this._isWorkspaceComment;
    }

    /**
     * Returns true if this comment is attached to the workspace.
     */
    isWorkspaceComment(): boolean {
        return this._isWorkspaceComment;
    }

    /**
     * Gets the workspace that owns this comment.
     */
    getWorkspace(): WorkspaceSvg {
        if (this.isWorkspaceComment()) {
            return this._parent as WorkspaceSvg;
        } else {
            return (this._parent as NodeSvg)?.workspace as WorkspaceSvg;
        }
    }
}

export default CommentModel;
export { CommentModel };
