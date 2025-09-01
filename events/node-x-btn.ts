import { Element, G } from '@svgdotjs/svg.js';
import NodeSvg from '../src/nodesvg';
import eventer, { EventSetupFn } from '../util/eventer';
import WorkspaceSvg from '../src/workspace-svg';

function initXButton(element: Element, args: Record<string, any>): () => void {
	const xBtnGroup = element as G;
	const ws: WorkspaceSvg = args.workspace;

	// click handler
	const onClick = () => {
		ws.removeNode(args.node);
	};

	// attach
	xBtnGroup.on('click', onClick);

	// return cleanup function
	return () => {
		xBtnGroup.off('click', onClick);
	};
}

// register as Kabel event
eventer.registerEvent('k_closenode', initXButton as EventSetupFn);
