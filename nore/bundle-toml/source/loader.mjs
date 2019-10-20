const toml = require("toml");

module.exports = function tomlLoader(source) {
	try {
		const content = toml.parse(source);
		const module = JSON.stringify(content);

		return `export default ${module}`;
	} catch (error) {
		this.emitError(error);
	}
};
