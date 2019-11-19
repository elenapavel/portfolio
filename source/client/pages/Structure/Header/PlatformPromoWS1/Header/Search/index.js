import React, { useState, useRef, useEffect } from "react";
import $ from "./style.css";

export default ({ isSearchVisible, onChange }) => {
	const [searchState, toggleSearchVisibility] = useState(isSearchVisible);
	const inputEl = useRef(null);

	useEffect(() => {
		if (searchState)
			setTimeout(() => {
				inputEl.current.focus();
			}, 300);
	}, [isSearchVisible]);

	const searchIconClasses = `${$.search_icon} ${
		isSearchVisible ? "ion-android-close" : "ion-android-search"
	}`;
	const searchInputClass = `${
		isSearchVisible ? $.search_input_visible : $.search_input_hidden
	}`;

	return (
		<b className={$.search}>
			<b
				className={searchIconClasses}
				onClick={() => {
					toggleSearchVisibility(!searchState);
					onChange(!searchState);
				}}
			/>
			<b className={searchInputClass}>
				<input
					type="text"
					defaultValue=""
					ref={inputEl}
					placeholder="Search..."
				/>
			</b>
		</b>
	);
};
