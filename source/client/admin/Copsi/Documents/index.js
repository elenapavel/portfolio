import React, { useState, useEffect } from "react";
import { http } from "@nore/pwa";
import TextField from "~/components/TextField";
import Button from "~/components/Button";
import RepeaterField from "$admin/components/RepeaterField";
import $, { css } from "./style.css";

const Table = ({ records, onChange, onRemove }) => {
	function onRender({ item, index, onChange }) {
		return (
			<b class={$.row}>
				<TextField
					type="simple"
					value={item.number}
					onChange={value => onChange({ ...item, number: value })}
				/>
				<TextField
					type="simple"
					value={item.recipient}
					onChange={value => onChange({ ...item, recipient: value })}
				/>
				<TextField
					type="simple"
					value={item.speciality}
					onChange={value => onChange({ ...item, speciality: value })}
				/>
				<TextField
					type="simple"
					value={item.scope}
					onChange={value => onChange({ ...item, scope: value })}
				/>
				<TextField
					type="simple"
					value={item.stamp}
					onChange={value => onChange({ ...item, stamp: value })}
				/>
				<TextField
					type="simple"
					value={item.signature}
					onChange={value => onChange({ ...item, signature: value })}
				/>
			</b>
		);
	}

	function onAdd() {
		return {
			number: "",
			recipient: "",
			speciality: "",
			scope: "",
			stamp: "",
			signature: "",
		};
	}

	return (
		<b class={$.table}>
			<b class={$.table_header}>
				<b title="Numărul și data înregistrării (ora, ziua, luna, anul)">
					Nr. / data
				</b>
				<b title="Denumirea beneficiarului/CNP (nume și prenume)">Beneficiar</b>
				<b title="Specialitatea (Ex. psihologie clinică, psihologia muncii și organizatională, psihologia transporturilor, etc.)">
					Specialitatea
				</b>
				<b title="Denumirea (aviz psihologic, raport de evaluare psihologică, raport de expertiză psihologică) și concluziile sumare ale actului profesional (apt/inapt)">
					Denumire / obiectiv
				</b>
				<b title="Seria și numărul timbrului sau matca timbrului profesional (aplicată prin lipire)">
					Timbru
				</b>
				<b title="Semnătura beneficiarului serviciilor psihologice">
					Semnătura
				</b>
			</b>

			<RepeaterField
				items={records}
				onAdd={onAdd}
				onChange={onChange}
				onRender={onRender}
				onRemove={onRemove}
			/>
		</b>
	);
};

export default () => {
	const [isLoading, setIsLoading] = useState(true);
	const [records, setRecords] = useState([]);

	useEffect(() => {
		http
			.get("/api/copsi", { type: "documents" })
			.then(reply => {
				setIsLoading(false);
				setRecords(reply.body.data);
			})
			.catch(error => {
				setIsLoading(false);
				console.log("HTTP error", error);
			});
	}, []);

	if (isLoading) return <b class={$.loading}>Loading...</b>;

	function onSave() {
		setIsLoading(true);

		http
			.post("/api/copsi/documents", { data: { records } })
			.then(reply => {
				setIsLoading(false);
			})
			.catch(error => {
				setIsLoading(false);
				console.log("HTTP error", error);
			});
	}

	function onRemove(item) {
		if (item.id) {
			http
				.delete(`/api/copsi/${item.id}`)
				.then(reply => {
					setIsLoading(false);
				})
				.catch(error => {
					setIsLoading(false);
					console.log("HTTP error", error);
				});
		}
	}

	return (
		<b class={$.container}>
			<b class={$.content}>
				<b class={$.title}>Registrul de evidență al actelor profesionale</b>

				<Table
					records={records || []}
					onChange={records => setRecords(records)}
					onRemove={onRemove}
				/>

				<b class={$.save}>
					<Button is="primary" label="Save" onClick={onSave} />
				</b>
			</b>
		</b>
	);
};
