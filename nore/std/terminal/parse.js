import { isArray, isObject, isFunction, isString } from "../assert";
import { ArgumentError } from "../error";

const flagSymbol = Symbol("nore.std.terminal.flag");

// https://github.com/zeit/arg/blob/master/index.js
export default function parse(argv, settings) {
	if (!isArray(argv)) {
		throw new ArgumentError("argv", "array", argv);
	}

	if (!isObject(settings)) {
		throw new ArgumentError("settings", "object", settings);
	}

	const result = { _: [] };
	const aliases = {};
	const handlers = {};

	for (const key of Object.keys(settings)) {
		if (!key) {
			throw new TypeError("Argument key cannot be an empty string");
		}

		if (key[0] !== "-") {
			throw new TypeError(
				`Argument key must start with '-' but found: '${key}'`
			);
		}

		if (key.length === 1) {
			throw new TypeError(
				`Argument key must have a name; singular '-' keys are not allowed: ${key}`
			);
		}

		if (isString(settings[key])) {
			aliases[key] = settings[key];
			continue;
		}

		let type = settings[key];
		let isFlag = false;

		if (isArray(type) && type.length === 1 && isFunction(type[0])) {
			const [fn] = type;
			type = (value, name, prev = []) => {
				prev.push(fn(value, name, prev[prev.length - 1]));
				return prev;
			};
			isFlag = fn === Boolean || fn[flagSymbol] === true;
		} else if (isFunction(type)) {
			isFlag = type === Boolean || type[flagSymbol] === true;
		} else {
			throw new TypeError(
				`Type missing or not a function or valid array type: ${key}`
			);
		}

		if (key[1] !== "-" && key.length > 2) {
			throw new TypeError(
				`Short argument keys (with a single hyphen) must have only one character: ${key}`
			);
		}

		handlers[key] = [type, isFlag];
	}

	for (let i = 0, len = argv.length; i < len; i++) {
		const wholeArg = argv[i];

		if (wholeArg === "--") {
			result._ = result._.concat(argv.slice(i + 1));
			break;
		}

		if (wholeArg.length > 1 && wholeArg[0] === "-") {
			const separatedArguments =
				wholeArg[1] === "-" || wholeArg.length === 2
					? [wholeArg]
					: wholeArg
							.slice(1)
							.split("")
							.map(a => `-${a}`);

			for (let j = 0; j < separatedArguments.length; j++) {
				const arg = separatedArguments[j];
				const [originalArgName, argStr] =
					arg[1] === "-" ? arg.split(/=(.*)/, 2) : [arg, undefined];

				let argName = originalArgName;
				while (argName in aliases) {
					argName = aliases[argName];
				}

				if (!(argName in handlers)) {
					const err = new Error(
						`Unknown or unexpected option: ${originalArgName}`
					);
					err.code = "ARG_UNKNOWN_OPTION";
					throw err;
				}

				const [type, isFlag] = handlers[argName];

				if (!isFlag && j + 1 < separatedArguments.length) {
					throw new TypeError(
						`Option requires argument (but was followed by another short argument): ${originalArgName}`
					);
				}

				if (isFlag) {
					result[argName] = type(true, argName, result[argName]);
				} else if (argStr === undefined) {
					if (
						argv.length < i + 2 ||
						(argv[i + 1].length > 1 && argv[i + 1][0] === "-")
					) {
						const extended =
							originalArgName === argName ? "" : ` (alias for ${argName})`;
						throw new Error(
							`Option requires argument: ${originalArgName}${extended}`
						);
					}

					result[argName] = type(argv[i + 1], argName, result[argName]);
					++i;
				} else {
					result[argName] = type(argStr, argName, result[argName]);
				}
			}
		} else {
			result._.push(wholeArg);
		}
	}

	return result;
}
