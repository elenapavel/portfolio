---
name: set
menu: object
route: /object/set
tags:
  - set
---

Mutates a deep path on an object.

`set(object, path, value)`

- `path` — an array with the nested path to set
- `value` — the value to set
- `object` – the target object

```js
import { set } from "@nore/std/object";

const person = {
	name: {
		fist: "John",
		last: "Doe",
	},
};

set(person, ["name", "first"], "Jane");

// person.name.first -> "Jane"
```
