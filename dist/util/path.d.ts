/**
 * Utility functions to generate SVG path strings or translate them.
 */
/** Rounded rectangle */
export declare function roundedRect(width: number, height: number, radius: number): string;
/** Rounded triangle pointing up */
export declare function roundedTri(width: number, height: number, radius: number): string;
/** Circle */
export declare function circle(radius: number): string;
/** Ellipse */
export declare function ellipse(rx: number, ry: number): string;
/** Star with n points */
export declare function star(radius: number, points?: number): string;
/** Regular polygon (triangle, pentagon, hexagon, etc) */
export declare function polygon(radius: number, sides?: number): string;
/**
 * Rotate an SVG path string around a given point
 * @param path - SVG path string
 * @param angle - rotation angle in degrees
 * @param cx - x-coordinate of rotation center (default 0)
 * @param cy - y-coordinate of rotation center (default 0)
 * @returns new rotated SVG path string
 */
export declare function rotatePath(path: string, angle: number, cx?: number, cy?: number): string;
//# sourceMappingURL=path.d.ts.map