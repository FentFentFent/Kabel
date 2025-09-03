import { ContextMenuOpts, Showable } from "./context-menu";
import NodeSvg from "./nodesvg";
import WorkspaceSvg from "./workspace-svg";


const ContextOptsRegistry: ContextMenuOpts[] = [];

const ContextMenu = {
    registerOption(id: string, option: {
        click: (target: NodeSvg | WorkspaceSvg | HTMLElement) => void;
        onHoverStart?: () => void;
        onHoverEnd?: () => void;
        label: string;
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

    unregisterOption(id: string) {
        const index = ContextOptsRegistry.findIndex(opt => opt.id === id);
        if (index >= 0) ContextOptsRegistry.splice(index, 1);
    }
};

ContextMenu.registerOption('k_delete', {
    showFor: ['node'],
    label: 'Delete', // required
    click: (t) => {
        const target = t as NodeSvg;
        if (!target.workspace) return;
        target.workspace.removeNode(target);
    }
});
ContextMenu.registerOption('k_deleteall', {
    showFor: 'ws',
    label: 'Delete all', // required
    click: (t) => {
        const target = t as WorkspaceSvg;
        const isSure = window.confirm(`Are you sure you want to delete ${Array.from(target._nodeDB.keys()).length} nodes?`);
        if (!isSure) return;
        for (let [id, _] of target._nodeDB) {
            target.removeNodeById(id);
        }
    }
})
ContextMenu.registerOption('k_duplicate', {
	showFor: 'node',
	label: 'Duplicate',
	click: t => {
		const node = t as NodeSvg;
		if (!node.workspace) return;
		node.workspace.cloneNode(node);
	}
});

export { ContextMenu }
export default ContextOptsRegistry;