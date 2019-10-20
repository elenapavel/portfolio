---
name: debounce
menu: utils
route: /utils/debounce
tags:
  - utils
  - debounce
  - time
  - event
---

Debouncing ensures that exactly one signal is sent for an event that may be happening several times over an extended period.

`debounce` creates a debounced function that delays calling the `target` until after `wait` milliseconds have passed since the last time the debounced function was called.

`debounce(target, wait, mode)`

- `target` — the target `function` that will be debounced
- `delay` — milliseonds to delay until the call, default value is 166 (corresponding to ~10 frames at 60 Hz)
- `mode`:
  - `0` — (trailing) wait for the debounced period and call `target` (default)
  - `1` — (leading) call `target` and wait for the debounced period

```js
import { debounce } from "@nore/std/utils";

const onResize = (event) => {...}
window.onresize = debounce(onResize, 300)
```
