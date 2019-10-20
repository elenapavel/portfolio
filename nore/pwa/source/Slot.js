import React, { createElement, isValidElement } from "react";
import { useReducer, useEffect, useRef, useContext } from "react";

const State = React.createContext(null);
const Dispatch = React.createContext(null);

function reducer(state, { type, name, ref }) {
	const slotMap = { ...state };

	switch (type) {
		case "add":
			(slotMap[name] || (slotMap[name] = [])).push(ref);
			break;

		case "remove":
			slotMap[name].splice(slotMap[name].indexOf(ref) >>> 0, 1);
			break;

		default:
			throw Error("Slot: action not found.");
	}

	return slotMap;
}

function Slot({ children, render, name, order = 1 }) {
	const state = useContext(State);
	const refs = state[name];
	const byOrder = (a, b) => (a.order > b.order ? 1 : -1);
	const items = refs ? refs.map(ref => ref.current) : [];

	if (render) {
		return items.sort(byOrder).map((item, key) => {
			return createElement(render, { ...item.args, key });
		});
	}

	if (children != null) {
		items.push({ order, content: children });
	}

	return items.sort(byOrder).map(item => item.content);
}

function Portal({ children, to, render, order = 1 }) {
	const dispatch = useContext(Dispatch);
	const ref = useRef("¡!");

	useEffect(() => {
		ref.current = { order, content: children, args: render };

		dispatch({ type: "add", name: to, ref });

		return () => dispatch({ type: "remove", name: to, ref });
	}, [to, children, render, order]);

	return null;
}

function Provider(attrs) {
	const [state, dispatch] = useReducer(reducer, {});

	return (
		<Dispatch.Provider value={dispatch}>
			<State.Provider value={state}>{attrs.children}</State.Provider>
		</Dispatch.Provider>
	);
}

Slot.State = State;
Slot.Dispatch = Dispatch;
Slot.Portal = Portal;
Slot.Provider = Provider;

export default Slot;
