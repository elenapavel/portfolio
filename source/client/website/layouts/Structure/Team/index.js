import React from "react";
import TeamWS1 from "./TeamWS1";
import TeamWS2 from "./TeamWS2";
import $ from "./style.css";

export default ({ data }) => (
	<b className={$.section}>
		<TeamWS1 data={data.teamWS1} />
		<TeamWS2 data={data.teamWS2} />
	</b>
);
