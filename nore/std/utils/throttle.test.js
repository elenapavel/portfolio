import tap from "tape";
import throttle from "./throttle.js";

function trigger(count, delay, handler) {
	let id = setInterval(emitter, delay);
	let n = 0;

	function emitter() {
		if (n === count) clearInterval(id);
		else handler(++n);
	}
}

tap.test("throttle mode=1", ({ plan, ok, end }) => {
	plan(10);

	let i = 0;

	const target = function(n) {
		ok(i === n);
		ok([1, 5, 9, 13, 17].includes(n));
	};

	const mode = 1; // leading
	const fn = throttle(target, 40, mode);

	trigger(20, 10, n => {
		i = n;
		fn(n);
	});
});

tap.test("throttle mode=0", ({ plan, ok, end }) => {
	plan(10);

	let i = 0;

	const target = function(n) {
		ok(n < i);
		ok([1, 5, 9, 13, 17].includes(n));
	};

	const mode = 0; // trailing
	const fn = throttle(target, 40, mode);

	trigger(20, 10, n => {
		i = n;
		fn(n);
	});
});
