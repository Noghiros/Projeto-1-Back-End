const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const formidable = require('formidable');

// Exibe a página de registro
const registerLoad = async (req, res) => {
    try {
        fs.readFile('./views/register.html', 'utf-8', (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end("Erro ao carregar página de registro");
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } catch (error) {
        console.log(error.message);
        res.writeHead(500);
        res.end("Erro interno");
    }
};

// Realiza o registro
const register = async (req, res) => {
    const form = new formidable.IncomingForm({
        uploadDir: path.join(__dirname, '../public/images'),
        keepExtensions: true
    });

    form.parse(req, async (err, fields, files) => {
        if (err) {
            res.writeHead(500);
            res.end("Erro ao processar o formulário");
            return;
        }

        try {
            const passwordHash = await bcrypt.hash(fields.password, 10);
            const imagePath = files.image?.newFilename || 'default.png';

            const user = new User({
                name: fields.name,
                email: fields.email,
                image: 'images/' + imagePath,
                password: passwordHash,
                is_online: false
            });

            await user.save();

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(`<h1>Cadastro realizado com sucesso!</h1><a href="/login">Login</a>`);
        } catch (error) {
            console.log(error.message);
            res.writeHead(500, { 'Content-Type': 'text/html' });
            res.end(`<h1>Erro ao registrar. Tente novamente.</h1>`);
        }
    });
};

// Exibe a página de login
const loadLogin = async (req, res) => {
    try {
        fs.readFile('./views/login.html', 'utf-8', (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end("Erro ao carregar página de login");
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } catch (error) {
        console.log(error.message);
        res.writeHead(500);
        res.end("Erro interno");
    }
};

// Realiza login do usuário
const login = async (req, res) => {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
        const params = new URLSearchParams(body);
        const email = params.get('email');
        const password = params.get('password');

        try {
            const userData = await User.findOne({ email });

            if (!userData) {
                res.writeHead(401, { 'Content-Type': 'text/html' });
                return res.end(`<h1>Email ou senha incorretos</h1><a href="/login">Voltar</a>`);
            }

            const passwordMatch = await bcrypt.compare(password, userData.password);
            if (!passwordMatch) {
                res.writeHead(401, { 'Content-Type': 'text/html' });
                return res.end(`<h1>Email ou senha incorretos</h1><a href="/login">Voltar</a>`);
            }

            // Aqui você pode gerar um cookie ou token
            res.writeHead(302, { Location: '/dashboard' });
            res.end();
        } catch (error) {
            console.log(error.message);
            res.writeHead(500, { 'Content-Type': 'text/html' });
            res.end(`<h1>Erro ao fazer login</h1>`);
        }
    });
};

module.exports = {
    registerLoad,
    register,
    loadLogin,
    login
};
