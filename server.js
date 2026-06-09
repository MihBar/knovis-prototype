const http = require("http");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const port = 5173;
const host = "127.0.0.1";
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8"
};

http
  .createServer((request, response) => {
    const route = request.url === "/" ? "index.html" : decodeURIComponent(request.url.slice(1));
    const filePath = path.resolve(root, route);

    if (!filePath.startsWith(root)) {
      response.writeHead(403);
      response.end("Forbidden");
      return;
    }

    fs.readFile(filePath, (error, body) => {
      if (error) {
        response.writeHead(404);
        response.end("Not found");
        return;
      }

      response.writeHead(200, {
        "Content-Type": types[path.extname(filePath)] || "text/plain; charset=utf-8"
      });
      response.end(body);
    });
  })
  .listen(port, host, () => {
    console.log(`Knovis prototype: http://${host}:${port}`);
  });
