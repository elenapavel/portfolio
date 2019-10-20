import React, { createElement, isValidElement } from "react";
import { isFunction } from "@nore/std/assert";

export default function renderOrChildren(children, render, scope) {
	if (render) {
		if (isValidElement(render)) {
			return render;
		}

		return createElement(render, { scope });
	}

	return isFunction(children) ? children({ scope }) : children;
}
