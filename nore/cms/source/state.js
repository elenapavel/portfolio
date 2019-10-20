export default {
	isReady: false,

	plugins: new Map(),
	extensions: new Map(),

	// runtime errors that don't stop the process
	errors: new Set(),

	events: {
		ready: new Set(),
		final: new Set(),
		terminate: new Set(),
	},
};
