import { Element } from '@svgdotjs/svg.js';
import NodeSvg from '../src/nodesvg';
import eventer from '../util/eventer';
import type { EventSetupFn } from '../util/eventer';
import WorkspaceSvg from '../src/workspace-svg';
import userState from '../util/user-state';
import CommentModel from '../src/comment';

/** The drag handle for comments */
function initDraggable(element: Element, args: Record<string, any>): () => void {
    const comment = args.comment as CommentModel;
    if (!comment) return () => { };

    let startX = 0;
    let startY = 0;
    let startRelX = 0;
    let startRelY = 0;

    function onPointerDown(ev: PointerEvent) {
        ev.preventDefault();

        const ws = comment.getWorkspace();
        const rel = comment.relativeCoords;

        // Capture offset from pointer to comment in workspace coords
        const pointerWS = ws.screenToWorkspace(ev.clientX, ev.clientY);
        startRelX = rel.x - pointerWS.x;
        startRelY = rel.y - pointerWS.y;

        document.addEventListener('pointermove', onPointerMove);
        document.addEventListener('pointerup', onPointerUp);
    }

    function onPointerMove(ev: PointerEvent) {
        const ws = comment.getWorkspace();

        // Map pointer to workspace
        const pointerWS = ws.screenToWorkspace(ev.clientX, ev.clientY);

        // Add initial offset
        comment.relativeCoords.set(pointerWS.x + startRelX, pointerWS.y + startRelY);

        ws.refreshComments();
    }



    function onPointerUp() {
        document.removeEventListener('pointermove', onPointerMove);
        document.removeEventListener('pointerup', onPointerUp);
    }

    element.node.addEventListener('pointerdown', onPointerDown);

    // Cleanup function
    return () => {
        element.node.removeEventListener('pointerdown', onPointerDown);
    };
}

eventer.registerEvent('k_draghandle', initDraggable as EventSetupFn);
