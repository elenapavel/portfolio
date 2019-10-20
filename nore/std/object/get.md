---
name: get
menu: object
route: /object/get
tags:
  - get
---

Get value by walking path on object. Returns `undefined` is no value is found.

`get(object, path)`

- `object` – the source object
- `path` — an array with the nested path to get

```js
import { get } from "@nore/std/object";

const person = {
	name: {
		fist: "John",
		last: "Doe",
	},
};

get(person, ["name", "first"]); // -> "John"
```
