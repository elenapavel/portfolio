// allow other operations to complete before running your code
export default function runOnNextEventCycle(callback) {
	return new Promise((resolve, reject) => {
		setImmediate(() => resolve(callback()));
	});
}
