declare class Coordinates {
    x: number;
    y: number;
    constructor(x?: number, y?: number);
    /** Set coordinates */
    set(x: number, y: number): void;
    /** Returns a copy of this coordinate */
    clone(): Coordinates;
    /** Calculate distance to another coordinate */
    distanceTo(other: Coordinates): number;
    /** Convert to string */
    toString(): string;
    /** Convert to array [x, y] */
    toArray(): [number, number];
    /** Convert to object { x, y } */
    toObject(): {
        x: number;
        y: number;
    };
}
export default Coordinates;
//# sourceMappingURL=coordinates.d.ts.map