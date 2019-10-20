module.exports = (content, map, meta) => {
	if (!content.includes("module.exports")) {
		return content;
	}

	return `
		import filter from "${__dirname}/filterClasses.js"

		${content.replace("module.exports", "const classes")}

		export const css = filter.bind(null, classes)
		export default classes
	`;
};
