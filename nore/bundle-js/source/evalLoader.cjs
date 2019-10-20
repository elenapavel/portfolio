const isFunction = v => typeof v === "function";

module.exports = async function(source, map) {
	this.cacheable(false);

	const { bundle } = this.query;
	const module = await import(this.resourcePath);
	const toExport = module.default;
	const result = isFunction(toExport) ? await toExport(bundle) : toExport;
	const exported = JSON.stringify(result);

	return `export default ${exported}`;
};
