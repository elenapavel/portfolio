---
name: omit
menu: object
route: /object/omit
tags:
  - omit
  - filter
---

Creates an object composed of the properties from the source object, except the ones that are omitted.

`omit(source, keys)`

- `source` — the source object
- `keys` — an array of properties that will be ignored

```js
import { omit } from "@nore/std/object";

const person = {
	fistName: "John",
	lastName: "Doe",
	age: "30",
	location: "earth",
};

omit(person, ["fistName", "lastName"]);

// -> { age: "30", location: "earth" }
```
