import { useState, useRef } from "react";

const required = ["name", "value"];

export default function useField(options) {
	for (const field of required) {
		if (options[field] === undefined) {
			throw Error(`Missing "${field}" option in useField(...).`);
		}
	}

	const [value, setValue] = useState(options.value);
	const [error, setError] = useState(null);
	const ref = useRef(null);

	function change(value) {
		if (error) validate(value);
		setValue(value);
	}

	function validate($value) {
		// ignore if no validation option
		if (!options.validate) return null;

		const result = options.validate($value || value);
		// validate returns an error or null if none
		const error = result === true ? null : result;

		setError(error);
		return error;
	}

	return {
		ref,
		value,
		error,
		change,
		validate,
		name: options.name,
		element: ref.current,
	};
}
