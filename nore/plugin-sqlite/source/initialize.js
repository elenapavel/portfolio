import Database, { uid, nql, xql, timestamp } from "@nore/sqlite";
import { join } from "@nore/std/path";
import { log, define } from "@nore/cms";

export default async options => {
	const cwd = IS_DEVELOPMENT ? PROJECT_PATH : process.cwd();

	const db = new Database({
		file: join(cwd, CONFIG.sqlite.file),
		useWAL: Boolean(CONFIG.sqlite.wal),
	});

	db.uid = uid;
	db.nql = nql;
	db.xql = xql;
	db.timestamp = timestamp;

	// run DB migrations only in development mode
	if (IS_DEVELOPMENT) {
		// overwrite loading logic to work with webpack

		const $require = require.context(
			`${PROJECT_PATH}/${CONFIG.sqlite.migrations}`
		);

		db.migrations.path = `${PROJECT_PATH}/${CONFIG.sqlite.migrations}`;
		db.migrations.loadMigration = async file => {
			log.debug(file);

			return $require(file.replace(db.migrations.path, "."));
		};

		log.debug(`Loading migrations: ${CONFIG.sqlite.migrations}`);

		await db.migrations.initialize();
		await db.migrations.migrate();
	}

	return db;
};
