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
					value={item.recipientNumber}
					onChange={value => onChange({ ...item, recipientNumber: value })}
				/>
				<TextField
					type="simple"
					value={item.scope}
					onChange={value => onChange({ ...item, scope: value })}
				/>
				<TextField
					type="simple"
					value={item.note}
					onChange={value => onChange({ ...item, note: value })}
				/>
			</b>
		);
	}

	function onAdd() {
		return {
			number: "",
			recipient: "",
			recipientNumber: "",
			scope: "",
			note: "",
		};
	}

	return (
		<b class={$.table}>
			<b class={$.table_header}>
				<b title="Numărul și data înregistrării">Număr / Dată</b>
				<b title="Denumirea beneficiarului">Beneficiar</b>
				<b title="Numărul și data înregistrării din evidența beneficiarului">
					Contract beneficiar
				</b>
				<b
					title="Conținutul sintetic al obiectului contractului și data
					încheierii contractului"
				>
					Obiectivul
				</b>
				<b>Observații</b>
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
			.get("/api/copsi", { type: "contracts" })
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
			.post("/api/copsi/contracts", { data: { records } })
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
				<b class={$.title}>
					Registrul de evidență al contractelor de prestări servicii psihologice
				</b>

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
