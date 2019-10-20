# @nore/nql

An extensible SQL query builder for SQLite.

```js
import nql form "@nore/nql"

const query = {
  type: "select",
  table: "users",
  columns: ["company", "category"],
  where: {
    company: "Future Inc"
    age: { $gt: 25 },
  },
  offset: 200,
  limit: 100,
}

const [sql, values] = nql(query)

// sql    -> `SELECT "users"."name", "users"."age" FROM "users" WHERE "age" > $1 AND "company" == $2`
// values -> [25, "Future Inc"]
```

**Installation**

```
  $ npm install @nore/nql
```

**Documentation**

Read more on the [documentation page](https://paper.dropbox.com/doc/norenql--AWqUyXWANLsjRV4jUOTeClHAAQ-Uu0BnR67pOe0aFARJmZd8).

---

> License [ISC](license) &nbsp;&middot;&nbsp;
> GitHub [@ugin](https://github.com/ugin) &nbsp;&middot;&nbsp;
> Twitter [@navaru](https://twitter.com/navaru)
