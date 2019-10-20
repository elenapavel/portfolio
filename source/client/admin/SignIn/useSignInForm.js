import { useField, useForm, schema } from "~/components/Form";
import { http } from "@nore/pwa";
import $accounts from "~/client/apis/accounts";

const { and, min, max, message, required } = schema;

const validateLogin = and(
	required(),
	message(min(5), "Minimum 5 characters are required.")
);

const validatePassword = and(
	required(),
	message(min(8), "Minimum 8 characters are required."),
	message(max(32), "Maximum 32 characters are allowed.")
);

export default function useSignInForm(onSubmit) {
	const login = useField({
		name: "login",
		value: "",
		validate: validateLogin,
	});

	const password = useField({
		name: "password",
		value: "",
		validate: validatePassword,
	});

	const fields = [login, password];
	const form = useForm({ fields, onSubmit });

	function onSubmit({ login, password }) {
		return $accounts.signin(login, password).catch(error => {
			form.setError(error);
		});
	}

	return { form, login, password };
}
