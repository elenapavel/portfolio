import React, { useEffect } from "react";
import { http } from "@nore/pwa";
import { useField, useForm, schema } from "~/components/Form";
import $accounts from "~/client/apis/accounts";

const { and, min, message, required } = schema;

const validateTitle = message(
	min(8),
	"Minimum 8 characters are required for the article title."
);

const validateContent = message(
	min(160),
	"Minimum 160 characters are required for the article content."
);

export default function useArticleForm(data = {}) {
	const title = useField({
		name: "title",
		value: data.title,
		validate: validateTitle,
	});

	const content = useField({
		name: "content",
		value: data.content,
		validate: validateContent,
	});

	const fields = [title, content];
	const form = useForm({ fields, onSubmit });

	function onSubmit(data) {
		console.log("article submit", data);
	}

	return { form, title, content };
}
