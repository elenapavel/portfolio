import React from "react";
import CTAWS1 from "./CTAWS1";
import CTAWS2 from "./CTAWS2";
import CTAWS3 from "./CTAWS3";
import $ from "./style.css";

export default ({ data }) => (
	<b className={$.sections}>
		<CTAWS1 data={data.ctaWS1} />
		<CTAWS2 data={data.ctaWS2} />
		<CTAWS3 data={data.ctaWS3} />
	</b>
);
