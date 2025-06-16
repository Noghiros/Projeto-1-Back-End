const chatController = require('../controllers/chatController');
const formidable = require('formidable');

module.exports = (req, res) => {
    const { url, method } = req;

    if (url === '/chat' && method === 'POST') {
        const form = new formidable.IncomingForm();
        form.parse(req, (err, fields) => {
            if (err) {
                res.writeHead(500);
                res.end('Erro no upload');
            } else {
                chatController.createMessage(req, res, fields);
            }
        });
    } else if (url === '/chat' && method === 'GET') {
        chatController.listMessages(req, res);
    } else if (url.startsWith('/chat/delete/') && method === 'DELETE') {
        chatController.deleteMessage(req, res);
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Rota não encontrada' }));
    }
};