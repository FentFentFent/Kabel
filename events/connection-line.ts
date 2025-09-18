import { Element, Svg } from '@svgdotjs/svg.js';
import NodeSvg from '../src/nodesvg';
import eventer from '../util/eventer';
import type { EventSetupFn } from '../util/eventer';
import WorkspaceSvg from '../src/workspace-svg';
import userState from '../util/user-state';
import Renderer, { ConnectorToFrom, DrawState } from '../renderers/renderer';

function initConnectionLine(element: Element, args: Record<string, any>): () => void {
    // click destroys the line
    const handleClick = () => {
        args.fromConn.disconnectTo();
        args.toConn.disconnectFrom();
        element.remove();
        xMark.remove();
        const remove: ConnectorToFrom[] = [];
        for (let state of args.renderer._drawStates as DrawState[]) {
            for (let pair of state.pendingConnections) {
                if (pair.from == args.fromConn && pair.to == args.toConn) {
                    remove.push(pair);
                }
                if (pair.from = args.toConn && pair.to == args.fromConn) {
                    remove.push(pair);
                }
            }
            state.pendingConnections = state.pendingConnections.filter(e => !remove.includes(e));
        }
    };

    // create X element
    const bbox = element.bbox();
    const midX = bbox.x + bbox.width / 2;
    const midY = bbox.y + bbox.height / 2;
    const xMark = (element.parent()! as Svg).text('X').font({
        family: 'Arial, Helvetica, sans-serif',
        size: 46,
        weight: 'bold',
        anchor: 'middle',
        leading: '1em'
    })
        .addClass((args.renderer.constructor as typeof Renderer).LINE_X_MARK_TAG)
        .center(midX, midY)
        .fill('#fff')           // white fill
        .stroke({ color: '#000', width: 2 })  // black outline
        .hide();

    xMark.on('click', handleClick)
    xMark.node.style.userSelect = 'none';
    // show X on hover
    element.on('mouseover', () => xMark.show());
    element.on('mouseout', () => xMark.hide());

    // attach click event
    element.on('click', handleClick);

    // cleanup function
    return () => {
        element.off('click', handleClick);
        element.off('mouseover');
        element.off('mouseout');
        xMark.off('click', handleClick);
        xMark.remove();
    };
}

eventer.registerEvent('k_connline', initConnectionLine as EventSetupFn);
