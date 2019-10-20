import state from "./state.js";

export default function on(event, handler) {
	switch (event) {
		case "ready":
			state.events.ready.add(handler);
			break;
		case "final":
			state.events.final.add(handler);
			break;
		case "terminate":
			state.events.terminate.add(handler);
			break;
		default:
			throw Error(`There is no global event: ${event}`);
	}
}
