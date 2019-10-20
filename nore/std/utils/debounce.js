import { ArgumentError } from "../error";
import { isFunction } from "../assert";

export default function debounce(target, delay = 166, isLeading = 0) {
	if (isFunction(!target)) {
		throw new ArgumentError("target", "function", target);
	}

	let timeout;

	function debounced(...args) {
		clearTimeout(timeout);

		if (isLeading) {
			if (!timeout) {
				target.apply(this, args);
			}

			timeout = setTimeout(() => (timeout = clearTimeout(timeout)), delay);
		} else {
			timeout = setTimeout(() => target.apply(this, args), delay);
		}
	}

	debounced.cancel = () => {
		timeout = clearTimeout(timeout);
	};

	return debounced;
}
