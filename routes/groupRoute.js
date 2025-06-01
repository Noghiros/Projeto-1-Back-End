// routes/groupRoute.js

const groupController = require('../controllers/groupController');
const { parse } = require('querystring');

module.exports = async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const path = url.pathname;
  const method = req.method;

  if (path === '/groups' && method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const { name, members } = JSON.parse(body);
        const group = await groupController.createGroup(name, members);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(group));
      } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Erro ao criar grupo.' }));
      }
    });
    return;
  }

  if (path === '/groups' && method === 'GET') {
    try {
      const groups = await groupController.listGroups();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(groups));
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Erro ao listar grupos.' }));
    }
    return;
  }

  if (path.startsWith('/groups/') && method === 'DELETE') {
    const groupId = path.split('/')[2];
    try {
      await groupController.deleteGroup(groupId);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Grupo removido com sucesso.' }));
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Erro ao deletar grupo.' }));
    }
    return;
  }
};
