export default function emitter(events = Object.create(null)) {
	return {
		on(type, handler) {
			(events[type] || (events[type] = [])).push(handler);
		},

		off(type, handler) {
			if (events[type]) {
				events[type].splice(events[type].indexOf(handler) >>> 0, 1);
			}
		},

		emit(type, a, b, c) {
			if (events[type]) {
				for (const handler of events[type]) {
					handler(a, b, c);
				}
			}

			if (events["*"]) {
				for (const handler of events["*"]) {
					handler(type, a, b, c);
				}
			}
		},
	};
}
