/**
 * Represents a 2D coordinate in space.
 */
class Coordinates {
	/** X position */
	x: number;
	/** Y position */
	y: number;

	/**
	 * Creates a new Coordinates instance
	 * @param x - The x value (default 0)
	 * @param y - The y value (default 0)
	 */
	constructor(x: number = 0, y: number = 0) {
		this.x = x;
		this.y = y;
	}

	/**
	 * Set the coordinates to new values
	 * @param x - The new x value
	 * @param y - The new y value
	 */
	set(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	/**
	 * Returns a copy of this coordinate
	 * @returns A new Coordinates instance with the same x and y
	 */
	clone(): Coordinates {
		return new Coordinates(this.x, this.y);
	}

	/**
	 * Calculate the Euclidean distance to another coordinate
	 * @param other - The target coordinate
	 * @returns The distance as a number
	 */
	distanceTo(other: Coordinates): number {
		const dx = this.x - other.x;
		const dy = this.y - other.y;
		return Math.sqrt(dx * dx + dy * dy);
	}

	/**
	 * Convert the coordinate to a string representation
	 * @returns A string like "(x, y)"
	 */
	toString(): string {
		return `(${this.x}, ${this.y})`;
	}

	/**
	 * Convert the coordinate to an array [x, y]
	 * @returns Tuple of numbers [x, y]
	 */
	toArray(): [number, number] {
		return [this.x, this.y];
	}

	/**
	 * Convert the coordinate to an object { x, y }
	 * @returns Object with x and y properties
	 */
	toObject(): { x: number; y: number } {
		return { x: this.x, y: this.y };
	}
}

export default Coordinates;
