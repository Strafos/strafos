const request = require("request");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const Readability = require("./Readability");

function getReaderView(url) {
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
      const content = Buffer.from(article.content).toString("base64");
      resolve({ title: article.title, content });
    });
  });
}

if (typeof module === "object") {
  module.exports = getReaderView;
}
