import schema from "~/server/services/copsi/schema";

export const up = schema.toSQL();
export const down = `DROP TABLE IF EXISTS ${schema.table}`;
