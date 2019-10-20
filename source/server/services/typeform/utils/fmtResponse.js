export default function fmtResponse(response) {
	return {
		id: response.response_id,
		submittedAt: response.submitted_at,
		answers: response.answers.map(answer => ({
			field: answer.field.id,
			data: answer.text,
		})),
	};
}
