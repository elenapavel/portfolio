import { readJSONFile } from "@nore/std/fs";
import { resolve } from "@nore/std/path";

const __dirname = import.meta.url.slice(7, import.meta.url.lastIndexOf("/"));
const pkgfile = resolve(__dirname, "../../package.json");
const pkg = readJSONFile(pkgfile);

export default async () => pkg;
