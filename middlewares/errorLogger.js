const fs = require('fs');
const path = require('path');

// Middleware para registrar erros em um arquivo de log
const logFilePath = path.join(__dirname, '../logs/errors.log');

function errorLogger(err, req, res, next) {
    const timestamp = new Date().toISOString();
    const logMessage = `\n[${timestamp}] ERROR: ${err && err.message ? err.message : err}\nSTACK: ${err && err.stack ? err.stack : ''}\nURL: ${req && req.url ? req.url : ''}\nMETHOD: ${req && req.method ? req.method : ''}\n`;

    fs.mkdir(path.dirname(logFilePath), { recursive: true }, (mkdirErr) => {
        if (mkdirErr) {
            console.error('Erro ao criar diretório de logs:', mkdirErr);
            return;
        }

        fs.appendFile(logFilePath, logMessage, (writeErr) => {
            if (writeErr) {
                console.error('Erro ao gravar log de erro:', writeErr);
            }
        });
    });

    if (res && typeof res.writeHead === 'function' && typeof res.end === 'function') {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Erro interno no servidor.' }));
    }
}

module.exports = errorLogger;