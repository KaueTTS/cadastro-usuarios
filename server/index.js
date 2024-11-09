// backend/index.js
const express = require('express');
const db = require('./db');
const app = express();
const path = require('path');
const PORT = 3000;

app.use(express.static('client/public'))
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../client/views')); // Definindo a pasta de views para apontar para 'client/views'

// Rota para exibir o formulário de registro
app.get('/register', (req, res) => {
    res.render('register');
});

// Rota para processar o registro
app.post('/register', (req, res) => {
    const { nome, email, senha, data_nascimento } = req.body;
    const query = 'INSERT INTO usuarios (nome, email, senha, data_nascimento) VALUES (?, ?, ?, ?)';

    db.query(query, [nome, email, senha, data_nascimento], (err, result) => {
        if (err) {
            console.error(err);
            return res.send('Erro ao registrar o usuário.');
        }
        res.redirect(`/welcome?nome=${nome}`);
    });
});

// Rota para exibir a página de boas-vindas
app.get('/welcome', (req, res) => {
    const nome = req.query.nome;
    res.render('welcome', { nome });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}/register`);
});
