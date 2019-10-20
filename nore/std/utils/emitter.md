---
name: emitter
menu: utils
route: /utils/emitter
tags:
  - utils
  - emitter
  - events
---

A functional event emitter.

`emitter(events)`

- `events` — events handler map

Register an event handler for the given type:

`.on(event, handler)`

- `event` — the event name to listen for, or `"*"` for all events
- `handler` — the function to call in response to given event

Remove an event handler for the given type:

`.off(event, handler)`

- `event` — the event name to unregister from
- `handler` — the function to remove

Invoke all handlers for the given type. If present, "\*" handlers are invoked after type-matched handlers.

`.emit(event, data)`

- `event` — the event name
- `data` — any value that will be passed to the event handler

```js
import { emitter } from "@nore/std/utils";

const demo = emitter()

// listen to an event
demo.on('foo', data => console.log('foo', data) )

// listen to all events
demo.on('*', (type, data) => console.log(type, data) )

// emit an event
demo.emit('foo', { ... })

// working with handler references:
function handler() {}
demo.on('foo', handler)   // listen
demo.off('foo', handler)  // unlisten
```
