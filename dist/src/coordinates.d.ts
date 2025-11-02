/**
 * Represents a 2D coordinate in space.
 */
declare class Coordinates {
    /** X position */
    x: number;
    /** Y position */
    y: number;
    /**
     * Creates a new Coordinates instance
     * @param x - The x value (default 0)
     * @param y - The y value (default 0)
     */
    constructor(x?: number, y?: number);
    /**
     * Set the coordinates to new values
     * @param x - The new x value
     * @param y - The new y value
     */
    set(x: number, y: number): void;
    /**
     * Returns a copy of this coordinate
     * @returns A new Coordinates instance with the same x and y
     */
    clone(): Coordinates;
    /**
     * Calculate the Euclidean distance to another coordinate
     * @param other - The target coordinate
     * @returns The distance as a number
     */
    distanceTo(other: Coordinates): number;
    /**
     * Convert the coordinate to a string representation
     * @returns A string like "(x, y)"
     */
    toString(): string;
    /**
     * Convert the coordinate to an array [x, y]
     * @returns Tuple of numbers [x, y]
     */
    toArray(): [number, number];
    /**
     * Convert the coordinate to an object { x, y }
     * @returns Object with x and y properties
     */
    toObject(): {
        x: number;
        y: number;
    };
}
export default Coordinates;
//# sourceMappingURL=coordinates.d.ts.map