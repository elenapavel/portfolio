import React, { Component } from "react";
import Editor from "@nore/editor";

export default () => (
	<b style={{ padding: "2rem" }}>
		<b style={{ marginBottom: "2rem" }}>
			<code>@nore/editor</code>
		</b>

		<b style={{ backgroundColor: "#D9E2EC", padding: "1rem" }}>
			<Editor />
		</b>
	</b>
);
