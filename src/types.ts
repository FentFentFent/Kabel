import Kabel from './core'; // your current module
import { DropdownContainer } from './dropdown-menu';
import WorkspaceSvg from './workspace-svg';

// -------------------- Types --------------------
interface KabelUIX {
	events: typeof Kabel.UIX.events;
	userState: typeof Kabel.UIX.userState;
}

interface KabelUtils {
	Path: typeof Kabel.Utils.Path;
	waitFrames: typeof Kabel.Utils.waitFrames;
	SVG: typeof Kabel.Utils.SVG;
	parseColor: typeof Kabel.Utils.parseColor;
	UID: typeof Kabel.Utils.UID;
	EventEmitter: typeof Kabel.Utils.EventEmitter;
	hasProp: typeof Kabel.Utils.hasProp;
	styler: typeof Kabel.Utils.styler;
	Styler: typeof Kabel.Utils.Styler;
	escapeHTML: typeof Kabel.Utils.escapeHTML;
	unescapeHTML: typeof Kabel.Utils.unescapeHTML;
}

interface KabelNodeRendering {
	rendererMap: typeof Kabel.nodeRendering.rendererMap;
	Renderer: typeof Kabel.nodeRendering.Renderer;
	RendererConstants: typeof Kabel.nodeRendering.RendererConstants;
}

interface KabelCommentRendering {
	CommentModel: typeof Kabel.commentRendering.CommentModel;
	CommentRenderer: typeof Kabel.commentRendering.CommentRenderer;
}

interface KabelInterface {
	UIX: KabelUIX;
	ContextMenu: typeof Kabel.ContextMenu;
	Utils: KabelUtils;
	Widget: typeof Kabel.Widget;
	CategoryColors: typeof Kabel.CategoryColors;
	Connection: typeof Kabel.Connection;
	Coordinates: typeof Kabel.Coordinates;
	Field: typeof Kabel.Field;
	DummyField: typeof Kabel.DummyField;
	FieldMap: typeof Kabel.FieldMap;
	NumberField: typeof Kabel.NumberField;
	OptConnectField: typeof Kabel.OptConnectField;
	TextField: typeof Kabel.TextField;
	inject: typeof Kabel.inject;
	InjectMsg: typeof Kabel.InjectMsg;
	clearMainWorkspace: typeof Kabel.clearMainWorkspace;
	getMainWorkspace: typeof Kabel.getMainWorkspace;
	setMainWorkspace: typeof Kabel.setMainWorkspace;
	NodeSvg: typeof Kabel.NodeSvg;
	Nodes: typeof Kabel.Nodes;
	Widgets: typeof Kabel.Widgets;
	WorkspaceSvg: typeof Kabel.WorkspaceSvg;
	WorkspaceController: typeof Kabel.WorkspaceController;
	WASDController: typeof Kabel.WASDController;
	nodeRendering: KabelNodeRendering;
	commentRendering: KabelCommentRendering;
	_mainWorkspace: WorkspaceSvg;
    Dropdown: DropdownContainer
}
export default KabelInterface;