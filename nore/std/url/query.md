---
name: query
menu: url
route: /url/query
tags:
  - url
  - query
  - query string
---

Parse and stringify URL query strings

`query.parse(querystring)`

- querystring - the string containing the URL query string

```js
import { query } from "@nore/std/url";

const result = query.parse("foo=bar&foo=baz");

// result = { foo: ["bar", "baz"] }
```

`query.stringify(source)`

- source - an object that will be converted into a URL query string

```js
import { query } from "@nore/std/url";

const result = query.stringify({
	bar: "baz",
	foo: "bar",
});

// result = "bar=baz&foo=bar"
```
