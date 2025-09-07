import Flyout from "./flyout";
import { InjectOptions, TblxCategoryStruct, TblxNodeStruct } from "./inject";
import WorkspaceSvg from "./workspace-svg";
import Category from "./category";

class Toolbox {
	type: 1 | 2;
	workspace: WorkspaceSvg;
	wsOptions: InjectOptions;
	_flyout: Flyout;
	_contents: TblxNodeStruct[] | TblxCategoryStruct[];
	container: HTMLDivElement;
	_categories: Category[] = [];

	constructor(workspace: WorkspaceSvg) {
		this.workspace = workspace;
		this.wsOptions = this.getOptions();
		this.type = this.wsOptions.toolbox?.type == "flyout" ? 2 : 1;
		this._contents = this.wsOptions.toolbox?.contents ?? [];

		// pass toolbox reference to flyout
		this._flyout = new Flyout(this);

		this.container = document.createElement("div");
		this.container.className = "KabelToolbox";
		this.container.style.position = "absolute";
		this.container.style.left = "0";
		this.container.style.top = "0";
		this.container.style.width = "20%";
		this.container.style.height = "100%";
		this.container.style.background = "rgba(240,240,240,0.9)";
		this.container.style.overflowY = "auto";
		workspace._wsTop.appendChild(this.container);

		if (this.type === 1) this.initCategoryToolbox();
		if (this.type === 2) this.initFlyoutToolbox();
	}

	getOptions() {
		return this.workspace.options;
	}

	initCategoryToolbox() {
		const categories = this._contents as TblxCategoryStruct[];
		categories.forEach(cData => {
			const category = new Category(this, cData);
			this._categories.push(category);
		});

		// clicking workspace hides flyout
		this.workspace.svg.on("click", () => this._flyout.hide());
	}

	initFlyoutToolbox() {
		this.container.style.display = "none";
		const nodes = this._contents as TblxNodeStruct[];
		this._flyout.fill(nodes);
	}
}

export default Toolbox;
