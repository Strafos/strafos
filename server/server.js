// Express server hosting API endpoints
const express = require("express");
const bodyParser = require("body-parser");

const readerView = require("./readerView");
const db = require("./database");

const app = express();
app.use(bodyParser.json());
const port = process.env.PORT || 5001;

// Send in URL and return HTML from readability parser
app.post("/article", (req, res) => {
  const { url, createdAt } = req.body;
  console.log(url);
  readerView(url, createdAt).then(article => res.send(article));
});

app.get("/articles", (req, res) => {
  const query = `SELECT * FROM articles`;
  db.insert(query)
    .then(response => {
      res.send(response);
    })
    .catch(err => {
      res.send(err);
    });
});

app.put("/article/:id", (req, res) => {
  const { updatedAt, content } = req.body;
  const query = `UPDATE articles SET updated_at=(?), content=(?) where id=${
    req.params.id
  }`;
  db.insert(query, [updatedAt, content])
    .then(response => {
      res.send(response);
    })
    .catch(err => {
      res.send(err);
    });
});

app.delete("/article/:id", (req, res) => {
  const query = `DELETE FROM articles where id=${req.params.id}`;
  db.insert(query)
    .then(response => {
      res.send(response);
    })
    .catch(err => {
      res.send(err);
    });
});

// Send in URL and return HTML from readability parser
app.post("/keepnote", (req, res) => {
  const { title, content, createdAt, pinned } = req.body;
  const insert = `INSERT INTO keepnotes values(null, (?), (?), (?), (?), (?))`;
  const select = `SELECT * FROM keepnotes WHERE id in (SELECT last_insert_rowid());`;
  db.insertReturning(insert, select, [
    title,
    content,
    createdAt,
    createdAt,
    pinned,
  ])
    .then(response => {
      res.send(response);
    })
    .catch(err => {
      res.send({ status: "Failure" });
    });
});

app.get("/keepnotes", (req, res) => {
  const query = `SELECT * FROM keepnotes`;
  db.insert(query)
    .then(response => {
      res.send(response);
    })
    .catch(err => {
      res.send(err);
    });
});

app.put("/keepnote/:id", (req, res) => {
  const { title, updatedAt, content, pinned } = req.body;
  const query = `UPDATE keepnotes SET title=(?), updated_at=(?), content=(?) pinned=(?) where id=${
    req.params.id
  }`;
  db.insert(query, [title, updatedAt, content, pinned])
    .then(response => {
      res.send(response);
    })
    .catch(err => {
      res.send(err);
    });
});

app.delete("/keepnote/:id", (req, res) => {
  const query = `DELETE FROM keepnote where id=${req.params.id}`;
  db.insert(query)
    .then(response => {
      res.send(response);
    })
    .catch(err => {
      res.send(err);
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
