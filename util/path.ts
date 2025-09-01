// path.ts
/**
 * Utility functions to generate SVG path strings or translate them.
 */

/** Rounded rectangle */
export function roundedRect(width: number, height: number, radius: number): string {
	radius = Math.min(radius, width / 2, height / 2);
	return `
		M${radius},0
		H${width - radius}
		A${radius},${radius} 0 0 1 ${width},${radius}
		V${height - radius}
		A${radius},${radius} 0 0 1 ${width - radius},${height}
		H${radius}
		A${radius},${radius} 0 0 1 0,${height - radius}
		V${radius}
		A${radius},${radius} 0 0 1 ${radius},0
		Z
	`.replace(/\s+/g, ' ').trim();
}

/** Rounded triangle pointing up */
export function roundedTri(width: number, height: number, radius: number): string {
	const halfW = width / 2;
	radius = Math.min(radius, halfW, height / 2);
	return `
		M${halfW},0
		L${width - radius},${height - radius}
		A${radius},${radius} 0 0 1 ${width - radius*2},${height}
		L${radius*2},${height}
		A${radius},${radius} 0 0 1 ${radius},${height - radius}
		Z
	`.replace(/\s+/g, ' ').trim();
}

/** Circle */
export function circle(radius: number): string {
	return `
		M${radius},0
		A${radius},${radius} 0 1,0 ${-radius},0
		A${radius},${radius} 0 1,0 ${radius},0
		Z
	`.replace(/\s+/g, ' ').trim();
}

/** Ellipse */
export function ellipse(rx: number, ry: number): string {
	return `
		M${rx},0
		A${rx},${ry} 0 1,0 ${-rx},0
		A${rx},${ry} 0 1,0 ${rx},0
		Z
	`.replace(/\s+/g, ' ').trim();
}

/** Star with n points */
export function star(radius: number, points: number = 5): string {
	if (points < 2) throw new Error('Star must have at least 2 points');
	let path = '';
	const step = (Math.PI * 2) / (points * 2);
	for (let i = 0; i < points * 2; i++) {
		const r = i % 2 === 0 ? radius : radius / 2;
		const x = r * Math.sin(i * step);
		const y = -r * Math.cos(i * step);
		path += i === 0 ? `M${x},${y}` : ` L${x},${y}`;
	}
	path += ' Z';
	return path;
}

/** Regular polygon (triangle, pentagon, hexagon, etc) */
export function polygon(radius: number, sides: number = 3): string {
	if (sides < 3) throw new Error('Polygon must have at least 3 sides');
	let path = '';
	const step = (Math.PI * 2) / sides;
	for (let i = 0; i < sides; i++) {
		const x = radius * Math.cos(i * step - Math.PI / 2);
		const y = radius * Math.sin(i * step - Math.PI / 2);
		path += i === 0 ? `M${x},${y}` : ` L${x},${y}`;
	}
	path += ' Z';
	return path;
}
import SvgPath from 'svgpath';

/**
 * Rotate an SVG path string around a given point
 * @param path - SVG path string
 * @param angle - rotation angle in degrees
 * @param cx - x-coordinate of rotation center (default 0)
 * @param cy - y-coordinate of rotation center (default 0)
 * @returns new rotated SVG path string
 */
export function rotatePath(path: string, angle: number, cx = 0, cy = 0): string {
	return new SvgPath(path)
		.rotate(angle, cx, cy)
		.toString();
}
