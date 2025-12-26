import Renderer from '../renderers/renderer';
import WorkspaceSvg from '../src/workspace-svg';
import NodeSvg from '../src/nodesvg';
import CommentModel from '../src/comment';
import { Element, SVG, Svg } from '@svgdotjs/svg.js';
import eventer from '../util/eventer';

class CommentRenderer {
	static get NAME() { return 'cr_atlas'; }
	static get COMMENT_G_TAG() { return 'KabelCommentGroup'; }
	static get COMMENT_LINE_TAG() { return 'KabelCommentLine'; }
	static get COMMENT_TEXT_EL() { return 'KabelCommentText'; }
	static get COMMENT_DRAG_EL() { return 'KabelCommentDragHandle'; }
	static get RENDERER_TAG_EL() { return 'KabelCommentElTag'; }

	workspace: WorkspaceSvg;

	constructor(workspace: WorkspaceSvg) {
		this.workspace = workspace;
	}

	encodeForSvg(s: string) {
		return s.replace(/ /g, "\u00A0");
	}

	ensureTspansPreserve(node: HTMLElement) {
		Array.from(node.childNodes).forEach((child) => {
			if (child.nodeType === 1) {
				(child as HTMLElement).setAttribute("xml:space", "preserve");
			}
		});
	}

	measureTextBbox(textEl: Element) {
		return textEl.bbox();
	}

	drawComment(comment: CommentModel) {
		const svg = this.getSvg();
		this._removeExistingElements(comment);

		const g = svg.group().addClass(CommentRenderer.COMMENT_G_TAG);
		g.attr({
			'comment-data': JSON.stringify({
				id: comment.id,
				isws: comment.isWorkspaceComment()
			})
		});
		comment.svgGroup = g;

		const padding = 4;
		const handleRadius = 6;
		const textOffsetX = padding + handleRadius * 2 + 4;

		const displayEncoded = this.encodeForSvg(comment.getText());
		const textEl = this._createTextElement(g, displayEncoded, textOffsetX, padding);

		const bbox = this.measureTextBbox(textEl);

		const rect = this._createBackgroundRect(g, bbox, padding, handleRadius);
		const dragHandle = this._createDragHandle(g, bbox, padding, handleRadius);

		this._addEventer(rect, dragHandle, comment, textEl);

		const { screenPos, zoom } = this._computeScreenPosition(comment);
		g.attr({ transform: `translate(${screenPos.x}, ${screenPos.y}) scale(${zoom})` });

		if (comment._parent instanceof NodeSvg && comment._parent.svgGroup) {
			this._drawLineToNode(comment, padding);
		}
	}

	refreshCommentTransforms() {
		for (const comment of [
			...this.workspace.getComments(),
			...Array.from(this.workspace._nodeDB.values())
				.map(n => n.getComment())
				.filter(c => !!c) as CommentModel[]
		]) {
			if (!comment.svgGroup) continue;

			const { screenPos, zoom } = this._computeScreenPosition(comment);
			comment.svgGroup.attr({ transform: `translate(${screenPos.x}, ${screenPos.y}) scale(${zoom})` });

			if (comment.svgLine) {
				comment.svgLine.remove();
				comment.svgLine = undefined;
			}

			if (comment._parent instanceof NodeSvg) {
				this._drawLineToNode(comment, 4);
			}
		}
	}

	private _removeExistingElements(comment: CommentModel) {
		if (comment.svgGroup) comment.svgGroup.remove();
		if (comment.svgLine) comment.svgLine.remove();
	}

	private _createTextElement(parent: Element, text: string, x: number, y: number) {
        //@ts-ignore
		const textEl = parent.text(text)
			.font({ family: 'Arial', size: 12 })
			.fill('#000')
			.move(x, y)
			.addClass(CommentRenderer.COMMENT_TEXT_EL);

		textEl.node.style.userSelect = 'none';
		// @ts-ignore
		textEl.node.style!.webkitUserSelect = 'none';
		// @ts-ignore
		textEl.node.style!.msUserSelect = 'none';
		// @ts-ignore
		textEl.node.style!.MozUserSelect = 'none';
		return textEl;
	}

	private _createBackgroundRect(parent: Element, bbox: any, padding: number, handleRadius: number) {
        //@ts-ignore
		return parent.rect(bbox.width + padding * 2 + handleRadius * 2 + 4, bbox.height + padding * 2)
			.fill('#ffffcc')
			.stroke({ color: '#cccc99', width: 1 })
			.radius(4)
			.back();
	}

	private _createDragHandle(parent: Element, bbox: any, padding: number, handleRadius: number) {
        //@ts-ignore
		return parent.circle(handleRadius * 2)
			.fill('#adad7d')
			.move(padding, padding + (bbox.height / 2) - handleRadius)
			.addClass(CommentRenderer.COMMENT_DRAG_EL);
	}

	private _addEventer(rect: Element, dragHandle: Element, comment: CommentModel, textEl: Element) {
		eventer.addElement(dragHandle, 'k_draghandle', { comment })
			.tagElement(dragHandle, CommentRenderer.RENDERER_TAG_EL);
		eventer.addElement(rect, "k_commentinp", { comment, text: textEl, renderer: this })
			.tagElement(rect, CommentRenderer.RENDERER_TAG_EL);
	}

	private _computeScreenPosition(comment: CommentModel) {
		let workspaceX = comment.relativeCoords.x;
		let workspaceY = comment.relativeCoords.y;

		if (comment._parent instanceof NodeSvg) {
			const nodePos = comment._parent.relativeCoords;
			workspaceX += nodePos.x;
			workspaceY += nodePos.y;
		}

		const screenPos = this.workspace.workspaceToScreen(workspaceX, workspaceY);
		const zoom = this.workspace.getZoom();
		return { screenPos, zoom };
	}

	private _drawLineToNode(comment: CommentModel, padding: number) {
		if (!comment || !(comment._parent instanceof NodeSvg) || !comment.svgGroup) return;
		const svg = this.getSvg();
		const ws = this.workspace;

		if (comment.svgLine) comment.svgLine.remove();

		const nodeWSPos = comment._parent.relativeCoords;
		const nodeBBox = comment._parent.svgGroup!.bbox();
		const nodeTopCenter = ws.workspaceToScreen(
			nodeWSPos.x + nodeBBox.width / 2,
			nodeWSPos.y
		);

		const parentWSPos = comment._parent.relativeCoords;
		const commentRelPos = comment.relativeCoords;
		const commentAbsX = parentWSPos.x + commentRelPos.x;
		const commentAbsY = parentWSPos.y + commentRelPos.y;
		const commentBBox = comment.svgGroup!.bbox();
		const commentTopCenter = ws.workspaceToScreen(
			commentAbsX + (commentBBox.width + padding * 2) / 2,
			commentAbsY
		);

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
		eventer.destroyByTag(CommentRenderer.RENDERER_TAG_EL);

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
    getWs(): WorkspaceSvg {
        return this.workspace;
    }
}

export default CommentRenderer;
