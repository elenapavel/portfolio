import schema from "~/server/services/accounts/schema";

export const up = schema.toSQL();
export const down = `DROP TABLE IF EXISTS ${schema.table}`;
