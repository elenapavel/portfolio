import {
	startOfMonth,
	startOfWeek,
	getMonth,
	addDays,
	isSameMonth,
	isSameDay,
} from "date-fns";

export default function getMonthViewByDay(day, selected) {
	const items = [];

	const today = new Date();
	const month = getMonth(day);
	console.log(day);
	const getStartOfMonth = startOfMonth(day);
	const getStartOfWeek = startOfWeek(getStartOfMonth, { weekStartsOn: 1 });

	for (let i = 0; i < 42; ++i) {
		const date = addDays(getStartOfWeek, i);

		let type = "default";

		if (!isSameMonth(date, day)) {
			type = i < 21 ? "previous" : "next";
		} else {
			if (isSameDay(date, today)) {
				type = "current";

				if (isSameDay(today, selected)) {
					type = "current_selected";
				}
			} else if (isSameDay(date, selected)) {
				type = "selected";
			}
		}

		items.push({ type, date });
	}

	return items;
}
