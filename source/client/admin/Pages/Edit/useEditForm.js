import { useField, useForm, schema } from "~/components/Form";
import { http, store } from "@nore/pwa";
import $accounts from "~/client/apis/accounts";

const { and, min, max, message, required } = schema;

export default (page = {}) => {
	const name = useField({
		name: "name",
		value: page.name,
		validate: required(),
	});

	const path = useField({
		name: "path",
		value: page.path,
		validate: required(),
	});

	const layout = useField({
		name: "layout",
		value: page.layout,
	});

	const state = useField({
		name: "state",
		value: page.state,
		validate: required(),
	});

	const title = useField({
		name: "title",
		value: page.title,
		validate: required(),
	});

	const description = useField({
		name: "description",
		value: page.description,
		validate: required(),
	});

	const data = useField({
		name: "data",
		value: page.data,
	});

	const fields = [name, path, layout, state, title, description, data];
	const form = useForm({ fields, onSubmit });

	function onSubmit(data) {
		const { id } = store.get("url.query");

		http
			.post(`/api/pages/${id}`, { data })
			.then(reply => {
				// TODO: add notification
				console.log(reply);
			})
			.catch(reply => {
				console.log("HTTP error", reply);
			});
	}

	return {
		form,
		fields: { name, path, layout, state, title, description, data },
	};
};
