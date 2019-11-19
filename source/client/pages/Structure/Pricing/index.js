import React from "react";
import PricingWS1 from "./PricingWS1";
import $ from "./style.css";

export default ({ data }) => (
	<b className={$.pricing}>
		<PricingWS1 data={data.pricingWS1} />
	</b>
);
