const express = require('express');
const app = express();

// Configurações do Express, middlewares, rotas, etc.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Defina suas rotas aqui
app.get('/', (req, res) => {
    res.send('Hello World!');
});

module.exports = app;
