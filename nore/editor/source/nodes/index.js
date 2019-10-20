import map from "orderedmap";
import blockquote from "./blockquote.js";
import code_block from "./code_block.js";
import document from "./document.js";
import heading from "./heading.js";
import horizontal_rule from "./horizontal_rule.js";
import image from "./image.js";
import line_break from "./line_break.js";
import { list, list_item } from "./list.js";
import paragraph from "./paragraph.js";
import text from "./text.js";

// order matters
export default map.from({
	document,
	text,
	paragraph,
	blockquote,
	code_block,
	heading,
	horizontal_rule,
	image,
	line_break,
	list,
	list_item,
});
