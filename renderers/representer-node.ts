import NodeSvg from '../src/nodesvg';
import WorkspaceSvg from '../src/workspace-svg';
import { Element } from '@svgdotjs/svg.js';
import Renderer, { DrawState } from './renderer';
import RendererConstants from './constants';
import { parseColor } from '../util/parse-color';
import {Color} from '../src/visual-types';

export class RepresenterNode {
	node: NodeSvg;
	state: DrawState;
    renderer: Renderer;
	constructor(node: NodeSvg, svgState: DrawState, renderer: Renderer) {
        this.renderer = renderer;
		this.node = node;
		this.state = svgState;

		// Attach this wrapper to the node for external access
		node.svg = this;
	}
    getConstant(name: keyof RendererConstants) {
        return this.renderer._constants[name];
    }
	/** Move node visually without changing its relativeCoords */
	moveTo(x: number, y: number) {
		this.state.group!.move(x, y);
	}

	/** Scale node visually */
	setScale(scale: number) {
		this.state.group!.scale(scale);
	}

	/** Apply raw transform string */
	applyTransform(transform: string) {
		this.state.group!.attr({ transform });
	}

	/** Access the raw SVG group */
	getRaw() {
		return this.state.group;
	}

	/** Optional: highlight node */
	highlight(color = '#ff0') {
        if (!color || color.length == 0 || typeof color !== 'string') {
            this.highlight(parseColor(this.getConstant('NODE_OUTLINE_COLOR') as Color) as string);
            return;
        }
		this.state.bg!.stroke({ color, width: 2 });
	}
}
