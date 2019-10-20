import Quill from "quill";
import ImageResize from "./ImageResize";
import ImageDrop from "./ImageDrop";

export const Fonts = Quill.import("formats/font");
export const Sizes = Quill.import("attributors/style/size");

Fonts.whitelist = ["notosans", "notoserif"];
Sizes.whitelist = [
	"0.875rem",
	"1rem",
	"1.125rem",
	"1.25rem",
	"1.5rem",
	"1.75rem",
];

Quill.register(Fonts, true);
Quill.register(Sizes, true);
Quill.register("modules/imageResize", ImageResize);
Quill.register("modules/imageDrop", ImageDrop);

const settings = {
	onChangeDelay: 300,
	debug: "error",
	theme: "snow",
	formats: [
		"header",
		"font",
		"size",
		"bold",
		"italic",
		"underline",
		"strike",
		"blockquote",
		"list",
		"color",
		"background",
		"bullet",
		"indent",
		"link",
		"image",
		"video",
	],
	modules: {
		imageDrop: true,
		imageResize: {
			modules: ["Resize", "DisplaySize", "Toolbar"],
		},
		toolbar: [
			[
				{ size: Sizes.whitelist },
				{ font: Fonts.whitelist },
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
				{
					background: [
						"#FFBDBD",
						"#FCEFC7",
						"#C1EAC5",
						"#BAE3FF",
						"#FAB8D9",
						"#D9E2EC",
					],
				},
			],
			[{ header: "1" }, { header: "2" }],
			["bold", "italic", "underline"],
			[{ list: "ordered" }, { list: "bullet" }, "blockquote", "image"],
		],
		clipboard: {
			// toggle to add extra line breaks when pasting HTML:
			matchVisual: false,
		},
	},
};

export default settings;
