import React from "react";

import BookCard from "./BookCard";

import $, { css } from "./style.css";

export default ({ items, view, label }) => (
	<div className={$.container}>
		{items.length == 0 ? null : <div className={$.label}>{label}</div>}
		{items.length == 0
			? null
			: items.map((item, key) => (
					<BookCard
						key={key}
						title={item.title}
						authors={item.authors}
						ratings={item.ratings}
						bookImage={item.bookImage}
						content={item.content}
						color={item.color}
						index={key}
					/>
			  ))}
	</div>
);
