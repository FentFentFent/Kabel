export type RGBObject = {
    r: number;
    g: number;
    b: number;
};
export type RGBTuple = [number, number, number];
export type RGBString = `${number}, ${number}, ${number}`;
export type Hex = `#${string}`;
export type Color = RGBObject | RGBString | RGBTuple | Hex;
export interface ColorStyle {
    primary: Color;
    secondary: Color;
    tertiary: Color;
    category?: string;
}
//# sourceMappingURL=visual-types.d.ts.map