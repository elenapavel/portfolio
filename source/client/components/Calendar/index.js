import React, { useState } from "react";
import {
	format,
	getYear,
	addMonths,
	subMonths,
	addYears,
	subYears,
} from "date-fns";
import getMonthViewByDay from "./getMonthViewByDay.js";
import Header from "./Header";
import WeekDays from "./WeekDays";
import Grid from "./Grid";
import Day from "./Day";
import $, { css } from "./style.css";

export default ({ onRender, view, onChange, onChangeView, currentDate }) => {
	const [date, setDate] = useState(new Date(currentDate) || Date());
	const [inViewDate, setInViewDate] = useState(
		new Date(currentDate) || Date()
	);
	const [year, setYear] = useState(getYear(currentDate) || Date());

	const onSelect = selected => {
		setDate(selected);
		setInViewDate(selected);

		if (typeof onChange === "function") {
			onChange(selected);
		}
		if (typeof onChangeView === "function") {
			onChangeView("month");
		}
	};

	const nextMonth = () => {
		const nextMonth = addMonths(inViewDate, 1);

		setDate(nextMonth);
		setInViewDate(nextMonth);
		setYear(getYear(nextMonth));
	};

	const prevMonth = () => {
		const prevMonth = subMonths(inViewDate, 1);

		setDate(prevMonth);
		setInViewDate(prevMonth);
		setYear(getYear(prevMonth));
	};

	const nextYear = () => {
		setYear(year + 1);
	};

	const prevYear = () => {
		setYear(year - 1);
	};

	const days = getMonthViewByDay(inViewDate, date);
	const labelSelectedMonth = format(inViewDate, "MMM");
	const labelSelectedYear = year;
	const label = `${labelSelectedMonth} ${labelSelectedYear}`;

	const items = days.map(({ date, type }) => (
		<Day date={date} type={type} onSelect={onSelect} onRender={onRender} />
	));

	return (
		<b>
			{view.toLowerCase() == "month" ? (
				<b className={$.calendar}>
					<Header label={label} next={nextMonth} prev={prevMonth} />
					<WeekDays />
					<Grid items={items} />
				</b>
			) : view.toLowerCase() == "year" ? (
				<b className={$.calendar}>
					<Header
						label={labelSelectedYear}
						next={nextYear}
						prev={prevYear}
					/>
					<b className={$.months}>
						{new Array(12).fill(null).map((index, key) => {
							const selectedDate = new Date(year, key);
							const labelMonth = format(selectedDate, "MMM");
							const selectedDays = getMonthViewByDay(
								selectedDate,
								date
							);

							const currentItems = selectedDays.map(
								({ date, type }) => (
									<Day date={date} type={type} />
								)
							);

							return (
								<b
									className={$.month}
									key={key}
									onClick={() => onSelect(selectedDate)}
								>
									<Header label={labelMonth} />
									<WeekDays isMultipleView="true" />
									<Grid items={currentItems} />
								</b>
							);
						})}
					</b>
				</b>
			) : null}
		</b>
	);
};
