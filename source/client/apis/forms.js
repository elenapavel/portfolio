import { http } from "@nore/pwa";

export default {
	add(data) {
		return http.post("/api/forms", { data });
	},

	find(query = {}, filters = {}) {
		return http.get("/api/forms");
	},

	update(query, data) {
		return http.put("/api/forms", { query, data });
	},

	delete(id) {
		return http.delete("/api/forms", { id });
	},

	findBySlug(slug) {
		return http.get("/api/form", { slug });
	},
};
