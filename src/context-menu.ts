import WorkspaceController from "../controllers/base";
import unescapeAttr from "../util/unescape-html";
import CommentModel from "./comment";
import Coordinates from "./coordinates";
import ContextOptsRegistry from "./ctx-menu-registry";
import NodeSvg from "./nodesvg";
import Widget from "./widget";
import WorkspaceSvg from "./workspace-svg";

export type Showable = 'node' | 'ws' | 'html' | 'comment';

/**
 * Describes a context menu option.
 */
export interface ContextMenuOpts {
	/** Function executed when the option is clicked */
	click: (target: NodeSvg | WorkspaceSvg | CommentModel | HTMLElement) => void;
	/** Optional hover start callback */
	onHoverStart?: () => void;
	/** Optional hover end callback */
	onHoverEnd?: () => void;
	/** Specifies which target types this option should appear for */
	showFor?: Showable | Showable[];
	/** Text label for the menu option */
	label: string;
	/** Unique ID for the option */
	id: string;
}

/**
 * HTML context menu rendered on workspace right-click.
 */
class ContextMenuHTML {
	workspace: WorkspaceSvg;
	controller: WorkspaceController;
	widget: Widget;
	options: ContextMenuOpts[];

	/**
	 * Create a new context menu for a workspace.
	 * @param workspace - Workspace to attach the context menu to
	 */
	constructor(workspace: WorkspaceSvg) {
		this.workspace = workspace;
		this.controller = this.workspace.controller;
		this.widget = new Widget(this.workspace, {
			coords: new Coordinates(0, 0),
			name: 'k_contextmenu',
			className: 'KabelContextMenu'
		});

		// Override show/hide methods to manipulate CSS
		this.widget.show = () => {
			this.widget.container.classList.add('show');
			this.widget.container.style.display = 'flex';
			this.widget.visible = true;
		};
		this.widget.hide = () => {
			this.widget.container.classList.remove('show');
			this.widget.container.style.display = 'none';
			this.widget.visible = false;
		};
		this.widget.container.style.removeProperty('height');
		this.widget.container.style.removeProperty('width');

		this.widget.hide();
		this.options = ContextOptsRegistry;
		this.initListeners();
	}

	/**
	 * Renders context menu options for a given target.
	 * @param target - The object the context menu is for
	 */
	renderOptions(target: NodeSvg | WorkspaceSvg | HTMLElement | CommentModel | null) {
		this.widget.container.innerHTML = '';

		const filteredOptions = this.options.filter(opt => {
			if (!target) return false;
			const showFor = Array.isArray(opt.showFor) ? opt.showFor : [opt.showFor];

			if (target instanceof NodeSvg && showFor.includes('node')) return true;
			if (target instanceof WorkspaceSvg && showFor.includes('ws')) return true;
			if (target instanceof HTMLElement && !(target instanceof SVGSVGElement) && showFor.includes('html')) return true;
			if (target instanceof CommentModel && showFor.includes('comment')) return true;
			return false;
		});

		filteredOptions.forEach((opt, i) => {
			const el = document.createElement('div');
			el.className = 'KabelContextOption';
			el.textContent = opt.label || 'Option ' + i;

			el.addEventListener('click', () => {
				if (target) opt.click(target);
				this.hide();
			});
			if (opt.onHoverStart) el.addEventListener('mouseenter', () => opt.onHoverStart?.());
			if (opt.onHoverEnd) el.addEventListener('mouseleave', () => opt.onHoverEnd?.());

			this.widget.container.appendChild(el);
		});
	}

	/**
	 * Initializes event listeners for showing/hiding the menu.
	 */
	initListeners() {
		this.workspace.svg.node.addEventListener('contextmenu', e => {
			e.preventDefault();
			const mouseX = e.clientX;
			const mouseY = e.clientY;

			this.widget.setCoords(new Coordinates(mouseX, mouseY));
			this.renderOptions(this.target);
			this.widget.show();
		});

		document.addEventListener('mousedown', e => {
			if (!this.widget.container.contains(e.target as Node)) {
				this.hide();
			}
		});
	}

	/** Hides the context menu */
	hide() {
		this.widget.hide();
	}

	/** Returns the current mouse position in workspace coordinates */
	get mousePos(): { x: number, y: number } {
		return this.controller.mousePos;
	}

	/**
	 * Returns the target element under the mouse for context menu.
	 */
	get target(): NodeSvg | WorkspaceSvg | HTMLElement | CommentModel | null {
		let el = document.elementFromPoint(this.mousePos.x, this.mousePos.y) as HTMLElement | null;

		if ((el as unknown as SVGSVGElement) === this.workspace.svg.node) return this.workspace;

		while (el && el !== document.body) {
			if (el.tagName.toLowerCase() === 'g' && el.hasAttribute('data-node-id')) {
				const nodeId = unescapeAttr(el.getAttribute('data-node-id') as string);
				const node = this.workspace.getNode(nodeId);
				if (node) return node;
			}
			if (el.tagName.toLowerCase() === 'g' && el.hasAttribute('comment-data')) {
				const dta = JSON.parse(el.getAttribute('comment-data') as string);
				if (!dta.id && !dta.isws) continue;
				if (dta.isws) {
					for (let comment of this.workspace._commentDB) {
						if (comment.id === dta.id) return comment;
					}
				} else {
					for (let [_, node] of this.workspace._nodeDB) {
						if (node.comment && node.comment.id == dta.id) return node.comment;
					}
				}
			}
			el = el.parentElement;
		}

		return document.elementFromPoint(this.mousePos.x, this.mousePos.y) as HTMLElement | null;
	}
}

export default ContextMenuHTML;
