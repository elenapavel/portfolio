import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Application, Scope, loadable } from "@nore/pwa";
import $, { css } from "./style.css";

const container = document.getElementById("application");
const root = IS_DEVELOPMENT ? "/" : "/portfolio";

function render() {
	const application = (
		<Application root={root}>
			<b class={$.container}>{pages}</b>
		</Application>
	);

	ReactDOM.render(application, container, () => {
		container.classList.replace("is_loading", "is_loaded");
	});
}

render();

if (IS_DEVELOPMENT) {
	// enable HMR (Hot Module Replacement)
	module.hot && module.hot.accept();
}
