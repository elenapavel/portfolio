import tap from "tape";
import Database from "../source";
import { getTemporaryDirectory, getTemporaryFile, writeToFile } from "./utils";
import samples from "./migrations.samples.js";

tap.test("Migrations – run all", async ({ end, equal }) => {
	const dbFile = getTemporaryFile();
	const tmpDir = getTemporaryDirectory();

	writeToFile(`${tmpDir.path}/001.mjs`, samples.create_sessions_table);
	writeToFile(`${tmpDir.path}/002.mjs`, samples.create_users_table);
	writeToFile(`${tmpDir.path}/003.mjs`, samples.create_articles_table);

	const db = new Database({
		migrations: tmpDir.path,
		file: dbFile.path,
	});

	await db.migrations.initialize();
	await db.migrations.migrate();

	const users = await db.table("users").find();
	const sessions = await db.table("sessions").find();
	const articles = await db.table("articles").find();

	equal(users[0].id, "id");
	equal(sessions[0].id, "id");
	equal(articles[0].id, "id");
	equal(await db.migrations.getLastRanMigration(), `${tmpDir.path}/003.mjs`);

	tmpDir.delete();
	dbFile.delete();

	end();
});

tap.test("Migrations – partial run", async ({ end, equal, ok }) => {
	const dbFile = getTemporaryFile();
	const tmpDir = getTemporaryDirectory();

	writeToFile(`${tmpDir.path}/001.mjs`, samples.create_sessions_table);
	writeToFile(`${tmpDir.path}/002.mjs`, samples.create_users_table);
	writeToFile(`${tmpDir.path}/003.mjs`, samples.migration_with_error);
	writeToFile(`${tmpDir.path}/004.mjs`, samples.create_articles_table);

	const db = new Database({
		migrations: tmpDir.path,
		file: dbFile.path,
	});

	await db.migrations.initialize();

	try {
		await db.migrations.migrate();
		throw Error("invalid");
	} catch (error) {
		ok(error.message != "invalid");
	}

	const users = await db.table("users").find();
	const sessions = await db.table("sessions").find();

	equal(users[0].id, "id");
	equal(sessions[0].id, "id");
	equal(await db.has("articles"), false);
	equal(await db.migrations.getLastRanMigration(), `${tmpDir.path}/002.mjs`);

	tmpDir.delete();
	dbFile.delete();

	end();
});

tap.test("Migrations – from last migration", async ({ end, equal, ok }) => {
	const dbFile = getTemporaryFile();
	const tmpDir = getTemporaryDirectory();

	writeToFile(`${tmpDir.path}/001.mjs`, samples.create_sessions_table);

	const db = new Database({
		migrations: tmpDir.path,
		file: dbFile.path,
	});

	await db.migrations.initialize();
	await db.migrations.migrate();

	equal(await db.migrations.getLastRanMigration(), `${tmpDir.path}/001.mjs`);

	writeToFile(`${tmpDir.path}/002.mjs`, samples.create_users_table);
	writeToFile(`${tmpDir.path}/003.mjs`, samples.create_articles_table);

	await db.migrations.migrate();

	const users = await db.table("users").find();
	const sessions = await db.table("sessions").find();
	const articles = await db.table("articles").find();

	equal(users[0].id, "id");
	equal(sessions[0].id, "id");
	equal(articles[0].id, "id");
	equal(await db.migrations.getLastRanMigration(), `${tmpDir.path}/003.mjs`);

	tmpDir.delete();
	dbFile.delete();

	end();
});

tap.test("Migrations – migrate to / rollback", async ({ end, equal }) => {
	const dbFile = getTemporaryFile();
	const tmpDir = getTemporaryDirectory();

	writeToFile(`${tmpDir.path}/001.mjs`, samples.create_sessions_table);
	writeToFile(`${tmpDir.path}/002.mjs`, samples.create_users_table);
	writeToFile(`${tmpDir.path}/003.mjs`, samples.create_articles_table);
	writeToFile(`${tmpDir.path}/004.mjs`, samples.create_tickets_table);

	const db = new Database({
		migrations: tmpDir.path,
		file: dbFile.path,
	});

	await db.migrations.initialize();
	await db.migrations.migrate();

	equal(await db.migrations.getLastRanMigration(), `${tmpDir.path}/004.mjs`);

	await db.migrations.migrate("001.mjs");

	equal(await db.has("sessions"), true);
	equal(await db.has("users"), false);
	equal(await db.has("articles"), false);
	equal(await db.has("tickets"), false);
	equal(await db.migrations.getLastRanMigration(), `${tmpDir.path}/001.mjs`);

	await db.migrations.migrate("003.mjs");

	equal(await db.has("sessions"), true);
	equal(await db.has("users"), true);
	equal(await db.has("articles"), true);
	equal(await db.has("tickets"), false);
	equal(await db.migrations.getLastRanMigration(), `${tmpDir.path}/003.mjs`);

	tmpDir.delete();
	dbFile.delete();

	end();
});
