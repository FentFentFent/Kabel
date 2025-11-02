/**
 * Delays execution of a callback by a specified number of animation frames.
 *
 * Uses `requestAnimationFrame` to count frames, then calls the provided callback.
 *
 * @param {number} frames - The number of animation frames to wait before executing the callback.
 * @param {() => void} callback - The function to execute after the specified frames have passed.
 */
function waitFrames(frames: number, callback: () => void): void {
	let count = 0;

	function step() {
		count++;
		if (count >= frames) {
			callback();
		} else {
			requestAnimationFrame(step);
		}
	}

	requestAnimationFrame(step);
}

export default waitFrames;
