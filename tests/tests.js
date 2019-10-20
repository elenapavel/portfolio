import React, { Component } from "react";
import { render } from "react-dom";
import { loadable } from "@nore/pwa";

const tests = [loadable(() => import("./pwa/scope.js"))];

const container = document.getElementById("application");
const views = tests.map((Module, key) => <Module key={key} />);

render(views, container, () => {
	container.classList.replace("is_loading", "is_loaded");
});

if (IS_DEVELOPMENT) {
	// enable HMR (Hot Module Replacement)
	module.hot && module.hot.accept();
}
