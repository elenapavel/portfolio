import tap from "tape";
import debounce from "./debounce.js";

function trigger(count, delay, handler) {
	let id = setInterval(emitter, delay);
	let n = 0;

	function emitter() {
		if (n === count) clearInterval(id);
		else handler(++n);
	}
}

tap.test("debounce mode=0", ({ plan, equal, end }) => {
	plan(5);

	const target = function(n) {
		equal(n % 4, 0);
	};

	const mode = 0; // trailing
	const fn = debounce(target, 4, mode);

	trigger(20, 2, n => {
		if ((n - 1) % 4 === 0) return;
		fn(n);
	});
});

tap.test("debounce mode=1", ({ plan, ok, end }) => {
	plan(5);

	const target = function(n) {
		ok([1, 5, 10, 15, 20].includes(n));
	};

	const mode = 1; // leading
	const fn = debounce(target, 4, mode);

	trigger(20, 2, n => {
		if ((n + 1) % 5 === 0) return;
		fn(n);
	});
});
