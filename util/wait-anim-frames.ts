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