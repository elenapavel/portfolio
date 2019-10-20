export default class PluginError extends Error {
	constructor(message, data = null) {
		super();

		this.name = "PluginError";
		this.data = data;

		switch (message) {
			case PluginError.NOT_FOUND:
				this.message = `The plugin "${data}" was not found`;
				break;

			case PluginError.DISABLED:
				this.message = `The plugin "${data}" is disabled`;
				break;

			case PluginError.SETTINGS:
				// TODO: better format error messages
				this.message = `${data.handle}: ${data.errors[0].message}`;
				break;

			case PluginError.MISSING_DEPENDENCY:
				this.message = `Missing dependency "${data.dependency}" for plugin "${data.handle}"`;
				break;

			default:
				this.message = message;
		}

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, PluginError);
		}
	}
}

PluginError.SETTINGS = Symbol.for("nore.plugin.settings");
PluginError.DISABLED = Symbol.for("nore.plugin.disabled");
PluginError.NOT_FOUND = Symbol.for("nore.plugin.not_found");
PluginError.MISSING_DEPENDENCY = Symbol.for("nore.plugin.missing_dependency");
