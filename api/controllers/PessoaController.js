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

    static async pegaPessoaPorId(req, res) {
        const { id } = req.params;

        try {
            const pessoa = await database.Pessoas.findOne({ where: { id: Number(id) } });

            return res.status(200).json(pessoa);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async criaPessoa(req, res) {
        const novaPessoa = req.body;

        try {
            const novaPessoaCriada = await database.Pessoas.create(novaPessoa);

            return res.status(200).json(novaPessoaCriada);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async atualizarPessoa(req, res) {
        const { id } = req.params;
        const novosDados = req.body;

        try {
            await database.Pessoas.update(novosDados, { where: { id: Number(id) } });
            const pessoaAtualizada = await database.Pessoas.findOne({ where: { id: Number(id) } });

            return res.status(200).json(pessoaAtualizada);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async apagaPessoa(req, res) {
        const { id } = req.params;
        
        try {
            await database.Pessoas.destroy({ where: { id: Number(id) } });

            return res.status(200).json({ mensagem: `id ${id} foi deletado` });
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}

module.exports = PessoaController