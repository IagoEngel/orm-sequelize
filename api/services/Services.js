const database = require('../models')

class Services {
    constructor(nomeDoModelo) {
        this.nomeDoModelo = nomeDoModelo
    }

    async pegaTodosOsRegistros() {
        return database[this.nomeDoModelo].findAll();
    }

    async pegaUmRegistro(id, where = {}) {
        return database[this.nomeDoModelo].findOne({ where: { id: id, ...where } });
    }

    async criaRegistro(dados) {
        return database[this.nomeDoModelo].create(dados);
    }

    async atualizaRegistro(dadosAtualizados, id, transacao = {}) {
        return database[this.nomeDoModelo].update(dadosAtualizados, { where: { id: id } }, transacao);
    }

    async atualizaRegistros(dadosAtualizados, where, transacao = {}) {
        return database[this.nomeDoModelo].update(dadosAtualizados, { where: { ...where } }, transacao);
    }

    async restaurarRegistro(id) {
        return database[this.nomeDoModelo].restore({ where: { id } });
    }

    async apagaRegistro(id) {
        return database[this.nomeDoModelo].destroy({ where: { id: id } });
    }

}

module.exports = Services