import { ColorStyle } from "./visual-types";
/**
 * Stores color styles for node categories.
 *
 * Each key is a category name, and the value is a ColorStyle object
 * containing colors like primary, secondary, and tertiary.
 *
 * Example:
 * ```ts
 * CategoryColors["logic"] = {
 *   primary: "#FF0000",
 *   secondary: "#00FF00",
 *   tertiary: "#0000FF"
 * };
 * ```
 */
declare const CategoryColors: {
    [key: string]: ColorStyle;
};
export default CategoryColors;
//# sourceMappingURL=colors.d.ts.map