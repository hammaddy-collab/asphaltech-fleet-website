// Tiny zero-dependency static file server. Serves index.html (the Fleet
// Register app) for every request, so this can be deployed as a Railway
// service with nothing but Node's built-in modules — no npm install step,
// nothing to go wrong on build. Railway sets process.env.PORT itself; we
// just have to listen on it.
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX_FILE = path.join(__dirname, 'index.html');

const server = http.createServer((req, res) => {
  fs.readFile(INDEX_FILE, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Could not load Asphaltech_Fleet_Register index.html');
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`Fleet Register website listening on port ${PORT}`);
});
