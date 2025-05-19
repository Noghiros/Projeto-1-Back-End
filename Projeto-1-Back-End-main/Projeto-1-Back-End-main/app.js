// app.js

const http = require('http');
const fs = require('fs');
const url = require('url');
const groupRoutes = require('./routes/groupRoute');
const { parse } = require('querystring');

const PORT = 3000;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const method = req.method;

  if (parsedUrl.pathname.startsWith('/groups')) {
    // Delegar para as rotas de grupo (Express-like handler manual)
    return groupRoutes(req, res);
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Rota não encontrada' }));
});

server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
