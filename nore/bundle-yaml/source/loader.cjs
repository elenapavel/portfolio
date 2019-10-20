const yaml = require("yaml");

module.exports = function yamlLoader(source) {
	try {
		const content = yaml.parse(source);
		const module = JSON.stringify(content);

		return `export default ${module}`;
	} catch (error) {
		this.emitError(error);
	}
}
