const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, '../logs/errors.log');

function errorLogger(err, req, res, next) {
    const timestamp = new Date().toISOString();
    const logMessage = `\n[${timestamp}] ERROR: ${err.message}\nSTACK: ${err.stack}\nURL: ${req.originalUrl}\nMETHOD: ${req.method}\n`;

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

    res.status(500).json({ error: 'Erro interno no servidor.' });
}

module.exports = errorLogger;
