import Flyout from "./flyout";
import { InjectOptions, TblxCategoryStruct, TblxNodeStruct } from "./inject";
import WorkspaceSvg from "./workspace-svg";
import Category from "./category";

/**
 * Represents the toolbox in a Kabel workspace.
 * The toolbox can be either a flyout or a category-based toolbox.
 */
class Toolbox {
	/** Toolbox type: 1 = category toolbox, 2 = flyout toolbox */
	type: 1 | 2;

	/** Reference to the workspace this toolbox belongs to */
	workspace: WorkspaceSvg;

	/** Workspace options for initialization */
	wsOptions: InjectOptions;

	/** Flyout instance for node display */
	_flyout: Flyout;

	/** Contents of the toolbox (nodes or categories) */
	_contents: TblxNodeStruct[] | TblxCategoryStruct[];

	/** DOM container element for the toolbox */
	container: HTMLDivElement;

	/** List of categories (if using a category toolbox) */
	_categories: Category[] = [];

	/**
	 * Creates a new Toolbox instance attached to a workspace.
	 * @param workspace The workspace instance to attach this toolbox to
	 */
	constructor(workspace: WorkspaceSvg) {
		this.workspace = workspace;
		this.wsOptions = this.getOptions();
		this.type = this.wsOptions.toolbox?.type == "flyout" ? 2 : 1;
		this._contents = this.wsOptions.toolbox?.contents ?? [];

		// Pass toolbox reference to flyout
		this._flyout = new Flyout(this);

		// Create container element
		this.container = document.createElement("div");
		this.container.className = "KabelToolbox";
		this.container.style.position = "absolute";
		this.container.style.left = "0";
		this.container.style.top = "0";
		this.container.style.width = "20%";
		this.container.style.height = "100%";
		this.container.style.background = "rgba(240,240,240,0.9)";
		this.container.style.overflowY = "auto";

		// Append to workspace top layer
		workspace._wsTop.appendChild(this.container);

		// Initialize toolbox depending on type
		if (this.type === 1) this.initCategoryToolbox();
		if (this.type === 2) this.initFlyoutToolbox();
	}

	/**
	 * Retrieves the workspace options.
	 * @returns The workspace's InjectOptions
	 */
	getOptions() {
		return this.workspace.options;
	}

	/**
	 * Initializes a category-based toolbox.
	 * Converts the toolbox contents into Category instances and attaches them.
	 */
	initCategoryToolbox() {
		const categories = this._contents as TblxCategoryStruct[];
		categories.forEach(cData => {
			const category = new Category(this, cData);
			this._categories.push(category);
		});

		// Hide flyout when workspace is clicked
		this.workspace.svg.on("click", () => this._flyout.hide());
	}

	/**
	 * Initializes a flyout toolbox.
	 * Fills the flyout with the node definitions from the toolbox contents.
	 */
	initFlyoutToolbox() {
		this.container.style.display = "none";
		const nodes = this._contents as TblxNodeStruct[];
		this._flyout.fill(nodes);
	}
}

export default Toolbox;
