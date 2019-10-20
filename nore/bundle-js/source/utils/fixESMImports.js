function fixModuleImport(module) {
	if (Array.isArray(module)) {
		if (module[0].default) {
			module[0] = module[0].default;
		}
	} else {
		if (module.default) {
			return module.default;
		}
	}

	return module;
}

// Babel throws an error as `.default` is not a valid plugin property
// this fixes the incompatibility between ESM and CJS
export default function fixESMImports(config) {
	config.plugins = config.plugins.map(fixModuleImport);
	config.presets = config.presets.map(fixModuleImport);

	return config;
}
