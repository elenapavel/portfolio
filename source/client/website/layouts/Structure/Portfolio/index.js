import React from "react";
import PortfolioWS1 from "./PortfolioWS1";
import PortfolioWS2 from "./PortfolioWS2";
import PortfolioWS3 from "./PortfolioWS3";
import $ from "./style.css";

export default ({ data }) => (
	<b className={$.portfolio}>
		<PortfolioWS1 data={data.portfolioWS1} />
		<PortfolioWS2 data={data.portfolioWS2} />
		<PortfolioWS3 data={data.portfolioWS3} />
	</b>
);
