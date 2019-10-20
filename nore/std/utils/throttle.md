---
name: throttle
menu: utils
route: /utils/throttle
tags:
  - utils
  - throttle
  - time
  - event
---

Throttling is the reduction in rate of a repeating event, in other words it guarantees a constant flow of events at a given time interval.

`throttle` prevents the `target` from executing more than once every `interval`milliseconds.

`throttle(target, interval)`

- `interval` — the time interval in milliseconds at which the `target` is called
- `mode`:
  - `0` — (trailing) wait for the debounced period and call `target`
  - `1` — (leading) call `target` and wait for the debounced period (default)

```js
import { throttle } from "@nore/std/utils";

const onMouseMove = (event) => {...}
window.onmousemove = throttle(onMouseMove, 300)
```
