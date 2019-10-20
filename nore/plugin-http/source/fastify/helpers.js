import { isString } from "@nore/std/assert";
import HTTPError from "./HTTPError.js";

export function replyError(code, data) {
	const body = typeof data === "string" ? { message: data } : data;

	return new HTTPError(code, body);
}

export function replySuccess(data) {
	return !data ? { success: true } : isString(data) ? { message: data } : data;
}
