import React, { Component } from "react";
import render from "./render.js";
import $, { css } from "./style.css";

export default function Document(props) {
	return <b class={$.document}>{render(props.data)}</b>;
}
