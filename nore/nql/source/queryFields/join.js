import { isArray } from "@nore/std/assert";
import { getTable } from "../utils";
import fmtColumns from "./columns.js";
import fmtTable from "./table.js";

function toCondition(from, to, conditions) {
	const columns = [];

	for (const column in conditions) {
		columns.push(`"${from}"."${column}" = "${to}"."${conditions[column]}"`);
	}

	return columns.join(", ");
}

function fmtJoin(data, query, result) {
	const table = getTable(query);
	const joinedTable = getTable(data);
	const type = data.type ? data.type.toUpperCase() : "INNER";
	const condition = toCondition(table, joinedTable, data.on);

	if (data.columns) {
		result.columns += `, ${fmtColumns(data.columns, data)}`;
	}

	return `${type} JOIN ${fmtTable(data.table)} ON ${condition}`;
}

export default (data, query, build, result) => {
	const toJoin = isArray(data) ? data : [data];

	return toJoin.map(data => fmtJoin(data, query, result)).join(" ");
};
