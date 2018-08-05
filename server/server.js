// Express server hosting API endpoints
const express = require("express");
const bodyParser = require("body-parser");

const readerView = require("./readerView");
const db = require("./database");

const app = express();
app.use(bodyParser.json());
const port = process.env.PORT || 5001;

// Send in URL and return HTML from readability parser
app.post("/readerView", (req, res) => {
  const { url, createdAt } = req.body;
  console.log(url);
  readerView(url, createdAt).then(article => res.send(article));
});

app.get("/articles", (req, res) => {
  const query = `SELECT * FROM articles`;
  db.insert(query)
    .then(response => {
      // resolve({ title: article.title, content });
      res.send(response);
    })
    .catch(err => {
      res.send(err);
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
