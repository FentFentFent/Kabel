/**
 * Converts HTML-escaped characters in a string back to their literal form.
 *
 * Specifically, it replaces:
 * - `&lt;` with `<`
 * - `&gt;` with `>`
 * - `&quot;` with `"`
 * - `&apos;` with `'`
 * - `&amp;` with `&`
 *
 * @param {string} s - The string containing HTML-escaped characters.
 * @returns {string} The unescaped string with HTML entities replaced by their literal characters.
 */
function unescapeAttr(s: string): string {
	return s.replace(/&lt;/g, "<")
			.replace(/&gt;/g, ">")
			.replace(/&quot;/g, '"')
			.replace(/&apos;/g, "'")
			.replace(/&amp;/g, "&");
}

export default unescapeAttr;
