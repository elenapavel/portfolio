---
name: unique
menu: array
route: /array/unique
tags:
  - array
  - unique
---

Creates a duplicate-free version of the array.

`unique(list)`

- `list` — the array

```js
import { unique } from "@nore/std/array";

unique(["a", "b", "e", "f", "e", "b", "m"]);
// => ["a", "b", "e", "f", "m"]
```
