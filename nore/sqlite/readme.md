# @nore/sqlite

An elegant interface for SQLite.

```js
import SQLite from "@nore/sqlite";

const db = new SQLite({ file: "/path/to/db.sqlite" });
const table = db.table("users");

const users = await table.find({
	city: "Constangeles",
	age: { $gt: 25 },
});
```

**Installation**

```
$ npm install @nore/sqlite
```

**Documentation**

Read more on the [documentation page](https://paper.dropbox.com/doc/noresqlite--AXBNOQfCPY0iDBsx_1amdtGJAQ-BTL054xcqcPTN43rKYKZf).

---

> License [ISC](license) &nbsp;&middot;&nbsp;
> GitHub [@ugin](https://github.com/ugin) &nbsp;&middot;&nbsp;
> Twitter [@navaru](https://twitter.com/navaru)
