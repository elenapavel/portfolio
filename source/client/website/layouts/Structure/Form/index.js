import React from "react";
import FormWS1 from "./FormWS1";
import FormWS2 from "./FormWS2";
import $ from "./style.css";

export default ({ data }) => (
	<b className={$.section}>
		<FormWS1 data={data.formWS1} />
		<FormWS2 data={data.formWS2} />
	</b>
);
