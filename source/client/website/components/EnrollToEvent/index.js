import React, { useState, useRef } from "react";
import { http } from "@nore/pwa";
import useOnEscOrOutsideClick from "~/client/hooks/useOnEscOrOutsideClick";
import { useField, useForm, schema } from "~/components/Form";
import TextField from "~/components/TextField";
import Button from "~/components/Button";
import $, { css } from "./style.css";

import IconClose from "assets/icons/feather/x.svg?inline";

export default function EnrollToEvent({ event, onClose }) {
	const [isEnrolled, setIsEnrolled] = useState(false);
	const ref = useRef(null);

	const name = useField({
		name: "name",
		value: "",
		validate: schema.required(),
	});

	const phone = useField({
		name: "phone",
		value: "",
		validate: schema.required(),
	});

	const form = useForm({ fields: [name, phone], onSubmit, onReset });

	useOnEscOrOutsideClick(ref, true, onClose);

	function onReset() {
		form.fields.map(f => f.change(""));
	}

	function onSubmit(person) {
		const data = { ...person, event: event.name };

		http
			.post("/api/enroll", { data })
			.then(reply => {
				setIsEnrolled(true);
			})
			.catch(reply => {
				console.log("HTTP Error", reply);
			});
	}

	return (
		<b class={$.container}>
			<b ref={ref} class={$.content}>
				<b class={$.close} onClick={onClose}>
					<IconClose />
				</b>

				{isEnrolled ? (
					<>
						<b class={$.title}>Te așteptăm cu drag!</b>

						<b class={$.confirmation}>
							După stabilirea datei evenimentului vei fi contactat(ă) pt.
							confimarea prezenței.
						</b>

						<Button label="Închide" type="flat" onClick={onClose} />
					</>
				) : (
					<>
						<b class={$.title}>{event.name}</b>
						<b class={$.subtitle}>Înscrie-te la eveniment</b>

						{!event.message ? null : <b class={$.note}>{event.message}</b>}

						<TextField
							label="Nume"
							name={name.name}
							value={name.value}
							error={name.error}
							onChange={name.change}
						/>

						<TextField
							label="Telefon"
							name={phone.name}
							value={phone.value}
							error={phone.error}
							onChange={phone.change}
						/>

						<Button
							label="Trimite"
							type="flat"
							is="primary"
							onClick={form.submit}
						/>
					</>
				)}
			</b>
		</b>
	);
}
