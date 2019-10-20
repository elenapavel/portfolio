import TypesMap from "../utils/TypesMap";
import createTable from "./createTable.js";
import insert from "./insert.js";
import select from "./select.js";
import update from "./update.js";
import delete_ from "./delete.js";

const queryTypes = new TypesMap();

queryTypes.add("create table", createTable);
queryTypes.add("insert", insert);
queryTypes.add("select", select);
queryTypes.add("update", update);
queryTypes.add("delete", delete_);

export default queryTypes;
