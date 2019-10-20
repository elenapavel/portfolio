import { version } from "../package.json";
import { extend, define, use, run } from "./extensions";
import plugin from "./plugins/get.js";
import log from "./log.js";
import on from "./on.js";

// initialize the system
import "./initialize.js";

export { version, log, on, extend, define, use, run, plugin };
