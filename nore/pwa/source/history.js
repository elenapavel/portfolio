import window from "@nore/std/global";
import { emitter } from "@nore/std/utils";

const history = emitter();

history.push = (path, state) => {
	window.history.pushState(state, "", path);
};

history.replace = (path, state) => {
	window.history.replaceState(state, "", path);
};

history.back = () => {
	window.history.go(-1);
};

history.forward = () => {
	window.history.go(1);
};

if (__WEB__) {
	window.addEventListener("popstate", event => {
		history.emit("popstate", event);
	});

	window.addEventListener("hashchange", event => {
		if (location.hash) {
			document
				.querySelector(location.hash)
				.scrollIntoView({ behavior: "smooth" });
		}
	});
}

export default history;
