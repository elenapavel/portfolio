import React from "react";
import PlantImage from "./PlantImage";
import PlantDetails from "./PlantDetails";
import Actions from "./Actions";
import Progress from "./Progress";
import $, { css } from "./style.css";

export default ({
	title,
	name,
	content,
	category,
	species,
	image,
	lastTitle,
	lastName,
	lastContent,
	lastCategory,
	lastSpecies,
	lastImage,
	label,
	lastIndex,
	currentIndex,
	total,
}) => (
	<div className={$.container}>
		<div className={$.to_top}>
			<div className={$.to_left}>
				<PlantImage
					title={name}
					subtitle={category}
					image={image}
					index={currentIndex}
					lastTitle={lastName}
					lastSubtitle={lastCategory}
					lastImage={lastImage}
					lastIndex={lastIndex}
				/>
			</div>
			<div className={$.to_right}>
				<PlantDetails
					title={title}
					content={content}
					label={species}
					lastTitle={lastTitle}
					lastContent={lastContent}
					lastLabel={lastSpecies}
				/>
			</div>
		</div>
		<div className={$.to_bottom}>
			<div className={$.to_left}>
				<Actions />
			</div>
			<div className={$.to_right}>
				<Progress
					label={label}
					lastIndex={lastIndex}
					index={currentIndex}
					total={total}
				/>
			</div>
		</div>
	</div>
);
