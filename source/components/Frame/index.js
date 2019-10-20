import React, { Component, Children } from "react";
import ReactDOM from "react-dom";

const template = ({ className }) => `
	<!DOCTYPE html>
	<html>
		<head></head>
		<body>
			<div id="root" class="${className}"></div>
		</body>
	</html>
`;

const style = {
	display: "block",
	border: "none",
	margin: "0",
	width: "100%",
	height: "100%",
	padding: "0",
};

class Container extends Component {
	componentDidMount() {
		this.props.onMount();
	}

	componentDidUpdate() {
		this.props.onUpdate();
	}

	render() {
		return Children.only(this.props.children);
	}
}

export default class Frame extends Component {
	constructor(props) {
		super();

		this.ref = React.createRef();

		this.state = {
			isReady: false,
		};
	}

	componentDidMount() {
		const iframe = this.ref.current;
		const document = iframe.contentDocument;

		if (document.readyState === "complete") {
			// call it on next event cycle
			setTimeout(this.onReady, 0);
		} else {
			iframe.addEventListener("load", this.onReady);
		}
	}

	onReady = () => {
		const iframe = this.ref.current;
		const document = iframe.contentDocument;
		const html = template({ className: this.props.className });

		document.open("text/html", "replace");
		document.write(html);
		document.close();

		if (this.props.onReady) {
			this.props.onReady({ iframe, document });
		}

		this.setState({ isReady: true });
	};

	onUpdate = () => {
		if (this.props.onUpdate) {
			const iframe = this.ref.current;
			const document = iframe.contentDocument;

			this.props.onUpdate({ iframe, document });
		}
	};

	onMount = () => {
		if (this.props.onMount) {
			const iframe = this.ref.current;
			const document = iframe.contentDocument;

			this.props.onUpdate({ iframe, document });
		}
	};

	content() {
		if (!this.state.isReady) return null;

		const iframe = this.ref.current;
		const document = iframe.contentDocument;
		const container = document.body.children[0];

		const content = (
			<Container
				onMount={this.onMount}
				onUpdate={this.onUpdate}
				children={this.props.children}
			/>
		);

		return ReactDOM.createPortal(content, container);
	}

	render(props, state) {
		return (
			<iframe style={style} ref={this.ref}>
				{this.content()}
			</iframe>
		);
	}
}
