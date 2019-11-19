import React, { useState, useEffect, cloneElement } from "react";

import { isWeekend, parseISO } from "date-fns";

import Tabs from "~/client/components/Tabs";
import Calendar from "~/client/components/Calendar";

import SpecialDay from "./SpecialDay";
import DisplaySpecialDay from "./DisplaySpecialDay";

import $, { css } from "./style.css";

const viewTabs = ["YEAR", "MONTH"];

export default ({ data }) => {
	const [currentDate, setDate] = useState(data.date || new Date());
	const [view, setView] = useState("month");

	const onRender = ({ dayOfMonth, date }, cell) => {
		const content =
			dayOfMonth === 12 ? (
				<b>dev</b>
			) : (
				<b>
					{dayOfMonth}
					<SpecialDay date={date} specialDates={data.specialDates} />
				</b>
			);

		const isWeekendDay = isWeekend(date);

		const styles = {
			backgroundColor: isWeekendDay ? "rgba(0,0,0,0.1)" : "",
			padding: "0.75rem 0",
		};

		if (cell != null)
			return cloneElement(
				cell,
				{
					style: styles,
				},
				content
			);

		return content;
	};

	const onSelect = (date, dayOfMonth, type, cell) => {
		const styles = {
			borderColor: "yellow",
			padding: "0.75rem 0",
		};

		if (cell != null) {
			return cloneElement(
				cell,
				{
					style: styles,
				},
				<b>
					{dayOfMonth}
					<SpecialDay date={date} specialDates={data.specialDates} />
				</b>
			);
		}

		setDate(date);
	};

	return !currentDate ? null : (
		<b className={$.application}>
			<b className={$.tabs}>
				<Tabs
					items={viewTabs}
					containerBackground="#f9f9f9"
					active="1"
					onChange={label => setView(label)}
				/>
			</b>

			<Calendar
				currentDate={currentDate}
				view={view}
				onChangeView={
					view.toLowerCase() == "year" ? () => setView("month") : ""
				}
				onChange={onSelect}
				onRender={onRender}
			/>
			<b className={$.events_list}>
				<DisplaySpecialDay
					date={currentDate}
					title="Events"
					specialDates={data.specialDates}
				/>
			</b>
		</b>
	);
};
