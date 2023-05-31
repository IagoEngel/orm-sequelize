'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pessoas extends Model {
    static associate(models) {
      Pessoas.hasMany(models.Turmas, {
        foreignKey: 'docente_id'
      }) //se não colocasse o foreignKey, o sequelize iria criar assim: PessoaId
      Pessoas.hasMany(models.Matriculas, {
        foreignKey: 'estudante_id'
      })
    }
  }
  Pessoas.init({
    nome: {
      type: DataTypes.STRING,
      validate: {
        funcaoValidadora: function(dado) {
          if (dado.length < 3) throw new Error('o campo nome deve ter mais de 3 caracteres')
        }
      }
    },
    ativo: DataTypes.BOOLEAN,
    email: {
      type: DataTypes.STRING,
      validate: {
        // isEmail: true
        isEmail: {
          args: true,
          msg: 'dado do tipo e-mail inválido'
        }
      }
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pessoas',
    paranoid: true,
    defaultScope: { // com esse escopo padrão, toda requisição do modelo Pessoa vai trazer somente os usuários com ativo = true do banco
      where: { ativo: true }
    },
    scopes: {
      todos: { where: {} }, // criou-se esse escopo para trazer todos os dados de Pessoas. Mesmo, quando não estejam ativos. Para utilizar ele, é só escrever .scope('nome do escopo') antes do método que faz a requisição no banco (ex: findAll())
      // etc: {constraint: valor}
    }
  });
  return Pessoas;
};