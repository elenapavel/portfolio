import React, { Component } from "react";
import { Scope } from "@nore/pwa";
import List from "./List";
import Edit from "./Edit";

export default function Articles(attrs) {
	return (
		<>
			<Scope exact render={List} />
			<Scope match="edit" render={Edit} />
		</>
	);
}
