// utility for conditionally joining CSS classes together
export default function filterClasses(css) {
	const result = [];

	for (let i = 1; i < arguments.length; ++i) {
		const arg = arguments[i];
		const type = typeof arg;

		// ignore null / false / undefined
		if (!arg) continue;

		// case arg is a string
		if (type === "string") {
			// ignore empty strings
			if (arg.length) {
				// pass the CSS modules class or a custom class
				result.push(css[arg] || arg);
			}
		}
		// case arg is an array
		else if (Array.isArray(arg)) {
			for (let i = 0; i < arg.length; ++i) {
				const key = arg[i];

				result.push(css[key] || key);
			}
		}
		// case arg is an object
		else {
			for (const name in arg) {
				const isTrue = arg[name];

				if (isTrue) {
					result.push(css[name] || name);
				}
			}
		}
	}

	// leave a space so it won't mess with other
	// classes defined during concatenation
	return result.length ? " " + result.join(" ") : "";
}
