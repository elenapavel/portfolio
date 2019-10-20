export default function clear() {
	const isWin = process.platform === "win32";
	const output = isWin ? "\x1B[2J\x1B[0f" : "\x1B[2J\x1B[3J\x1B[H";

	process.stdout.write(output);
}
