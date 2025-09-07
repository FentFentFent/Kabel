import { parseColor } from "../util/parse-color";
import { TblxCategoryStruct, TblxNodeStruct } from "./inject";
import Toolbox from "./toolbox";
import { Color } from "./visual-types";

class Category {
	label: string;
	color: Color;
	contents: TblxNodeStruct[];
	_rowDiv!: HTMLButtonElement;
	_toolbox: Toolbox;

	constructor(toolbox: Toolbox, cData: TblxCategoryStruct) {
		this.label = cData.name;
		this.color = cData.color;
		this.contents = cData.contents;
		this._toolbox = toolbox;
		this._makeDiv();
	}

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

	/** Refreshes the UI for this category (label, color, contents) */
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

	/** Remove category row from toolbox */
	destroy() {
		this._rowDiv.remove();
		this._toolbox = null as unknown as Toolbox; // optional: release ref
	}

	/** Hide this category from the UI */
	hide() {
		this._rowDiv.style.display = "none";
	}

	/** Show this category in the UI */
	show() {
		this._rowDiv.style.display = "";
	}

	/** Enable/disable interaction */
	setDisabled(disabled: boolean) {
		this._rowDiv.disabled = disabled;
	}

	/** Returns a plain object copy of this category */
	toJSON(): TblxCategoryStruct {
		return {
			name: this.label,
			color: this.color,
			contents: this.contents,
		};
	}
}

export default Category;
