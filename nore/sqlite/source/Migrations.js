import { readDirectory, itExists } from "@nore/std/fs";
import { isAbsolute, join } from "@nore/std/path";

export default class Migrations {
	constructor({ path, db, tableName }) {
		this.db = db;
		this.path = path;
		this.tableName = tableName || "migrations";
		this.table = db.table(this.tableName);
	}

	async initialize() {
		if (!this.path) {
			throw new Error("Missing migrations directory path.");
		}

		if (await this.db.has(this.tableName)) return;

		await this.db.run(`
			CREATE TABLE ${this.tableName} (
				id TEXT PRIMARY KEY NOT NULL,
				file TEXT NOT NULL,
				date TEXT NOT NULL
			);

			INSERT INTO ${this.tableName} (id, file, date) VALUES ("settings", "", "");
		`);
	}

	async migrate(fileName) {
		const files = await readDirectory(this.path);
		const lastFileRan = await this.getLastRanMigration();

		let lastRunMigration = null;
		let error = null;

		// a target migration file, useful for rollback
		if (fileName) {
			const target = join(this.path, fileName);
			const targetIndex = files.indexOf(target);
			const lastIndex = files.indexOf(lastFileRan);

			// migrate or rollback to specific file
			const method = lastIndex > targetIndex ? "down" : "up";

			const migrations =
				lastIndex > targetIndex
					? files.slice(targetIndex + 1).reverse()
					: files.slice(lastIndex + 1, targetIndex + 1);

			const result = await this.runMigrations(migrations, method);

			lastRunMigration = result.error ? result.file : target;
			error = result.error;
		} else {
			const index = files.indexOf(lastFileRan);
			const migrations = files.slice(index === -1 ? 0 : index + 1);
			const result = await this.runMigrations(migrations, "up");

			lastRunMigration = result.file;
			error = result.error;
		}

		if (lastRunMigration) {
			await this.setLastRanMigration(lastRunMigration);
		}

		if (error) {
			throw error;
		}
	}

	async runMigrations(files, method) {
		for (let i = 0; i < files.length; ++i) {
			try {
				await this.runMigration(files[i], method);
			} catch (error) {
				// return previous file when an error occurs
				return { error, file: files[i - 1] };
			}
		}

		return {
			error: null,
			file: files[files.length - 1],
		};
	}

	async runMigration(file, method) {
		const migration = await this.loadMigration(file);
		const procedure = migration[method];
		const type = typeof procedure;

		// migration is a raw SQL string
		if (type === "string") {
			await this.db.run(procedure);
		}

		// migration is a function, so we pass the db instance
		if (type === "function") {
			await procedure({ db: this.db });
		}
	}

	async loadMigration(file) {
		return import(file);
	}

	async getLastRanMigration() {
		const lastRun = await this.table.findOne({ id: "settings" });

		if (lastRun && lastRun.file) {
			return join(this.path, lastRun.file);
		}

		return null;
	}

	async setLastRanMigration(file) {
		const update = {
			file: file.substring(file.lastIndexOf("/") + 1),
			date: String(new Date()),
		};

		await this.table.update({ id: "settings" }, update);
	}
}
