---
name: isPromise
menu: assert
route: /assert/isPromise
tags:
  - assert
  - validate
  - promise
---

Returns `true` if the value is a Promise instance.

```js
import { isPromise } from "@nore/std/assert";

isPromise(new Promise(...));
// => true
```
