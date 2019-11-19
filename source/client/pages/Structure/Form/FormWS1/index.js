import React from "react";
import Form from "./Form";
import $ from "./style.css";

export default ({ data }) => (
	<b className={$.section}>
		<b className={$.heading}>{data.heading}</b>
		<b className={$.content}>
			<Form
				fields={data.fields}
				submitActionText={data.submitAction.text}
				submitActionBackground={data.submitAction.background}
			/>
			<b className={$.tagline}>{data.tagline}</b>
			<b className={$.email_action}>
				<a href={`mailto:${data.emailReceiver}`}>
					<i className={$.email}>
						{data.emailReceiver}
						<b className={$.email_line} />
					</i>
				</a>
			</b>
		</b>
	</b>
);
