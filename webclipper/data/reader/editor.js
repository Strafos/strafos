!(function(e, n) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = n())
    : "function" == typeof define && define.amd
      ? define("Stackedit", [], n)
      : "object" == typeof exports
        ? (exports.Stackedit = n())
        : (e.Stackedit = n());
})("undefined" != typeof self ? self : this, function() {
  return (function(e) {
    function n(i) {
      if (t[i]) return t[i].exports;
      var o = (t[i] = { i: i, l: !1, exports: {} });
      return e[i].call(o.exports, o, o.exports, n), (o.l = !0), o.exports;
    }
    var t = {};
    return (
      (n.m = e),
      (n.c = t),
      (n.d = function(e, t, i) {
        n.o(e, t) ||
          Object.defineProperty(e, t, {
            configurable: !1,
            enumerable: !0,
            get: i
          });
      }),
      (n.n = function(e) {
        var t =
          e && e.__esModule
            ? function() {
                return e.default;
              }
            : function() {
                return e;
              };
        return n.d(t, "a", t), t;
      }),
      (n.o = function(e, n) {
        return Object.prototype.hasOwnProperty.call(e, n);
      }),
      (n.p = ""),
      n((n.s = 0))
    );
  })([
    function(e, n, t) {
      "use strict";
      function i(e, n) {
        if (!(e instanceof n))
          throw new TypeError("Cannot call a class as a function");
      }
      Object.defineProperty(n, "__esModule", { value: !0 });
      var o = (function() {
          function e(e, n) {
            for (var t = 0; t < n.length; t++) {
              var i = n[t];
              (i.enumerable = i.enumerable || !1),
                (i.configurable = !0),
                "value" in i && (i.writable = !0),
                Object.defineProperty(e, i.key, i);
            }
          }
          return function(n, t, i) {
            return t && e(n.prototype, t), i && e(n, i), n;
          };
        })(),
        r = function() {
          var e = document.createElement("style");
          (e.type = "text/css"),
            (e.innerHTML =
              "\n.stackedit-no-overflow {\n  overflow: hidden;\n}\n\n.stackedit-container {\n  background-color: rgba(160, 160, 160, 0.5);\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 9999;\n}\n\n.stackedit-hidden-container {\n  position: absolute;\n  width: 10px;\n  height: 10px;\n  left: -99px;\n}\n\n.stackedit-iframe-container {\n  background-color: #fff;\n  position: absolute;\n  margin: auto;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  height: 95%;\n  width: 90%;\n  max-width: 1280px;\n  border-radius: 2px;\n  overflow: hidden;\n}\n\n@media (max-width: 920px) {\n  .stackedit-iframe-container {\n    width: 95%;\n  }\n}\n\n.stackedit-iframe {\n  position: absolute;\n  height: 100%;\n  width: 100%;\n  border: 0;\n  border-radius: 2px;\n}\n\n@media (max-width: 740px) {\n  .stackedit-iframe-container {\n    height: 100%;\n    width: 100%;\n    border-radius: 0;\n  }\n\n  .stackedit-iframe {\n    border-radius: 0;\n  }\n}\n\n.stackedit-close-button {\n  position: absolute;\n  width: 38px;\n  height: 36px;\n  margin: 4px;\n  padding: 0 4px;\n  text-align: center;\n  vertical-align: middle;\n  border-radius: 2px;\n  text-decoration: none;\n}\n"),
            document.head.appendChild(e),
            (r = function() {});
        },
        a = location.protocol + "//" + location.host,
        s = document.createElement("a"),
        c = (function() {
          function e() {
            var n = this,
              t =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : {};
            i(this, e),
              (this.$options = { url: "https://stackedit.io/app" }),
              (this.$listeners = {}),
              Object.keys(t).forEach(function(e) {
                n.$options[e] = t[e];
              });
          }
          return (
            o(e, [
              {
                key: "$trigger",
                value: function(e, n) {
                  (this.$listeners[e] || []).forEach(function(e) {
                    return setTimeout(function() {
                      return e(n);
                    }, 1);
                  });
                }
              },
              {
                key: "on",
                value: function(e, n) {
                  var t = this.$listeners[e] || [];
                  t.push(n), (this.$listeners[e] = t);
                }
              },
              {
                key: "off",
                value: function(e, n) {
                  var t = this.$listeners[e] || [],
                    i = t.indexOf(n);
                  i >= 0 &&
                    (t.splice(i, 1),
                    t.length
                      ? (this.$listeners[e] = t)
                      : delete this.$listeners[e]);
                }
              },
              {
                key: "openFile",
                value: function() {
                  var e = this,
                    n =
                      arguments.length > 0 && void 0 !== arguments[0]
                        ? arguments[0]
                        : {},
                    t =
                      arguments.length > 1 &&
                      void 0 !== arguments[1] &&
                      arguments[1];
                  this.close(),
                    (s.href = this.$options.url),
                    (this.$origin = s.protocol + "//" + s.host);
                  var i = n.content || {},
                    o = {
                      origin: a,
                      fileName: n.name,
                      contentText: i.text,
                      contentProperties:
                        !i.yamlProperties && i.properties
                          ? JSON.stringify(i.properties)
                          : i.yamlProperties,
                      silent: t
                    },
                    c = Object.keys(o)
                      .map(function(e) {
                        return e + "=" + encodeURIComponent(o[e] || "");
                      })
                      .join("&");
                  (s.hash = "#" + c),
                    r(),
                    (this.$containerEl = document.createElement("div")),
                    (this.$containerEl.className = t
                      ? "stackedit-hidden-container"
                      : "stackedit-container"),
                    (this.$containerEl.innerHTML =
                      '\n<div class="stackedit-iframe-container">\n  <iframe class="stackedit-iframe"></iframe>\n  <a href="javascript:void(0)" class="stackedit-close-button" title="Close">\n    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%">\n      <path fill="#777" d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z" />\n    </svg>\n  </a>\n</div>\n'),
                    document.body.appendChild(this.$containerEl);
                  var d = this.$containerEl.querySelector("iframe");
                  d.src = s.href;
                  var l = this.$containerEl.querySelector("a");
                  l.addEventListener("click", function() {
                    return e.close();
                  }),
                    (this.$messageHandler = function(n) {
                      if (
                        n.origin === e.$origin &&
                        n.source === d.contentWindow
                      )
                        switch (n.data.type) {
                          case "ready":
                            l.parentNode.removeChild(l);
                            break;
                          case "fileChange":
                            e.$trigger("fileChange", n.data.payload),
                              t && e.close();
                            break;
                          case "close":
                          default:
                            e.close();
                        }
                    }),
                    window.addEventListener("message", this.$messageHandler),
                    t || (document.body.className += " stackedit-no-overflow");
                }
              },
              {
                key: "close",
                value: function() {
                  this.$messageHandler &&
                    (window.removeEventListener(
                      "message",
                      this.$messageHandler
                    ),
                    document.body.removeChild(this.$containerEl),
                    (this.$messageHandler = null),
                    (this.$containerEl = null),
                    (document.body.className = document.body.className.replace(
                      /\sstackedit-no-overflow\b/,
                      ""
                    )),
                    this.$trigger("close"));
                }
              }
            ]),
            e
          );
        })();
      (n.default = c), (e.exports = n.default);
    }
  ]);
});
