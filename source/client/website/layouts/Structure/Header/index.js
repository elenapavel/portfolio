import React from "react";
import HeaderWS1 from "./HeaderWS1";
import PlatformPromoWS1 from "./PlatformPromoWS1";
import PlatformPromoWS2 from "./PlatformPromoWS2";
import $ from "./style.css";

export default ({ data }) => (
	<b className={$.header_container}>
		<HeaderWS1 data={data.headerWS1} />
		<PlatformPromoWS1 data={data.platformPromoWS1} />
		<PlatformPromoWS2 data={data.platformPromoWS2} />
	</b>
);
