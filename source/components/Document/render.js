import React, { createElement } from "react";
import { isArray } from "@nore/std/assert";
import { Link, Title } from "@nore/pwa";

function toList(node) {
	const tag = node.attributes.isOrdered ? "ol" : "ul";
	const children = node.content.map(toElement);

	return createElement(tag, null, ...children);
}

function toHeading(node) {
	const tag = `h${node.attributes.level}`;
	const children = node.content.map(toElement);

	return createElement(tag, null, ...children);
}

function toImage(node) {
	const { source, title, alt } = node.attributes;

	return <img src={source} title={title} alt={alt} />;
}

function toTable(node) {
	switch (node.type) {
		case "table":
			const tr = node.content.shift();
			const { isHeader } = tr.attributes;

			return (
				<table>
					{isHeader ? <thead>{toTable(tr)}</thead> : toTable(tr)}
					<tbody>{node.content.map(toTable)}</tbody>
				</table>
			);

		case "table_row":
			return <tr>{node.content.map(toTable)}</tr>;

		case "table_cell":
			return <td>{node.content.map(toTable)}</td>;

		default:
			return toElement(node);
	}
}

function toElement(node) {
	switch (node.type) {
		case "text":
			return node.content;

		case "paragraph":
			return <p>{node.content.map(toElement)}</p>;

		case "code_block":
			return <pre>{node.content}</pre>;

		case "code":
			return <code>{node.content}</code>;

		case "yaml_block":
			return <pre>{node.type}</pre>;

		case "list":
			return toList(node);

		case "list_item":
			return <li>{node.content.map(toElement)}</li>;

		case "table":
			return toTable(node);

		case "heading":
			return toHeading(node);

		case "blockquote":
			return <blockquote>{node.content.map(toElement)}</blockquote>;

		case "image":
			return toImage(node);

		default:
			throw Error(`Invalid node type: "${node.type}"`);
	}
}

export default function render(data) {
	return isArray(data) ? data.map(toElement) : toElement(data);
}
