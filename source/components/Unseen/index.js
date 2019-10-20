import React, { Component } from "react";

const style = {
	border: 0,
	clip: "rect(0 0 0 0)",
	height: "1px",
	width: "1px",
	margin: "-1px",
	padding: 0,
	overflow: "hidden",
	position: "absolute",
};

// inspired from: https://git.io/fh5om
export default ({ children }) => {
	return <i style={style} children={children} />;
};
