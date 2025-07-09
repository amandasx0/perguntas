require('dotenv').config();
const { Sequelize } = require('sequelize');

console.log('Iniciando conexão com banco de dados...');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

sequelize.authenticate()
  .then(() => console.log('Conexão com o banco de dados bem-sucedida'))
  .catch(err => console.error('Erro ao conectar no banco de dados:', err));

module.exports = sequelize;