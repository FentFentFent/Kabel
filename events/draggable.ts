import { Element } from '@svgdotjs/svg.js';
import NodeSvg from '../src/nodesvg';
import eventer from '../util/eventer';
import type { EventSetupFn } from '../util/eventer';
import WorkspaceSvg from '../src/workspace-svg';
import userState from '../util/user-state';

const draggableStore: Record<string, { x: number, y: number }> = {};

function initDraggable(element: Element, args: Record<string, any>): () => void {
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    // fallback to element itself if no drag handle is given
    const dragTarget: Element = args.dragel ?? element;

    // Restore position if previously stored (type 3)
    if (args.type === 3 && args.id && draggableStore[args.id]) {
        const pos = draggableStore[args.id];
        if (pos) element.move(pos.x, pos.y);
    }

    function onMouseDown(e: MouseEvent) {
        if (args.type === 2 && args.node) {
            const ws = args.node.workspace;
            if (!ws) return;

            const start = ws.screenToWorkspace(e.clientX, e.clientY);
            const nodePos = args.node.relativeCoords;

            offsetX = start.x - nodePos.x;
            offsetY = start.y - nodePos.y;
        } else {
            const bbox = element.bbox();
            offsetX = e.clientX - bbox.x;
            offsetY = e.clientY - bbox.y;
        }

        isDragging = false;

        // Mark user as dragging
        userState.setState('dragging');

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);

        if (args.type === 1 && args.ondrag) args.ondrag(e);
    }


    function onMouseMove(e: MouseEvent) {
        if (!isDragging) {
            const dx = e.movementX || 0;
            const dy = e.movementY || 0;
            if (Math.abs(dx) > 2 || Math.abs(dy) > 2) isDragging = true;
        }
        if (!isDragging) return;

        if (args.type === 2 && args.node && args.node instanceof NodeSvg) {
            const ws: WorkspaceSvg = args.node.workspace as WorkspaceSvg;
            if (!ws) return;

            // Compute new workspace coordinates
            const mouseWS = ws.screenToWorkspace(e.clientX, e.clientY);
            const newX = mouseWS.x - offsetX;
            const newY = mouseWS.y - offsetY;

            args.node.relativeCoords.set(newX, newY);
            ws.refresh();
            // Move node visually
            const screenPos = ws.workspaceToScreen(newX, newY);
            element.attr({ transform: `translate(${screenPos.x}, ${screenPos.y})` });

            args.node.emit('NODE_DRAG', null);
        } else if (args.type === 1 && args.onmove) {
            const newX = e.clientX - offsetX;
            const newY = e.clientY - offsetY;
            element.move(newX, newY);
            args.onmove({ x: newX, y: newY });
        } else if (args.type === 3 && args.id) {
            const newX = e.clientX - offsetX;
            const newY = e.clientY - offsetY;
            element.move(newX, newY);
            draggableStore[args.id] = { x: newX, y: newY };
        }
    }

    function onMouseUp(e: MouseEvent) {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);

        // Remove dragging state
        userState.removeState('dragging');

        if (args.type === 1 && args.enddrag) args.enddrag(e);
        isDragging = false;
    }

    dragTarget.node.addEventListener('mousedown', onMouseDown);

    // cleanup
    return () => {
        dragTarget.node.removeEventListener('mousedown', onMouseDown);
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    };
}

eventer.registerEvent('k_draggable', initDraggable as EventSetupFn);
