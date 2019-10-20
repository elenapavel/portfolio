import { set, get, assign } from "@nore/std/object";
import { emitter } from "@nore/std/utils";

export default function store(data = {}) {
	const store = emitter();

	store.data = data;

	store.set = (path, value) => {
		set(store.data, path.split("."), value);
		store.emit(path, value);
	};

	store.get = path => {
		return get(store.data, path.split("."));
	};

	store.change = update => {
		const oldData = store.data;

		store.data = assign({}, oldData, update);
		store.emit("change", store.data, oldData);
	};

	// overwrite state, don't merge
	store.reset = (data = {}) => {
		const oldData = store.data;

		store.data = data;
		store.emit("change", store.data, oldData);
	};

	return store;
}
