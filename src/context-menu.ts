import WorkspaceController from "../controllers/base";
import unescapeAttr from "../util/unescape-html";
import Coordinates from "./coordinates";
import ContextOptsRegistry from "./ctx-menu-registry";
import NodeSvg from "./nodesvg";
import Widget from "./widget";
import WorkspaceSvg from "./workspace-svg";

export type Showable = 'node' | 'ws' | 'html';
export interface ContextMenuOpts {
    click: (target: NodeSvg | WorkspaceSvg | HTMLElement) => void;
    onHoverStart?: () => void;
    onHoverEnd?: () => void;
    showFor?: Showable | Showable[]
    label: string;
    id: string;
}
class ContextMenuHTML {
    workspace: WorkspaceSvg;
    controller: WorkspaceController;
    widget: Widget;
    options: ContextMenuOpts[];

    constructor(workspace: WorkspaceSvg) {
        this.workspace = workspace;
        this.controller = this.workspace.controller;
        this.widget = new Widget(this.workspace, {
            coords: new Coordinates(0, 0),
            name: 'k_contextmenu',
            className: 'KabelContextMenu'
        });
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

    renderOptions(target: NodeSvg | WorkspaceSvg | HTMLElement | null) {
        // Clear any previous options
        this.widget.container.innerHTML = '';

        // Filter options based on showFor
        const filteredOptions = this.options.filter(opt => {
            if (!target) return false;
            const showFor = Array.isArray(opt.showFor) ? opt.showFor : [opt.showFor];

            if (target instanceof NodeSvg && showFor.includes('node')) return true;
            if (target instanceof WorkspaceSvg && showFor.includes('ws')) return true;
            if (target instanceof HTMLElement && !(target instanceof SVGSVGElement) && showFor.includes('html')) return true;

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

    initListeners() {
        // Show the menu on right-click
        this.workspace.svg.node.addEventListener('contextmenu', e => {
            e.preventDefault();
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            this.widget.setCoords(new Coordinates(mouseX, mouseY));
            this.renderOptions(this.target);
            this.widget.show();
        });

        // Hide menu on click elsewhere
        document.addEventListener('mousedown', e => {
            if (!this.widget.container.contains(e.target as Node)) {
                this.hide();
            }
        });
    }

    hide() {
        this.widget.hide();
    }

    get mousePos(): { x: number, y: number } {
        return this.controller.mousePos;
    }

    get target(): NodeSvg | WorkspaceSvg | HTMLElement | null {
        let el = document.elementFromPoint(this.mousePos.x, this.mousePos.y) as HTMLElement | null;

        if ((el as unknown as SVGSVGElement) === this.workspace.svg.node) return this.workspace;

        while (el && el !== document.body) {
            // Node check
            if (el.tagName.toLowerCase() === 'g' && el.hasAttribute('data-node-id')) {
                const nodeId = unescapeAttr(el.getAttribute('data-node-id') as string);
                const node = this.workspace.getNode(nodeId);
                if (node) return node;
            }
            el = el.parentElement;
        }

        // fallback
        return document.elementFromPoint(this.mousePos.x, this.mousePos.y) as HTMLElement | null;
    }
}

export default ContextMenuHTML;