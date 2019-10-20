import services from "./services.js";
import hooks from "./hooks.js";
import extend from "./extend.js";
import define from "./define.js";
import run from "./run.js";
import use from "./use.js";

// define core extensions
extend("hooks", hooks);
extend("services", services);

export { extend, define, use, run };
