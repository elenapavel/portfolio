import React from "react";
import $ from "./style.css";

export default ({ data, heading = null }) => (
	<b className={$.portfolio}>
		<b className={$.content}>
			<b className={$.to_left}>
				<b className={$.heading}>{heading || data.heading}</b>
				<b className={$.description}>{data.description}</b>
			</b>
			<b className={$.to_right}>
				<b className={$.items}>
					{data.items.map((item, key) => (
						<b className={$.item} key={key}>
							<b className={$.item_heading}>{item.heading}</b>
							<b className={$.item_description}>
								{item.description}
							</b>
						</b>
					))}
				</b>
			</b>
		</b>
		<b className={$.slider}>
			<b
				className={$.preview}
				style={{
					backgroundImage: `url(${data.preview}`,
				}}
			/>
			<b className={$.actions}>
				<b className={$.action_previous} />
				<b className={$.action_next} />
			</b>
		</b>
	</b>
);
