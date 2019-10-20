import AJV from "ajv";

const settings = {
	removeAdditional: "all",
	coerceTypes: true,
	useDefaults: true,
	allErrors: true,
};

export default new AJV(settings);
