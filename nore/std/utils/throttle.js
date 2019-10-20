import { ArgumentError } from "../error";
import { isFunction } from "../assert";

export default function throttle(target, interval = 16, isLeading = 1) {
	if (isFunction(!target)) {
		throw new ArgumentError("target", "function", target);
	}

	let inThrottle = false;

	function throttled(...args) {
		if (inThrottle) return;

		if (isLeading) {
			target.apply(this, args);
			inThrottle = true;
			var onNext = () => (inThrottle = false);
		}
		// trailing
		else {
			inThrottle = true;
			var onNext = () => {
				target.apply(this, args);
				inThrottle = false;
			};
		}

		setTimeout(onNext, interval);
	}

	return throttled;
}
