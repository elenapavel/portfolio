import React, { useEffect } from "react";
import store from "./store.js";

export default function Title(attrs) {
	if (typeof attrs.children !== "string")
		throw Error("<Title> accepts only 'string' as children.");

	useEffect(() => {
		store.set("title", attrs.children);
	}, [attrs.children]);

	if (attrs.hidden) return null;

	return attrs.className ? (
		<div {...attrs}>{attrs.children}</div>
	) : (
		attrs.children
	);
}
