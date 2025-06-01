const http = require('http');
const fs = require('fs');
const url = require('url');
const groupRoutes = require('./routes/groupRoute');
const userRoutes = require('./routes/userRoute');
const mongoose = require('mongoose');
const errorLogger = require('./middlewares/errorLogger');

// Conectar ao MongoDB
mongoose.connect('mongodb://localhost:27017/whatsapp2', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Conectado ao MongoDB!");
}).catch((err) => {
  console.error("Erro na conexão com MongoDB:", err);
});

const PORT = 3000;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  if (parsedUrl.pathname.startsWith('/groups')) {
    return groupRoutes(req, res);
  }
  if (
    parsedUrl.pathname.startsWith('/register') ||
    parsedUrl.pathname.startsWith('/login')
  ) {
    return userRoutes(req, res);
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Rota não encontrada' }));
});

server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});