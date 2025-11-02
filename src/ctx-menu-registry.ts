import CommentModel from "./comment";
import { ContextMenuOpts, Showable } from "./context-menu";
import NodeSvg from "./nodesvg";
import WorkspaceSvg from "./workspace-svg";

/** Registry for all context menu options */
const ContextOptsRegistry: ContextMenuOpts[] = [];

/**
 * Global context menu manager
 */
const ContextMenu = {
    /**
     * Register a new context menu option
     * @param id - Unique identifier for the option
     * @param option - Configuration for the context menu item
     */
    registerOption(id: string, option: {
        /** Callback when the option is clicked */
        click: (target: NodeSvg | WorkspaceSvg | HTMLElement | CommentModel) => void;
        /** Callback when hovering starts */
        onHoverStart?: () => void;
        /** Callback when hovering ends */
        onHoverEnd?: () => void;
        /** Label text for the menu item */
        label: string;
        /** Target type(s) the option should appear for */
        showFor: Showable | Showable[];
    }) {
        const opt = {
            id,
            click: option.click,
            label: option.label,
            onHoverStart: option.onHoverStart || (() => { }),
            onHoverEnd: option.onHoverEnd || (() => { }),
            showFor: option.showFor || undefined
        };
        ContextOptsRegistry.push(opt);
    },

    /**
     * Unregister an existing context menu option by ID
     * @param id - ID of the option to remove
     */
    unregisterOption(id: string) {
        const index = ContextOptsRegistry.findIndex(opt => opt.id === id);
        if (index >= 0) ContextOptsRegistry.splice(index, 1);
    }
};

// ----- Default options -----

ContextMenu.registerOption('k_delete', {
    showFor: 'node',
    label: 'Delete',
    click: (t) => {
        const target = t as NodeSvg;
        if (!target.workspace) return;
        target.workspace.removeNode(target);
    }
});

ContextMenu.registerOption('k_deleteall', {
    showFor: 'ws',
    label: 'Delete all',
    click: (t) => {
        const target = t as WorkspaceSvg;
        const isSure = window.confirm(`Are you sure you want to delete ${Array.from(target._nodeDB.keys()).length} nodes?`);
        if (!isSure) return;
        for (let [id, _] of target._nodeDB) {
            target.removeNodeById(id);
        }
    }
});

ContextMenu.registerOption('k_addcomment', {
    showFor: ['ws', 'node'],
    label: 'Add Comment',
    click: (t) => {
        const target = t;
        if (target instanceof NodeSvg) {
            target.addComment();
            target.setCommentText('Comment!');
        } else if (target instanceof WorkspaceSvg) {
            const model = target.addComment();
            const pos = target.screenToWorkspace(target._ctxMenu.widget.coords.x, target._ctxMenu.widget.coords.y);
            model.relativeCoords.set(pos.x, pos.y);
            model.setText('Comment!');
        }
    }
});

ContextMenu.registerOption('k_deletecomment', {
    showFor: 'comment',
    label: 'Delete Comment',
    click: (t) => {
        const target = t as CommentModel;
        if (target.isNodeComment() && target._parent instanceof NodeSvg) {
            target._parent.removeComment();
        } else {
            target.getWorkspace().removeComment(target);
        }
    }
});

ContextMenu.registerOption('k_duplicate', {
    showFor: 'node',
    label: 'Duplicate',
    click: t => {
        const node = t as NodeSvg;
        if (!node.workspace) return;
        node.workspace.cloneNode(node);
    }
});

export { ContextMenu };
export default ContextOptsRegistry;
