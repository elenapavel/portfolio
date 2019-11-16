import React from "react";
import ContactWS1 from "./ContactWS1";
import $ from "./style.css";

export default ({ data }) => (
	<b className={$.section}>
		<ContactWS1 data={data.contactWS1} />
	</b>
);
