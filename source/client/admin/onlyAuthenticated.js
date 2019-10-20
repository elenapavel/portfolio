import { store, navigate } from "@nore/pwa";

export default function onlyAuthenticated(content) {
	if (store.get("account")) return content;
	navigate("/admin/signin", { delay: 50 });
	return null;
}
