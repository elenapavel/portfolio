import React, { useEffect } from "react";
// import { debounce } from "@nore/std/utils";
import pages from "./pages";
import $, { css } from "./style.css";

export default function Website(attrs) {
	// const [state, dispatch] = useReducer(reducer, initialState);

	return <b class={$.container}>{pages}</b>;
}
