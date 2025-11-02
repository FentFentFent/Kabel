/**
 * A RGB array (ex: {r: 255, g: 255, b: 255})
 */
export type RGBObject = {
    r: number;
    g: number;
    b: number;
};
/**
 * A RGB tuple (ex: [255, 255, 255])
 */
export type RGBTuple = [number, number, number];
/**
 * A RGB string (ex: '255, 255, 255')
 */
export type RGBString = `${number}, ${number}, ${number}`;
/**
 * A hex color
 */
export type Hex = `#${string}`;
/**
 * A color, whether it be #ffffff, {r, g, b}, 'r, g, b', or [r, g, b]
 */
export type Color = RGBObject | RGBString | RGBTuple | Hex;
/**
 * Stores color data for a visual element on screen.
 */
export interface ColorStyle {
    primary: Color;
    secondary: Color;
    tertiary: Color;
    category?: string;
}
//# sourceMappingURL=visual-types.d.ts.map