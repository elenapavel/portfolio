import React, { useState, useEffect, cloneElement } from "react";

import isWeekend from "date-fns/is_weekend";

import Tabs from "$website/components/Tabs";
import Calendar from "$website/components/Calendar";

import SpecialDay from "./SpecialDay";
import DisplaySpecialDay from "./DisplaySpecialDay";

import $, { css } from "./style.css";

const viewTabs = ["YEAR", "MONTH"];

export default ({ data }) => {
	const [currentDate, setDate] = useState("2019-10-21");
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

	return (
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
				currentData={currentDate}
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
