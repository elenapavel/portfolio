import React, { Component } from "react";
import Markup from "./Markup";
import Content from "./Content";
import Table from "./Table";
import Form from "./Form";
import $, { css } from "./style.css";

export default () => (
	<b class={$.container}>
		<Content />
		<Markup />
		<Table />
		<Form />
	</b>
);
