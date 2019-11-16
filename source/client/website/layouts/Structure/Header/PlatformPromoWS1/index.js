import React, { useState, useEffect } from "react";
import Header from "./Header";
import Form from "./Form";
import $, { css } from "./style.css";

export default ({ data, heading = null }) => {
	const [values, setValues] = useState([]);

	useEffect(() => {
		console.log(values);
	}, [values]);

	const socialIconClasses = `${$.social_signup_icon} ion-social-facebook`;

	return (
		<b className={$.platform_promo}>
			<b className={$.header}>
				<Header data={data.header} />
			</b>
			<b className={$.promo_section}>
				<b className={$.heading}>{heading || data.heading}</b>
				<b className={$.promo_headline}>{data.description}</b>
				<b className={$.social_signup}>
					<i className={socialIconClasses} />
					{data.socialLoginText}
				</b>
				<b className={$.option_headline}>{data.optionText}</b>
				<b className={$.register_form}>
					<Form
						fields={data.fields}
						submitActionText={data.submitActionText}
						onSubmit={refs => setValues(refs)}
					/>
				</b>
			</b>
		</b>
	);
};
