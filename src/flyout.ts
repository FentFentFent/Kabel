import newHeadlessNode from "./headless-node";
import { TblxNodeStruct } from "./inject";
import Toolbox from "./toolbox";
import { parseColor } from "../util/parse-color";
class Flyout {
    container: HTMLDivElement;
    visible: boolean;
    toolbox?: Toolbox;

    constructor(toolbox?: Toolbox) {
        this.toolbox = toolbox as Toolbox;

        this.container = document.createElement('div');
        this.container.className = 'KabelFlyout';

        this.visible = false;

        if (toolbox) {
            toolbox.workspace._wsTop.appendChild(this.container);
        } else {
            document.body.appendChild(this.container);
        }
    }

    fill(nodes: TblxNodeStruct[]) {
        this.container.innerHTML = '';
        nodes.forEach(node => {
            let _headlessNode = newHeadlessNode(node.type as string);
            if (!_headlessNode) return;

            const nodeEl = document.createElement('div');
            nodeEl.className = 'KabelFlyoutNode';
            nodeEl.textContent = _headlessNode.labelText;
            nodeEl.style.backgroundColor = parseColor(_headlessNode.colors.primary);
            nodeEl.style.padding = '4px 8px';
            nodeEl.style.cursor = 'pointer';
            nodeEl.style.fontFamily = this.toolbox!.workspace!.renderer!.constants.FONT_FAMILY;
            nodeEl.style.fontSize = `${this.toolbox!.workspace!.renderer!.constants.FONT_SIZE}px`;
            nodeEl.style.color = parseColor(this.toolbox!.workspace!.renderer!.constants!.FONT_COLOR);
            nodeEl.addEventListener('mousedown', (e) => {
                if (!this.toolbox) return;

                // create ghost node element
                const ghostEl = document.createElement('div');
                ghostEl.className = 'KabelGhostNode';
                ghostEl.textContent = _headlessNode.labelText;
                ghostEl.style.position = 'absolute';
                ghostEl.style.pointerEvents = 'none';
                ghostEl.style.backgroundColor = parseColor(_headlessNode.colors.primary);
                ghostEl.style.padding = '4px 8px';
                ghostEl.style.fontFamily = this.toolbox!.workspace!.renderer!.constants.FONT_FAMILY;
                ghostEl.style.fontSize = `${this.toolbox!.workspace!.renderer!.constants.FONT_SIZE}px`;
                ghostEl.style.color = parseColor(this.toolbox!.workspace!.renderer!.constants!.FONT_COLOR);

                document.body.appendChild(ghostEl);

                const moveGhost = (ev: MouseEvent) => {
                    ghostEl.style.left = ev.clientX + 4 + 'px';
                    ghostEl.style.top = ev.clientY + 4 + 'px';
                };

                const releaseGhost = (ev: MouseEvent) => {
                    document.removeEventListener('mousemove', moveGhost);
                    document.removeEventListener('mouseup', releaseGhost);

                    // check if over workspace svg
                    const svg = this.toolbox!.workspace.svg.node as SVGSVGElement;
                    const rect = svg.getBoundingClientRect();
                    if (
                        ev.clientX >= rect.left &&
                        ev.clientX <= rect.right &&
                        ev.clientY >= rect.top &&
                        ev.clientY <= rect.bottom
                    ) {
                        // convert to svg coordinates
                        const svgX = ev.clientX - rect.left;
                        const svgY = ev.clientY - rect.top;

                        // convert to workspace coordinates
                        const { x: wsX, y: wsY } = this.toolbox!.workspace.screenToWorkspace(svgX, svgY);

                        // spawn node
                        this.toolbox!.workspace.spawnAt(node.type as string, wsX, wsY);
                    }

                    // remove ghost element
                    ghostEl.remove();
                };

                document.addEventListener('mousemove', moveGhost);
                document.addEventListener('mouseup', releaseGhost);

                e.preventDefault();
            });

            this.container.appendChild(nodeEl);
        });
        this.show();
    }


    show() {
        this.container.style.display = 'block';
        this.visible = true;
    }

    hide() {
        this.container.style.display = 'none';
        this.visible = false;
    }

    clear() {
        this.container.innerHTML = '';
    }
}

export default Flyout;
