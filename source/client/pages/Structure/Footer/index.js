import React from "react";
import FooterWS1 from "./FooterWS1";
import FooterWS2 from "./FooterWS2";
import FooterWS3 from "./FooterWS3";
import $ from "./style.css";

export default ({ data }) => (
	<b className={$.section}>
		<FooterWS1 data={data.footerWS1} />
		<FooterWS2 data={data.footerWS2} />
		<FooterWS3 data={data.footerWS3} />
	</b>
);
