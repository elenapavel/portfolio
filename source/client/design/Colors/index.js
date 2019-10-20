import React, { Component } from "react";
import { keys } from "@nore/std/object";
import { toClipboard } from "@nore/std/dom";
import getColorByContrast from "./getColorByContrast.js";
import getSchemaByType from "./getSchemaByType.js";
import getColors from "./getColors.js";
import $, { css } from "./style.css";

const Palette = ({ collection, colors }) => (
	<b class={$.palette}>
		{keys(colors).map(key => {
			const color = colors[key];
			const textColor = getColorByContrast(color);

			const copyKey = () => toClipboard(`$color.${collection}.${key}`);
			const copyValue = () => toClipboard(colors[key]);

			return (
				<b class={$.palette_color} style={{ background: color }} key={key}>
					<code style={{ color: textColor }} onClick={copyKey}>
						{key}
					</code>
					<code style={{ color: textColor }} onClick={copyValue}>
						{colors[key]}
					</code>
				</b>
			);
		})}
	</b>
);

const Schema = ({ collection, colors }) => (
	<b class={$.schema}>
		<b class={$.schema_title}>{collection.replace(/[_.]/gi, " ")}</b>
		<b class={$.schema_palette}>
			<Palette collection={collection} colors={colors} />
		</b>
	</b>
);

export default () => {
	const colors = getColors();

	const schemas = [
		"red",
		"red_vivid",
		"orange",
		"orange_vivid",
		"yellow",
		"yellow_vivid",
		"lime",
		"lime_vivid",
		"green",
		"green_vivid",
		"teal",
		"teal_vivid",
		"cyan",
		"cyan_vivid",
		"light_blue",
		"light_blue_vivid",
		"blue",
		"blue_vivid",
		"indigo",
		"indigo_vivid",
		"purple",
		"purple_vivid",
		"magenta",
		"magenta_vivid",
		"pink",
		"pink_vivid",
	];

	const scales = [
		"neutral.cool",
		"neutral.blue",
		"neutral.grey",
		"neutral.warm",
	];

	return (
		<b class={$.container}>
			{scales.map(key => (
				<Schema
					key={key}
					collection={key}
					colors={getSchemaByType(colors, key, "scale")}
				/>
			))}

			{schemas.map(key => (
				<Schema
					key={key}
					collection={key}
					colors={getSchemaByType(colors, key, "schema")}
				/>
			))}
		</b>
	);
};
