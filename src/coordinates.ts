class Coordinates {
    x: number;
    y: number;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    /** Set coordinates */
    set(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    /** Returns a copy of this coordinate */
    clone(): Coordinates {
        return new Coordinates(this.x, this.y);
    }

    /** Calculate distance to another coordinate */
    distanceTo(other: Coordinates): number {
        const dx = this.x - other.x;
        const dy = this.y - other.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    /** Convert to string */
    toString(): string {
        return `(${this.x}, ${this.y})`;
    }

    /** Convert to array [x, y] */
    toArray(): [number, number] {
        return [this.x, this.y];
    }

    /** Convert to object { x, y } */
    toObject(): { x: number; y: number } {
        return { x: this.x, y: this.y };
    }
}
export default Coordinates;