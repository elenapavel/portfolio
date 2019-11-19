import React from "react";
import Actions from "./Actions";

import $, { css } from "./style.css";

export default ({ index, total }) => {
	const formattedIndex =
		parseInt(index) + 1 < 10
			? "0" + (parseInt(index) + 1)
			: parseInt(index) + 1;
	const formattedTotal =
		parseInt(total) < 10 ? "0" + parseInt(total) : parseInt(total);

	return (
		<b className={$.progress_container}>
			<b className={$.to_left}>
				<Actions />
			</b>
			<b className={$.progress_to_right}>
				{formattedIndex} / {formattedTotal}.
			</b>
			<b className={$.progress_bar}>
				<b
					className={$.progress_bar_separator}
					style={{ width: `${(index + 1) * (100 / total)}%` }}
				/>
			</b>
		</b>
	);
};
