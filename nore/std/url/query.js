import { ArgumentError } from "../error";
import { isString, isArray, isObject } from "../assert";

const MATCH_SPECIAL_CHARS = /[!'()*]/g;

function toCharCode(value) {
	const code = value
		.charCodeAt(0)
		.toString(16)
		.toUpperCase();

	return `%${code}`;
}

function encode(value) {
	return encodeURIComponent(value).replace(MATCH_SPECIAL_CHARS, toCharCode);
}

function decode(value) {
	return decodeURIComponent(value);
}

function parse(query) {
	if (!isString(query)) {
		throw new ArgumentError("query", "string", query);
	}

	function formatter(key, value, accumulator) {
		if (accumulator[key] === undefined) {
			accumulator[key] = value;
		} else {
			accumulator[key] = [].concat(accumulator[key], value);
		}
	}

	// Create an object with no prototype
	const result = Object.create(null);

	if (typeof query !== "string") {
		return result;
	}

	query = query.trim().replace(/^[?#&]/, "");

	if (!query) {
		return result;
	}

	for (const param of query.split("&")) {
		let [key, value] = param.replace(/\+/g, " ").split("=");

		// Missing `=` should be `null`:
		// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
		value = value === undefined ? null : decode(value);

		formatter(decode(key), value, result);
	}

	return result;
}

function stringify(input) {
	if (!isObject(input)) {
		throw new ArgumentError("input", "string", input);
	}

	function toSegment(key) {
		const value = input[key];

		if (value === undefined) return "";
		if (value === null) return encode(key);

		if (isArray(value)) {
			const cloned = value.slice();
			const result = [];

			for (const value of cloned) {
				if (value === undefined) continue;

				if (value === null) {
					result.push(encode(key));
				} else {
					result.push([encode(key), "=", encode(value)].join(""));
				}
			}

			return result.join("&");
		}

		return encode(key) + "=" + encode(value);
	}

	const keys = Object.keys(input);

	return keys
		.map(toSegment)
		.filter(x => x.length > 0)
		.join("&");
}

export default { parse, stringify };
