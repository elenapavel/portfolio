import React from "react";
import { Link } from "@nore/pwa";
import Form from "./Form";
import Button from "./Button";
import $ from "./style.css";

export default ({ data }) => (
	<b className={$.section}>
		<b
			className={$.preview}
			style={{
				backgroundImage: `url(${data.background})`,
			}}
		/>
		<b className={$.content}>
			<b className={$.to_right}>
				<b className={$.heading}>Sign in</b>
				<b className={$.subheading}>Login to have access to files</b>
				<b className={$.login_action}>
					<Form
						fields={data.fields}
						submitActionText={data.submitAction.text}
					/>
				</b>
				<b className={$.tagline}>{data.tagline}</b>
				<b className={$.register_action}>
					<Button label={data.registerAction.text} />
				</b>
				<b className={$.forgot_password_action}>
					<Link to={data.resetAction.link}>
						<i className={$.forgot_password}>
							{data.resetAction.text}
							<b className={$.forgot_password_line} />
						</i>
					</Link>
				</b>
			</b>
		</b>
	</b>
);
