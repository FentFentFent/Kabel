/**
 * Escapes special characters in a string to their corresponding HTML entities.
 *
 * Specifically, it replaces:
 * - `&` with `&amp;`
 * - `'` with `&apos;`
 * - `"` with `&quot;`
 * - `<` with `&lt;`
 * - `>` with `&gt;`
 *
 * @param {string} s - The string to escape.
 * @returns {string} The escaped string with special characters replaced by HTML entities.
 */
function escapeAttr(s: string): string {
    return s.replace(/&/g, "&amp;")
            .replace(/'/g, "&apos;")
            .replace(/"/g, "&quot;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
}

export default escapeAttr;
