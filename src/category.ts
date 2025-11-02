import { parseColor } from "../util/parse-color";
import { TblxCategoryStruct, TblxNodeStruct } from "./inject";
import Toolbox from "./toolbox";
import { Color } from "./visual-types";

/**
 * Represents a category in the toolbox, containing nodes and a label.
 */
class Category {
	/** Display label for the category */
	label: string;
	/** Category color */
	color: Color;
	/** Nodes contained in this category */
	contents: TblxNodeStruct[];
	/** HTML button element representing this category row */
	_rowDiv!: HTMLButtonElement;
	/** Reference to parent toolbox */
	_toolbox: Toolbox;

	/**
	 * @param toolbox The parent Toolbox instance
	 * @param cData Category data (label, color, nodes)
	 */
	constructor(toolbox: Toolbox, cData: TblxCategoryStruct) {
		this.label = cData.name;
		this.color = cData.color;
		this.contents = cData.contents;
		this._toolbox = toolbox;
		this._makeDiv();
	}

	/** Creates the category button in the UI and attaches click events */
	_makeDiv() {
		const btn = document.createElement("button");
		btn.textContent = this.label;
		btn.className = "KabelCategoryRow";
		btn.style.backgroundColor = parseColor(this.color);
		btn.style.color = parseColor('#ffffff');
		this._rowDiv = btn;

		btn.addEventListener("click", e => {
			e.stopPropagation();
			this._toolbox._flyout.clear();
			this._toolbox._flyout.fill(this.contents);
			this._toolbox._flyout.show();
		});

		this._toolbox.container.appendChild(btn);
	}

	/**
	 * Refreshes the category UI with new data
	 * @param cData Partial data to update (name, color, contents)
	 */
	refresh(cData: Partial<TblxCategoryStruct>) {
		if (cData.name !== undefined) {
			this.label = cData.name;
			this._rowDiv.textContent = this.label;
		}
		if (cData.color !== undefined) {
			this.color = cData.color;
			this._rowDiv.style.backgroundColor = parseColor(this.color);
		}
		if (cData.contents !== undefined) {
			this.contents = cData.contents;
		}
	}

	/** Remove category row from the toolbox */
	destroy() {
		this._rowDiv.remove();
		this._toolbox = null as unknown as Toolbox;
	}

	/** Hide this category from the UI */
	hide() {
		this._rowDiv.style.display = "none";
	}

	/** Show this category in the UI */
	show() {
		this._rowDiv.style.display = "";
	}

	/**
	 * Enable or disable interaction with this category
	 * @param disabled True to disable, false to enable
	 */
	setDisabled(disabled: boolean) {
		this._rowDiv.disabled = disabled;
	}

	/**
	 * Returns a plain object representation of this category
	 * @returns JSON-compatible category object
	 */
	toJSON(): TblxCategoryStruct {
		return {
			name: this.label,
			color: this.color,
			contents: this.contents,
		};
	}
}

export default Category;
