import newHeadlessNode from "./headless-node";
import { TblxNodeStruct } from "./inject";
import Toolbox from "./toolbox";
import { parseColor } from "../util/parse-color";
import { Color } from "./visual-types";

/**
 * Represents a flyout menu for a toolbox in Kabel.
 * Displays a list of nodes that can be dragged into a workspace.
 */
class Flyout {
	container: HTMLDivElement;
	visible: boolean;
	toolbox?: Toolbox|undefined;

	constructor(toolbox?: Toolbox) {
		this.toolbox = toolbox;

		this.container = document.createElement("div");
		this.container.className = "KabelFlyout";

		this.visible = false;

		if (toolbox) {
			toolbox.workspace._wsTop.appendChild(this.container);
		} else {
			document.body.appendChild(this.container);
		}
	}

	/**
	 * Populates the flyout with a list of nodes.
	 */
	fill(nodes: TblxNodeStruct[]) {
		this.clear();
		nodes.forEach(node => {
			const headlessNode = newHeadlessNode(node.type as string);
			if (!headlessNode) return;

			const nodeEl = this.createNodeElement(headlessNode);
			this.container.appendChild(nodeEl);
		});

		this.show();
	}

	/**
	 * Creates a DOM element for a node with event listeners attached.
	 */
	private createNodeElement(headlessNode: any): HTMLDivElement {
		const nodeEl = document.createElement("div");
		nodeEl.className = "KabelFlyoutNode";
		nodeEl.textContent = headlessNode.labelText;

		this.applyNodeStyles(nodeEl, headlessNode.colors.primary);

		nodeEl.addEventListener("mousedown", e => this.onNodeMouseDown(e, headlessNode));
		return nodeEl;
	}

	/**
	 * Applies consistent styling to a node element.
	 */
	private applyNodeStyles(el: HTMLElement, bgColor: Color) {
		el.style.backgroundColor = parseColor(bgColor);
		el.style.padding = "4px 8px";
		el.style.cursor = "pointer";

		if (this.toolbox?.workspace?.renderer?.constants) {
			const c = this.toolbox.workspace.renderer.constants;
			el.style.fontFamily = c.FONT_FAMILY;
			el.style.fontSize = `${c.FONT_SIZE}px`;
			el.style.color = parseColor(c.FONT_COLOR);
		}
	}

	/**
	 * Handles starting a drag operation for a node.
	 */
	private onNodeMouseDown(e: MouseEvent, headlessNode: any) {
		if (!this.toolbox) return;

		const ghostEl = this.createGhostNode(headlessNode);
		document.body.appendChild(ghostEl);

		const moveGhost = (ev: MouseEvent) => {
			ghostEl.style.left = ev.clientX + 4 + "px";
			ghostEl.style.top = ev.clientY + 4 + "px";
		};

		const releaseGhost = (ev: MouseEvent) => {
			document.removeEventListener("mousemove", moveGhost);
			document.removeEventListener("mouseup", releaseGhost);

			this.dropNode(ev, headlessNode);

			ghostEl.remove();
		};

		document.addEventListener("mousemove", moveGhost);
		document.addEventListener("mouseup", releaseGhost);

		e.preventDefault();
	}

	/**
	 * Creates a ghost element that follows the mouse during drag.
	 */
	private createGhostNode(headlessNode: any): HTMLDivElement {
		const ghostEl = document.createElement("div");
		ghostEl.className = "KabelGhostNode";
		ghostEl.textContent = headlessNode.labelText;
		ghostEl.style.position = "absolute";
		ghostEl.style.pointerEvents = "none";

		this.applyNodeStyles(ghostEl, headlessNode.colors.primary);
		return ghostEl;
	}

	/**
	 * Handles dropping a node into the workspace if the mouse is over it.
	 */
	private dropNode(ev: MouseEvent, node: TblxNodeStruct) {
		if (!this.toolbox) return;

		const svg = this.toolbox.workspace.svg.node as SVGSVGElement;
		const rect = svg.getBoundingClientRect();

		if (
			ev.clientX >= rect.left &&
			ev.clientX <= rect.right &&
			ev.clientY >= rect.top &&
			ev.clientY <= rect.bottom
		) {
			const { x: wsX, y: wsY } = this.toolbox.workspace.screenToWorkspace(
				ev.clientX - rect.left,
				ev.clientY - rect.top
			);

			const nodews = this.toolbox.workspace.spawnAt(node.type as string, wsX, wsY);
			if (nodews) {
				for (let argName in node.arguments) {
					nodews.setFieldValue(argName, node.arguments[argName]);
				}
				this.toolbox.workspace.drawNode(nodews.id);
			}
		}
	}

	show() {
		this.container.style.display = "block";
		this.visible = true;
	}

	hide() {
		this.container.style.display = "none";
		this.visible = false;
	}

	clear() {
		this.container.innerHTML = "";
	}
}

export default Flyout;
