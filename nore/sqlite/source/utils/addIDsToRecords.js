import { isArray } from "@nore/std/assert";

export default function addIDsToRecords(data, getID) {
	data = isArray(data) ? data : [data];

	for (const record of data) {
		if (!record.id) {
			record.id = getID();
		}
	}
}
