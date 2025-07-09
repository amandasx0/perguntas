const express = require('express');
const app = express();

app.set('view engine', 'ejs'); // Configura o EJS como motor de visualização
app.use(express.static('public')); // Serve arquivos estáticos da pasta 'public'


app.get('/:nome?/:lang', (req, res) => {
    var nome = req.params.nome || 'Visitante';
    var lang = req.params.lang;

    var exibirMsg = false;

    var produtos = [
        { id: 1, nome: 'Produto 1', preco: 10.00 },
        { id: 2, nome: 'Produto 2', preco: 20.00 },
        { id: 3, nome: 'Produto 3', preco: 30.00 },
    ];

    res.render('index', {
        title: 'Página Inicial',
        message: `Bem-vindo ao Guia de Perguntas, ${nome}!`,
        lang: `Sua linguagem favorita é ${lang}.`,
        msg: exibirMsg,
        produtos: produtos
    });
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});