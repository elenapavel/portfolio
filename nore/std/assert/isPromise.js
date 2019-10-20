export default function isPromise(source) {
	return (
		source != null &&
		typeof source === "object" &&
		typeof source.then === "function"
	);
}
