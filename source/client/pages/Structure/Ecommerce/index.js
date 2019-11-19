import React from "react";
import EcommerceWS1 from "./EcommerceWS1";
import $ from "./style.css";

export default ({ data }) => (
	<b className={$.ecommerce}>
		<EcommerceWS1 data={data.ecommerceWS1} />
	</b>
);
