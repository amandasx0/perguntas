const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database'); // Importa a conexão com o banco de dados
const questionModel = require('./database/Question'); // Importa o modelo de Pergunta
const answerModel = require('./database/Answer'); // Importa o modelo de Resposta

connection.authenticate()
    .then(() => {
        console.log('Conexão com o banco de dados realizada com sucesso!');
    }
    ).catch((error) => {
        console.error('Erro ao conectar com o banco de dados:', error);
    });

app.set('view engine', 'ejs'); // Configura o EJS como motor de visualização
app.use(express.static('public')); // Serve arquivos estáticos da pasta 'public'
app.use(bodyParser.urlencoded({ extended: false })); // Middleware para analisar dados do corpo da requisição
app.use(bodyParser.json()); // Middleware para analisar JSON


app.get('/', (req, res) => {
    questionModel.findAll({ raw: true, order: [['id', 'DESC']] }) // Busca todas as perguntas do banco de dados, raw: true para retornar apenas os objetos simples, order: [['id', 'DESC']] para ordenar as perguntas do mais recente para o mais antigo
        .then(questions => {
            res.render('index', {
                questions: questions // Passa as perguntas para a view
            });
        })
        .catch(error => {
            console.error('Erro ao buscar perguntas:', error);
            res.status(500).send('Erro ao buscar perguntas');
        });
});

app.get('/perguntas', (req, res) => {
    res.render('perguntas');
});

app.post('/question', (req, res) => {
    console.log(req.body);
    var title = req.body.title;
    var description = req.body.description;

    // Cria uma nova pergunta no banco de dados
    questionModel.create({
        title: title,
        description: description
    }).then(() => {
       res.redirect('/'); 
    });
});

app.get('/pergunta/:id', (req, res) => {
    var id = req.params.id;
    questionModel.findOne({
        where: { id: id }
    }).then(question => {
        if (question) {
            // Busca as respostas associadas à pergunta
            answerModel.findAll({
                where: { questionId: question.id },
                order: [['id', 'DESC']] // Ordena as respostas do mais recente para o mais antigo
            }).then(answers => {
                res.render('pergunta', {
                    question: question,
                    answers: answers // Passa as respostas para a view
                });
            }).catch(error => {
                console.error('Erro ao buscar respostas:', error);
                res.status(500).send('Erro ao buscar respostas');
            });
        } else {
            res.redirect('/');
        }
    }).catch(error => {
        console.error('Erro ao buscar pergunta:', error);
        res.status(500).send('Erro ao buscar pergunta');
    });
});

app.post('/answer', (req, res) => {
    var body = req.body.body;
    var questionId = req.body.question;

    answerModel.create({
        body: body,
        questionId: questionId
    }).then(() => {
        res.redirect('/pergunta/' + questionId);
    }).catch(error => {
        console.error('Erro ao criar resposta:', error);
        res.status(500).send('Erro ao criar resposta');
    })
})

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});