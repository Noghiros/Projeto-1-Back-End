# Projeto 1 — Programação Web Back-End

## Tema: Mensagens Instantâneas (sem uso de Express)

Este projeto simula um sistema simples de grupos de mensagens, com rotas feitas usando apenas Node.js puro e MongoDB.

---

## ✅ Requisitos

- Node.js instalado: https://nodejs.org/
- MongoDB rodando localmente (ou usar MongoDB Atlas)

---

## 🚀 Como rodar o projeto

### 1. Instale as dependências:
```bash
npm install
```

### 2. Inicie o servidor:
```bash
npm start
```

O servidor será iniciado em: `http://localhost:3000`

---

## 📡 Endpoints disponíveis

### Criar grupo
`POST /groups`
```json
{
  "name": "Nome do grupo",
  "members": []
}
```

### Listar grupos
`GET /groups`

### Deletar grupo
`DELETE /groups/:id`

---

## 🛠️ Tecnologias
- Node.js
- MongoDB
- Mongoose

---

Feito para a disciplina de Programação Web Back-End — EC48B
