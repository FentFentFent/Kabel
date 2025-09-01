// color-utils.ts
import type { Color, Hex } from '../src/visual-types';

/**
 * Parse any Color type into a hex string "#RRGGBB"
 */
export function parseColor(color: Color): Hex {
	if (typeof color === 'string') {
		if (color.startsWith('#')) {
			// Already a hex string, normalize to full #RRGGBB
			let hex = color.slice(1);
			if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
			return `#${hex}`;
		} else {
			// RGB string "r, g, b"
			const parts = color.split(',').map(s => parseInt(s.trim(), 10));
			if (parts.length !== 3) throw new Error(`Invalid RGB string: ${color}`);
			const [r, g, b] = parts;
            if (!r || !g || !b) {
                console.warn(
                    "Invalid RGB tuple"
                );
                return "#000";
            }
			return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b
				.toString(16)
				.padStart(2, '0')}`;
		}
	} else if (Array.isArray(color)) {
		// RGBTuple [r,g,b]
		const [r, g, b] = color;
		return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b
			.toString(16)
			.padStart(2, '0')}`;
	} else {
		// RGBObject {r,g,b}
		const { r, g, b } = color;
		return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b
			.toString(16)
			.padStart(2, '0')}`;
	}
}
