import { G, Line } from "@svgdotjs/svg.js";
import NodeSvg from "./nodesvg";
import WorkspaceSvg from "./workspace-svg";
import Coordinates from "./coordinates";
import { generateUID } from "../util/uid";


/**
 * CommentModel
 */
class CommentModel {
    _text: string;
    _isWorkspaceComment: boolean;
    _parent: NodeSvg | WorkspaceSvg;
    svgGroup?: G | undefined;
    relativeCoords: Coordinates;
    svgLine?: Line | undefined;
    _tempInputBBox?: {width: number, height: number, textX: number, textY: number};
    id: string;
    constructor(parent: NodeSvg | WorkspaceSvg) {
        this._parent = parent;
        this._isWorkspaceComment = parent instanceof WorkspaceSvg;
        this._text = "";
        this.relativeCoords = new Coordinates(0, 0); // Coordinates relative to this._parent.
        this.id = generateUID('nanoid', { alphabet: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0129384756!)@(#*$&%^' });

    }
    setTextNoRedraw(value: string) {
        return (this._text = value);
    }
    getText() {
        return this._text;
    }
    setText(value: string) {
        const res = (this._text = value);
        this.getWorkspace().renderer.clearComments();
        this.getWorkspace().renderer.drawComments();
        return res;
    }
    isNodeComment() {
        return !this._isWorkspaceComment;
    }
    isWorkspaceComment() {
        return this._isWorkspaceComment;
    }
    getWorkspace(): WorkspaceSvg {
        if (this.isWorkspaceComment()) {
            return this._parent as WorkspaceSvg;
        } else {
            return (this._parent as NodeSvg)?.workspace as WorkspaceSvg;
        }
    }
}

export default CommentModel;