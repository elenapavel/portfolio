import React from "react";

import Search from "./Search";
import Categories from "./Categories";
import BookList from "./BookList";

import $, { css } from "./style.css";

export default ({ view, books, label }) => (
	<b className={$.container}>
		<b
			class={$.container_shadow}
			style={{ opacity: view == "myAccount" ? 0 : 1 }}
		/>
		{view == "myAccount" ? null : (
			<b>
				<Search />
				{view == "orders" ? null : <Categories />}
			</b>
		)}
		<BookList items={books} view={view} label={label} />
	</b>
);
