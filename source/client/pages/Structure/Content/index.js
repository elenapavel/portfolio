import React from "react";
import ContentWS1 from "./ContentWS1";
import ContentWS2 from "./ContentWS2";
import ContentWS3 from "./ContentWS3";
import $ from "./style.css";

export default ({ data }) => (
	<b className={$.content}>
		<ContentWS1 data={data.contentWS1} />
		<ContentWS2 data={data.contentWS2} />
		<ContentWS3 data={data.contentWS3} />
	</b>
);
