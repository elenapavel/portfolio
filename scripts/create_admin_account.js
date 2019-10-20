import $accounts from "~/server/services/accounts";

const accounts = [
	{
		email: "eugen@ryota.ro",
		login: "eugen",
		password: "xacda!@#",
		name: "Eugen T.",
		groups: ["members", "admins"],
	},
	{
		email: "silvia@ryota.ro",
		login: "silvia",
		password: "aivlis11ry",
		name: "Silvia Stoian",
		groups: ["members", "admins"],
	},
];

for (const admin of accounts) {
	$accounts.getByLogin(admin.email).then(async account => {
		if (account) return console.log(`Account ${admin.email} already created.`);

		try {
			await $accounts.create(admin);

			console.log("Account created.");
		} catch (error) {
			console.log(error);
		}
	});
}
