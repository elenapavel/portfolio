import tap from "tape";
import emitter from "./emitter.js";

const lorem = () => {};
const ipsum = () => {};
const events = Object.create(null);
const demo = emitter(events);

tap.test("should be a function", ({ end, ok }) => {
	ok(typeof emitter === "function");
	end();
});

tap.test("should register handler for new type", ({ end, same }) => {
	demo.on("foo", lorem);
	demo.on("bar", ipsum);
	demo.on("baz", ipsum);
	same(events, { foo: [lorem], bar: [ipsum], baz: [ipsum] });
	end();
});

tap.test("should append handler for existing type", ({ end, same }) => {
	demo.on("foo", ipsum);
	same(events, { foo: [lorem, ipsum], bar: [ipsum], baz: [ipsum] });
	end();
});

tap.test("should remove handler for type", ({ end, same }) => {
	demo.off("foo", ipsum);
	same(events, { foo: [lorem], bar: [ipsum], baz: [ipsum] });
	end();
});

tap.test("should invoke handler for type", ({ end, ok }) => {
	let event = { a: "b" };

	demo.on("foo", (one, two) => {
		ok(event === one);
		ok(undefined === two);
	});

	demo.emit("foo", event);
	end();
});

tap.test("should invoke * handlers", ({ end, ok }) => {
	let count = 0;

	demo.on("*", (event, count) => {
		if (count === 1) ok(event === "bar");
		if (count === 2) ok(event === "baz");
	});

	demo.emit("bar", ++count);
	demo.emit("baz", ++count);

	ok(count === 2);
	end();
});
