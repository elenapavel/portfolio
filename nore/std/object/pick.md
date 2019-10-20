---
name: pick
menu: object
route: /object/pick
tags:
  - pick
  - filter
---

Creates an object composed of the picked object properties.

`pick(source, keys)`

- `source` — the source object
- `keys` — an array of properties that will be selected from the source object

```js
import { pick } from "@nore/std/object";

const person = {
	fistName: "John",
	lastName: "Doe",
	age: "30",
	location: "earth",
};

pick(person, ["age", "location"]);

// -> { age: "30", location: "earth" }
```
