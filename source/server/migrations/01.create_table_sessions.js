export const up = `
	CREATE TABLE IF NOT EXISTS sessions (
		id TEXT PRIMARY KEY NOT NULL UNIQUE,
		expires TEXT NOT NULL,
		data TEXT NOT NULL
	)
`;

export const down = `
	DROP TABLE IF EXISTS sessions;
`;
