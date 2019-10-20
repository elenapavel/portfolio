import React, { useReducer } from "react";
import { Slot } from "@nore/pwa";
import Navigation from "./Navigation";
import Bar from "./Bar";
import initial from "./state.js";
import reducer from "./reducer.js";
import $, { css } from "./style.css";

Panel.State = React.createContext(null);
Panel.Dispatch = React.createContext(null);

export default function Panel(attrs) {
	const [state, dispatch] = useReducer(reducer, initial);

	return (
		<Panel.Dispatch.Provider value={dispatch}>
			<Panel.State.Provider value={state}>
				<b class={css("container", attrs.className)}>
					<Bar />
					<Navigation />

					<b class={$.content}>
						<Slot name="panel.content">{attrs.children}</Slot>
					</b>
				</b>
			</Panel.State.Provider>
		</Panel.Dispatch.Provider>
	);
}

