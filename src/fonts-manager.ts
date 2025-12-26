

// fonts-manager.ts

const loadedFonts: Record<string, Promise<void>> = {};

/**
 * Load a Google Font by name and optional weights.
 * Returns a promise that resolves when the font is available.
 */
export function loadGoogleFont(
	name: string,
	weights: number[] = [400, 700]
): Promise<void> {
	if (loadedFonts[name]) return loadedFonts[name]; // already loading/loaded

	const linkId = `gf-${name.replace(/\s+/g, '-')}`;
	if (!document.getElementById(linkId)) {
		const link = document.createElement('link');
		link.id = linkId;
		link.rel = 'stylesheet';
		const weightsParam = weights.join(';');
		link.href = `https://fonts.googleapis.com/css2?family=${name.replace(
			/\s+/g,
			'+'
		)}:wght@${weightsParam}&display=swap`;
		document.head.appendChild(link);
	}

	// wait for all requested weights to be loaded
	const fontPromises = weights.map((w) =>
		document.fonts.load(`${w} 1em ${name}`)
	);

	const promise = Promise.all(fontPromises).then(() => undefined);
	loadedFonts[name] = promise;
	return promise;
}
