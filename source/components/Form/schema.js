import { isString, isArray, isBoolean } from "@nore/std/assert";
import { keys } from "@nore/std/object";

const EMAIL_REGEX = /^[a-z0-9_\-\.]{2,}@[a-z0-9_\-\.]{2,}\.[a-z]{2,}$/i;

export function string(value) {
	return isString(value);
}

export function array(value) {
	return isArray(value);
}

export function email(value) {
	return EMAIL_REGEX.test(value);
}

export function required(msg) {
	return message(and(string, not(empty)), msg || "Field is required.");
}

export function and(...fns) {
	return value => {
		for (const fn of fns) {
			const result = fn(value);

			if (result !== true) {
				return result;
			}
		}

		return true;
	};
}

export function not(test) {
	return value => !test(value);
}

export function empty(value) {
	return value.length === 0;
}

export function min(n) {
	return value => {
		return value && n <= value.length;
	};
}

export function max(n) {
	return value => {
		return value && value.length <= n;
	};
}

export function message(test, message) {
	return value => {
		return test(value) !== true ? message : true;
	};
}

export function validate(schema, data) {
	const errors = {};

	for (const key in schema) {
		const test = schema[key];
		const value = data[key];
		const result = test(value);

		if (result !== true) {
			errors[key] = result || null;
		}
	}

	return keys(errors).length > 0 ? errors : null;
}
