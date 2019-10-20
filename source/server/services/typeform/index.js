import { log, plugin, define } from "@nore/cms";
import { createClient } from "@typeform/api-client";
import { pick } from "@nore/std/object";
import fmtFormFields from "./utils/fmtFormFields.js";
import fmtResponse from "./utils/fmtResponse.js";

define("github-portfolio/typeform", async () => {
	const typeform = createClient({
		token: CONFIG.typeform.key,
	});

	return {
		async forms(options = {}) {
			const reply = await typeform.forms.list();

			return reply.items.map(form => pick(form, ["id", "title"]));
		},

		async form(id) {
			const formReply = await typeform.forms.get({ uid: id });
			const responsesReply = await typeform.responses.list({
				completed: true,
				uid: id,
			});

			const form = pick(formReply, ["id", "title"]);

			form.fields = fmtFormFields(formReply.fields);
			form.responses = responsesReply.items.map(fmtResponse);

			return form;
		},
	};
});
