class Styler {
	private styles: Map<string, HTMLStyleElement>;

	constructor() {
		this.styles = new Map();
	}

	appendStyles(id: string, css: string): void {
		if (this.styles.has(id)) return; // Do not append if id exists

		const styleEl = document.createElement('style');
		styleEl.id = id;
		styleEl.textContent = css;
		document.head.appendChild(styleEl);
		this.styles.set(id, styleEl);
	}

	removeStyles(id: string): void {
		const styleEl = this.styles.get(id);
		if (!styleEl) return;

		styleEl.remove();
		this.styles.delete(id);
	}

	updateStyles(id: string, css: string): void {
		const styleEl = this.styles.get(id);
		if (!styleEl) return;

		styleEl.textContent = css;
	}

	hasStyles(id: string): boolean {
		return this.styles.has(id);
	}
}
export {
    Styler
}
const styler = new Styler();
export default styler;