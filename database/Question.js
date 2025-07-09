const Sequelize = require('sequelize');
const connection = require('./database');

const Question = connection.define('questions', {
    title: {
        type: Sequelize.STRING, // Define o tipo de dado como STRING (texto curto)
        allowNull: false // Não permite valores nulos
    },
    description: {
        type: Sequelize.TEXT, // Define o tipo de dado como TEXT (texto longo)
        allowNull: false // Não permite valores nulos
    }
});

Question.sync({ force: false }).then(() => {}) // Cria a tabela no banco de dados, se não existir

module.exports = Question; // Exporta o modelo Question para ser usado em outros arquivos