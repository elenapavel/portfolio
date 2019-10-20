// import "quill/dist/quill.bubble.css?raw";
import React, { useState } from "react";
import { Fonts, Sizes } from "~/components/HTMLEditor/settings";
import HTMLEditor from "~/components/HTMLEditor";
import $, { css } from "./style.css";

const settings = {
	// theme: "bubble",
	formats: ["size", "bold", "italic", "color", "bullet", "link", "image"],
	modules: {
		imageDrop: true,
		imageResize: {
			modules: ["Resize", "DisplaySize", "Toolbar"],
		},
		toolbar: [
			[
				{ font: Fonts.whitelist },
				{ size: Sizes.whitelist },
				{
					color: [
						"#EF4E4E",
						"#F7D070",
						"#57AE5B",
						"#2186EB",
						"#DA4A91",
						"#486581",
					],
				},
			],
			["bold", "italic", "underline", "image"],
		],
	},
};

export default attrs => (
	<HTMLEditor {...attrs} settings={settings} class={$.container} />
);
