import React, { useState } from "react";
import Card from "./Card";
import $ from "./style.css";

export default ({ data, heading = null }) => {
	const [selectedCard, onSelectPlan] = useState(null);

	return (
		<b className={$.section}>
			<b className={$.heading}>{data.heading}</b>
			<b className={$.plans}>
				{data.cards.map((card, key) => (
					<b className={$.item} key={key}>
						<Card
							label={card.label}
							description={card.description}
							price={card.price}
							link={card.link}
							index={key}
							isSelected={selectedCard == key}
							onSelect={index =>
								onSelectPlan(
									selectedCard == index ? null : index
								)
							}
						/>
					</b>
				))}
			</b>
		</b>
	);
};
