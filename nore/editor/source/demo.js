import $, { css } from "./style.css";

export function sample(schema) {
	return schema.node("document", null, [
		schema.node("paragraph", null, [
			schema.text(
				"The group or space-separated groups to which this node belongs, which can be referred to in the content expressions for the schema. "
			),
		]),
		schema.node("paragraph", null, [
			schema.text("qwe "),
			schema.text("asd ", [schema.mark("em")]),
			schema.text("zxc ", [schema.mark("strong")]),
		]),
		schema.node("list", { isOrdered: true }, [
			schema.node("list_item", { level: 2 }, [
				schema.node("paragraph", null, [
					schema.text("qwe "),
					schema.text("asd ", [schema.mark("em")]),
					schema.text("zxc ", [schema.mark("strong")]),
				]),
			]),
		]),
	]);
}

export const circleNode = {
	inline: true,
	group: "inline",
	draggable: true,
	selectable: false,
	attrs: {
		class: { default: $.circle_node },
		"node-type": { default: "circle" },
	},
	parseDOM: [{ tag: "span[node-type=circle]" }],
	toDOM: node => ["span", node.attrs],
};

