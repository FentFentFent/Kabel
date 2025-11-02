import Renderer from '../renderers/renderer';
import WorkspaceSvg from '../src/workspace-svg';
import NodeSvg from '../src/nodesvg';
import CommentModel from '../src/comment';
import { Element, SVG, Svg } from '@svgdotjs/svg.js';
import eventer from '../util/eventer';

class CommentRenderer {
    static get NAME() {
        return 'cr_atlas';
    }
    static get COMMENT_G_TAG() {
        return 'KabelCommentGroup';
    }
    static get COMMENT_LINE_TAG() {
        return 'KabelCommentLine';
    }
    static get COMMENT_TEXT_EL() {
        return 'KabelCommentText';
    }
    static get COMMENT_DRAG_EL() {
        return 'KabelCommentDragHandle';
    }
    static get RENDERER_TAG_EL() {
        return 'KabelCommentElTag'
    }
    workspace: WorkspaceSvg;

    constructor(workspace: WorkspaceSvg) {
        this.workspace = workspace;
    }
    encodeForSvg(s: string) {
        // keep newline chars as-is; replace spaces with NBSP
        return s.replace(/ /g, "\u00A0");
    }

    ensureTspansPreserve(node: HTMLElement) {
        // set xml:space on all child elements (tspans)
        Array.from(node.childNodes).forEach((child) => {
            if (child.nodeType === 1) {
                (child as HTMLElement).setAttribute("xml:space", "preserve");
            }
        });
    }
    drawComment(comment: CommentModel) {
        const svg = this.getSvg();

        if (comment.svgGroup) comment.svgGroup.remove();
        if (comment.svgLine) comment.svgLine.remove();

        const g = svg.group().addClass(CommentRenderer.COMMENT_G_TAG);
        g.attr({
            'comment-data': JSON.stringify({
                id: comment.id,
                isws: comment.isWorkspaceComment()
            })
        })
        comment.svgGroup = g;

        const padding = 4;
        const handleRadius = 6;
        const textOffsetX = padding + handleRadius * 2 + 4; // space for circle + small gap
        const displayEncoded = this.encodeForSvg(comment.getText());
        const textEl = g.text(displayEncoded)
            .font({ family: 'Arial', size: 12 })
            .fill('#000')
            .move(textOffsetX, padding)
            .addClass(CommentRenderer.COMMENT_TEXT_EL);
        textEl.node.style.userSelect = 'none';          // standard
        // @ts-ignore
        textEl.node.style!.webkitUserSelect = 'none';    // Safari/Chrome
        // @ts-ignore
        textEl.node.style!.msUserSelect = 'none';        // IE/Edge
        // @ts-ignore
        textEl.node.style!.MozUserSelect = 'none';       // Firefox
        const bbox = textEl.bbox();

        // Background rectangle
        const rect = g.rect(bbox.width + padding * 2 + handleRadius * 2 + 4, bbox.height + padding * 2)
            .fill('#ffffcc')
            .stroke({ color: '#cccc99', width: 1 })
            .radius(4)
            .back();

        // Drag handle circle (just visual for now)
        const dragHandle = g.circle(handleRadius * 2)
            .fill('#adad7d')
            .move(padding, padding + (bbox.height / 2) - handleRadius) // vertically centered with text
            .addClass(CommentRenderer.COMMENT_DRAG_EL);

        eventer.addElement(dragHandle, 'k_draghandle', {
            comment
        }).tagElement(dragHandle, CommentRenderer.RENDERER_TAG_EL)
        eventer.addElement(rect, "k_commentinp", {
            comment,
            text: textEl
        }).tagElement(rect, CommentRenderer.RENDERER_TAG_EL)

        let workspaceX = comment.relativeCoords.x;
        let workspaceY = comment.relativeCoords.y;

        if (comment._parent instanceof NodeSvg) {
            const nodePos = comment._parent.relativeCoords;
            workspaceX += nodePos.x;
            workspaceY += nodePos.y;
        }

        const screenPos = this.workspace.workspaceToScreen(workspaceX, workspaceY);
        const zoom = this.workspace.getZoom();
        g.attr({ transform: `translate(${screenPos.x}, ${screenPos.y}) scale(${zoom})` });


        if (comment._parent instanceof NodeSvg && comment._parent.svgGroup) {
            this._drawLineToNode(comment, padding);
        }
    }

    refreshCommentTransforms() {
        const svg = this.getSvg();

        for (const comment of [
            ...this.workspace.getComments(),
            ...Array.from(this.workspace._nodeDB.values())
                .map(n => n.getComment())
                .filter(c => !!c) as CommentModel[]
        ]) {
            if (!comment.svgGroup) continue;

            let workspaceX = comment.relativeCoords.x;
            let workspaceY = comment.relativeCoords.y;

            if (comment._parent instanceof NodeSvg) {
                const nodePos = comment._parent.relativeCoords;
                workspaceX += nodePos.x;
                workspaceY += nodePos.y;
            }

            const screenPos = this.workspace.workspaceToScreen(workspaceX, workspaceY);

            // Move comment group
            const zoom = this.workspace.getZoom();
            comment.svgGroup.attr({ transform: `translate(${screenPos.x}, ${screenPos.y}) scale(${zoom})` });



            // Remove line if it exists
            if (comment.svgLine) {
                comment.svgLine.remove();
                comment.svgLine = undefined;
            }
            const textEl = comment.svgGroup.findOne(`.${CommentRenderer.COMMENT_TEXT_EL}`);
            // Only redraw line if parent is a NodeSvg
            if (comment._parent instanceof NodeSvg) {
                const bbox = textEl ? (textEl as Element).bbox() : { width: 0, height: 0 };
                this._drawLineToNode(comment, 4);
            }

        }
    }


    private _drawLineToNode(comment: CommentModel, padding: number) {
        if (!comment || !(comment._parent instanceof NodeSvg) || !comment.svgGroup) return;
        const svg = this.getSvg();
        const ws = this.workspace;

        // Remove old line
        if (comment.svgLine) comment.svgLine.remove();

        // --- Node top-center in screen coordinates ---
        const nodeWSPos = comment._parent.relativeCoords;
        const nodeBBox = comment._parent.svgGroup!.bbox();
        const nodeTopCenter = ws.workspaceToScreen(
            nodeWSPos.x + nodeBBox.width / 2,
            nodeWSPos.y
        );

        // --- Comment top-center in screen coordinates ---
        const parentWSPos = comment._parent.relativeCoords; // parent position
        const commentRelPos = comment.relativeCoords;       // comment relative to parent
        const commentAbsX = parentWSPos.x + commentRelPos.x;
        const commentAbsY = parentWSPos.y + commentRelPos.y;
        const commentBBox = comment.svgGroup!.bbox();
        const commentTopCenter = ws.workspaceToScreen(
            commentAbsX + (commentBBox.width + padding * 2) / 2,
            commentAbsY
        );

        // Draw line
        comment.svgLine = svg.line(
            nodeTopCenter.x, nodeTopCenter.y,
            commentTopCenter.x, commentTopCenter.y
        )
            .stroke({ color: '#888', width: 1, dasharray: '3,2' })
            .addClass(CommentRenderer.COMMENT_LINE_TAG)
            .back();
    }


    clearAllComments() {
        const svg = this.getSvg();
        svg.find(`.${CommentRenderer.COMMENT_G_TAG}`).forEach(el => el.remove());
        svg.find(`.${CommentRenderer.COMMENT_LINE_TAG}`).forEach(el => el.remove());
        eventer.destroyByTag(CommentRenderer.RENDERER_TAG_EL)
        for (let [_, node] of this.workspace._nodeDB) {
            const comment = node.getComment();
            if (comment) comment.svgGroup = undefined;
        }
        for (const comment of this.workspace.getComments()) {
            comment.svgGroup = undefined;
        }
    }
    clearCommentLines() {
        const svg = this.getSvg();
        svg.find(`.${CommentRenderer.COMMENT_LINE_TAG}`).forEach(el => el.remove());
    }
    drawAllComments() {
        for (const comment of this.workspace.getComments()) this.drawComment(comment);
        for (let [_, node] of this.workspace._nodeDB) {
            const comment = node.getComment();
            if (comment) this.drawComment(comment);
        }
    }




    getSvg(): Svg {
        return this.workspace.svg;
    }
}

export default CommentRenderer;
