---
name: parse
menu: terminal
route: /terminal/parse
tags:
  - terminal
  - arguments
  - parse
  - args
---

Command line option parser.

The equal between argument and value is optional: `--port <number>` same as `--port=<number>`

`parse(settins, argv)`

- `argv` – the command line split into an array by space (ex: `process.argv.slice(2)`)
- `settings` – an object defining the arguments

```sh
node ./hello.js --verbose -vvv --port=1234 -n 'My name' foo bar --tag qux --tag=qix -- --foobar
```

```js
import { parse } from "@nore/std/terminal";

const settings = {
	// Types
	"--help": Boolean,
	"--version": Boolean,
	"--port": Number, // --port <number> or --port=<number>
	"--name": String, // --name <string> or --name=<string>
	"--tag": [String], // --tag <string> or --tag=<string>

	// Aliases
	"-v": "--verbose",
	"-n": "--name", // -n <string>; result is stored in --name
	"--label": "--name", // --label <string> or --label=<string>;
	//     result is stored in --name
};

const args = parse(process.argv.slice(2), settings);
```
