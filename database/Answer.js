const Sequelize = require('sequelize');
const connection = require('./database');

const Answer = connection.define('answers', {
    body: {
        type: Sequelize.TEXT, // Define o tipo de dado como TEXT (texto longo)
        allowNull: false // Não permite valores nulos
    },
    questionId: {
        type: Sequelize.INTEGER, // Define o tipo de dado como INTEGER (número inteiro)
        allowNull: false, // Não permite valores nulos
        references: {
            model: 'questions', // Referencia a tabela 'questions'
            key: 'id' // Chave estrangeira que referencia o campo 'id' da tabela 'questions'
        }
    }
});

Answer.sync({ force: false }).then(() => {}) // Cria a tabela no banco de dados, se não existir
module.exports = Answer; // Exporta o modelo Answer para ser usado em outros arquivos