# Projeto 1 - Programação Web Back-End

Este projeto foi realizdo para a disciplina Programação Web Back-End. O mesmo se trata de um servidor Node.js sem Express, que implementa funcionalidades básicas de um sistema de chat, incluindo cadastro de usuários, autenticação, criação de grupos e troca de mensagens, utilizando MongoDB como banco de dados.

## Funcionalidades

- Cadastro de usuários com upload de imagem (opcional)
- Login de usuários
- Listagem e exclusão de usuários
- Criação, listagem e exclusão de grupos
- Envio, listagem e exclusão de mensagens de chat
- Validação de campos obrigatórios
- Senhas armazenadas com hash (bcrypt)
- Upload de arquivos com Formidable

## Estrutura de Pastas

```
├── app.js
├── models/
│   ├── userModel.js
│   ├── groupModel.js
│   └── chatModel.js
├── controllers/
│   ├── userController.js
│   ├── groupController.js
│   └── chatController.js
├── routes/
│   ├── userRoute.js
│   ├── groupRoute.js
│   └── chatRoute.js
├── views/
│   ├── register.html
│   └── login.html
├── public/
│   └── images/
├── middlewares/
│   └── errorLogger.js
└── package.json
```

## Como rodar o projeto

1. **Instale as dependências:**
   ```
   npm install
   ```

2. **Certifique-se que o MongoDB está rodando localmente na porta padrão.**

3. **Crie as pastas necessárias para upload de imagens:**
   - `public/images`

4. **Inicie o servidor:**
   ```
   npm start
   ```
   ou
   ```
   node app.js
   ```

5. **Acesse as rotas pelo navegador ou via `curl`:**
   - Cadastro: `http://localhost:3000/register`
   - Login: `http://localhost:3000/login`
   - Grupos: `http://localhost:3000/groups`
   - Chat: `http://localhost:3000/chat`

## Exemplos de uso via terminal

**Registrar usuário (POST):**
```sh
curl -X POST http://localhost:3000/register -F "name=Fulano" -F "email=fulano@email.com" -F "password=123456"
```

**Criar grupo (POST):**
```sh
curl -X POST http://localhost:3000/groups -H "Content-Type: application/json" -d "{\"name\":\"Grupo Teste\",\"members\":[\"idUsuario1\",\"idUsuario2\"]}"
```

**Enviar mensagem (POST):**
```sh
curl -X POST http://localhost:3000/chat -H "Content-Type: application/json" -d "{\"sender\":\"idUsuario1\",\"receiver\":\"idUsuario2\",\"message\":\"Olá!\"}"
```

## Observações

- Para deletar usuários ou mensagens, utilize o método HTTP DELETE nas rotas apropriadas.
