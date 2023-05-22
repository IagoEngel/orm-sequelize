const database = require('../models'); //nao precisa escrever index.js, pq o javascript já procura esse arquivo se não tiver

class PessoaController {
    static async pegaTodasAsPessoas(req, res) {
        try {
            const todasAsPessoas = await database.Pessoas.findAll();
            return res.status(200).json(todasAsPessoas);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}

module.exports = PessoaController