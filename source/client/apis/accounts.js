import { store, navigate, http } from "@nore/pwa";

export default {
	signin(login, password) {
		return http
			.post("/api/auth/signin", { data: { login, password } })
			.then(this.signedIn)
			.then(reply => {
				navigate("/admin", { delay: 50 });
			})
			.catch(reply => {
				throw reply.body ? reply.body.message : reply.message;
			});
	},

	signout() {
		return http.post("/api/auth/signout").then(() => {
			navigate("/admin/signin");
		});
	},

	signedIn() {
		return http
			.get("/api/accounts/me")
			.then(reply => {
				store.change({ account: reply.body });
			})
			.catch(reply => {
				if (reply.code === 403) {
					store.change({ account: null });
					return null;
				}

				throw reply.body || reply;
			});
	},
};
