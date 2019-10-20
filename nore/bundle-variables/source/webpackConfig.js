import { VirtualModule } from "@nore/webpack";
import toJSONFormat from "./utils/toJSONFormat.js";

export default async bundle => {
	const variables = await bundle.variables.load();
	const name = "@nore/variables.json";

	const virtualModule = new VirtualModule({
		name: name,
		source: toJSONFormat(variables),
	});

	if (bundle.isDevelopment) {
		bundle.variables.watch(variables => {
			// trigger webpack compilation restart
			virtualModule.write(name, toJSONFormat(variables));
		});
	}

	return {
		plugins: [virtualModule],
	};
};
