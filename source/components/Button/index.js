import React, { Component, createElement, cloneElement } from "react";
import $, { css } from "./style.css";

function isLink(el) {
	return el && el.type && (el.type === "a" || el.type.name === "Link");
}

function getClasses(attrs) {
	if (attrs.type === "blank") return $.reset;

	const classes = [
		attrs.type || "default",
		attrs.size || "medium",
		attrs.shape || "round",
		attrs.is || "",
	];

	return css(classes, {
		active: attrs.active,
		hovered: attrs.hovered,
		focused: attrs.focused,
		disabled: attrs.disabled,
	});
}

function getContent(attrs) {
	const _attrs = {
		tabIndex: "-1",
		className: getClasses(attrs),
		tag: "button_label",
	};

	// if children is a link <a>, clone and extend
	if (isLink(attrs.children)) {
		return cloneElement(attrs.children, _attrs);
	}

	return createElement("b", _attrs, attrs.children || attrs.label);
}

export default function Button(attrs) {
	const _attrs = {
		type: "button",
		id: attrs.id,
		className: css("reset", { wide: attrs.wide }, attrs.className),
		tag: "button",
	};

	// add events if not disabled
	if (attrs.disabled) {
		_attrs.disabled = "disabled";
	}
	// set events only when button is enabled
	else {
		_attrs.onClick = attrs.onClick;
		_attrs.onFocus = attrs.onFocus;
		_attrs.onBlur = attrs.onBlur;
	}

	return createElement("button", _attrs, getContent(attrs));
}
