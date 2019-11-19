import React from "react";
import BlogWS1 from "./BlogWS1";
import BlogWS2 from "./BlogWS2";
import BlogWS3 from "./BlogWS3";
import BlogWS4 from "./BlogWS4";
import $ from "./style.css";

export default ({ data }) => (
	<b className={$.blog}>
		<BlogWS1 data={data.blogWS1} />
		<BlogWS2 data={data.blogWS2} />
		<BlogWS3 data={data.blogWS3} />
		<BlogWS4 data={data.blogWS4} />
	</b>
);
