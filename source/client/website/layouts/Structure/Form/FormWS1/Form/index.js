import React, { useState } from "react";
import $ from "./style.css";

export default ({
	fields,
	submitActionText,
	submitActionBackground,
	onSubmit = () => {},
}) => {
	const [inputs, setInputs] = useState();

	const handleInputChange = event => {
		event.persist();
		setInputs(inputs => ({
			...inputs,
			[event.target.name]: event.target.value,
		}));
	};

	const handleSubmit = () => {
		console.log(inputs);

		onSubmit(inputs);
	};

	return (
		<b className={$.form}>
			{fields.map((field, key) => {
				const iconClasses = `${$.field_icon} ${field.icon}`;
				const fieldClasses = `${
					field.icon ? $.field_has_icon : $.field
				}`;

				if (field.type != null && field.type != "textarea")
					return (
						<b
							key={key}
							className={fieldClasses}
							style={{
								backgroundColor: field.background
									? field.background
									: null,
							}}
						>
							{field.icon != null ? (
								<b className={iconClasses} />
							) : null}
							<input
								type={field.type}
								placeholder={field.placeholder}
								name={field.ref}
								onBlur={handleInputChange}
								defaultValue=""
							/>
						</b>
					);
				else
					return (
						<b
							key={key}
							className={fieldClasses}
							style={{
								backgroundColor: field.background
									? field.background
									: null,
							}}
						>
							{field.icon != null ? (
								<b className={iconClasses} />
							) : null}
							<textarea
								placeholder={field.placeholder}
								name={field.ref}
								onBlur={handleInputChange}
								defaultValue=""
							/>
						</b>
					);
			})}
			<b
				className={$.submit_action}
				onClick={() => handleSubmit()}
				style={{
					backgroundColor: submitActionBackground
						? submitActionBackground
						: null,
				}}
			>
				{submitActionText ? submitActionText : "Register"}
			</b>
		</b>
	);
};
