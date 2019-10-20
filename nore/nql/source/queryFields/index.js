import FieldsMap from "../utils/FieldsMap";

import definitions from "./definitions.js";
import ifNotExists from "./ifNotExists.js";
import distinct from "./distinct.js";
import columns from "./columns.js";
import groupBy from "./groupBy.js";
import orderBy from "./orderBy.js";
import offset from "./offset.js";
import values from "./values.js";
import upsert from "./upsert.js";
import table from "./table.js";
import where from "./where.js";
import limit from "./limit.js";
import count from "./count.js";
import join from "./join.js";
import set from "./set.js";

const queryFields = new FieldsMap();

queryFields.add("definitions", definitions);
queryFields.add("ifNotExists", ifNotExists);
queryFields.add("distinct", distinct);
queryFields.add("columns", columns);
queryFields.add("groupBy", groupBy);
queryFields.add("orderBy", orderBy);
queryFields.add("offset", offset);
queryFields.add("values", values);
queryFields.add("upsert", upsert);
queryFields.add("table", table);
queryFields.add("where", where);
queryFields.add("limit", limit);
queryFields.add("count", count);
queryFields.add("join", join);
queryFields.add("set", set);

export default queryFields;
