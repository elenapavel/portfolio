import React, { PureComponent, createRef } from "react";
import editor from "./editor.js";
import $, { css } from "./style.css";

export default class Editor extends PureComponent {
	container = createRef();
	editor = null;

	componentDidMount() {
		this.editor = editor({
			container: this.container.current,
		});
	}

	render(props, state) {
		return <b ref={this.container} class={$.editor} />;
	}
}
