import { useReducer } from "react";

const required = ["fields", "onSubmit"];

function reducer(state, [field, value]) {
	return { ...state, [field]: value };
}

export default function useForm(options) {
	for (const field of required) {
		if (options[field] === undefined) {
			throw Error(`Missing "${field}" option in useForm(...).`);
		}
	}

	const [state, dispatch] = useReducer(reducer, {
		isDisabled: false,
		isValid: null,
		error: null,
	});

	function submit() {
		const { fields, onSubmit } = options;
		const invalid = fields.filter(field => field.validate());

		if (invalid.length) {
			const el = invalid[0].element;
			if (el && el.focus) el.focus();

			return dispatch(["isValid", false]);
		}

		const data = {};

		for (const field of fields) {
			data[field.name] = field.value;
		}

		dispatch(["isDisabled", true]);
		dispatch(["isValid", true]);
		dispatch(["error", null]);

		return Promise.resolve(onSubmit(data)).then(result => {
			dispatch(["isDisabled", false]);

			// reset form data
			if (options.onReset) options.onReset();

			return result;
		});
	}

	function setError(error) {
		dispatch(["error", error]);
	}

	function onEnter(event) {
		if (event.key === "Enter" && !state.isDisabled) {
			submit();
		}
	}

	return {
		...state,
		setError,
		submit,
		onEnter,
		fields: options.fields,
	};
}
