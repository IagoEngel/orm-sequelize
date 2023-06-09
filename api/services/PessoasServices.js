const Services = require('./Services');
const database = require('../models');

class PessoasServices extends Services {
    constructor() {
        super('Pessoas')
        this.matriculas = new Services('Matriculas')
    }

    async pegaRegistrosAtivos(where = {}) {
        return database[this.nomeDoModelo].findAll({ where: { ...where } })
    }

    async pegaTodosOsRegistros(where = {}) {
        return database[this.nomeDoModelo].scope('todos').findAll({ where: { ...where } });
    }

    async cancelaPessoasEMatriculas(estudanteId) {
        return database.sequelize.transaction(async transacao => {
            await super.atualizaRegistro({ ativo: false }, estudanteId, { transaction: transacao });
            await this.matriculas.atualizaRegistros({ status: 'cancelado' }, { estudante_id: estudanteId }, { transaction: transacao });
        });
    }

    async pegaMatriculaDePessoa(matriculaId, estudanteId) {
        return this.matriculas.pegaUmRegistro(matriculaId, { estudante_id: estudanteId });
    }

    async criarMatriculaDePessoa(novaMatricula) {
        return this.matriculas.criaRegistro(novaMatricula);
    }

    async atualizaMatriculaDePessoa(estudanteId, matriculaId, novosDados) {
        return this.matriculas.atualizaRegistros(novosDados, { id: matriculaId, estudante_id: estudanteId });
    }

    async apagaMatricula(matriculaId) {
        return this.matriculas.apagaRegistro(matriculaId);
    }

}

module.exports = PessoasServices