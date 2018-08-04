CREATE TABLE articles (
 id integer PRIMARY KEY AUTOINCREMENT,
 url text NOT NULL,
 title text NOT NULL,
 content blob NOT NULL,
 created_at text NOT NULL,
 last_updated text NOT NULL
);