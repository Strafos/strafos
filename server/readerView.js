const request = require("request");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const Readability = require("./Readability");
const db = require("./database");

function getReaderView(url, createdAt) {
  return new Promise(function(resolve, reject) {
    request.get(url, {}, function(err, res, body) {
      if (err) {
        console.log(err);
        reject(err);
      }
      if (res.statusCode !== 200) {
        console.log(res);
        reject(err);
      }
      const dom = new JSDOM(body);
      const article = new Readability(dom.window.document).parse();
      // const content = Buffer.from(article.content).toString("base64");
      const query = `INSERT INTO articles values(null, (?), (?), (?), (?), (?))`;
      db.insert(query, [
        url,
        article.title,
        article.content,
        createdAt,
        createdAt,
      ])
        .then(() => {
          // resolve({ title: article.title, content });
          resolve({ title: article.title, content: article.content });
        })
        .catch(err => {
          resolve({ status: "Failure" });
        });
    });
  });
}

if (typeof module === "object") {
  module.exports = getReaderView;
}
