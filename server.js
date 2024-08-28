const { createServer } = require("http");
const next = require("next");

const { parse } = require('url')
const { join } = require('path')

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// app.prepare().then(() => {
//   createServer((req, res) => {
//     handle(req, res);
//   }).listen(port, (err) => {
//     if (err) throw err;
//   });
// });

app.prepare()
  .then(() => {
    createServer((req, res) => {
      const parsedUrl = parse(req.url, true)
      const rootStaticFiles = [
        '/manifest.json',
        //'/sitemap.xml',
         '/favicon.ico',
        // '/robots.txt',
        // '/browserconfig.xml',
        // '/site.webmanifest',
      ]
      if (rootStaticFiles.indexOf(parsedUrl.pathname) > -1) {
        const path = join(__dirname, 'static', parsedUrl.pathname)
        app.serveStatic(req, res, path)
      } else {
        handle(req, res, parsedUrl)
      }
    })
      .listen(port, (err) => {
        if (err) throw err
      })
  });