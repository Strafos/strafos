// Express server hosting API endpoints
const express = require("express");
const bodyParser = require("body-parser");

const readerView = require("./readerView");
console.log(readerView);

const app = express();
app.use(bodyParser.json());
const port = process.env.PORT || 5001;

// Send in URL and return HTML from readability parser
app.post("/readerView", (req, res) => {
  const { url } = req.body;
  console.log(url);
  readerView(url).then(article => res.send(article));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
