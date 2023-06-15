// const database = require('../models'); //nao precisa escrever index.js, pq o javascript já procura esse arquivo se não tiver
// const Sequelize = require('sequelize');

const { PessoasServices } = require('../services')
const pessoasServices = new PessoasServices();

class PessoaController {
    static async pegaTodasAsPessoas(req, res) {
        try {
            const todasAsPessoas = await pessoasServices.pegaTodosOsRegistros();
            return res.status(200).json(todasAsPessoas);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async pegaPessoasAtivas(req, res) {
        try {
            const pessoasAtivas = await pessoasServices.pegaRegistrosAtivos();
            return res.status(200).json(pessoasAtivas);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async pegaPessoaPorId(req, res) {
        const { id } = req.params;

        try {
            const pessoa = await pessoasServices.pegaUmRegistro(Number(id));

            return res.status(200).json(pessoa);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async criaPessoa(req, res) {
        const novaPessoa = req.body;

        try {
            const novaPessoaCriada = await pessoasServices.criaRegistro(novaPessoa);

            return res.status(200).json(novaPessoaCriada);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async atualizarPessoa(req, res) {
        const { id } = req.params;
        const novosDados = req.body;

        try {
            await pessoasServices.atualizaRegistro(novosDados, Number(id));
            const pessoaAtualizada = await pessoasServices.pegaUmRegistro(Number(id));

            return res.status(200).json(pessoaAtualizada);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async apagaPessoa(req, res) {
        const { id } = req.params;

        try {
            await pessoasServices.apagaRegistro(Number(id));

            return res.status(200).json({ mensagem: `id ${id} foi deletado` });
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async restauraPessoa(req, res) {
        const { id } = req.params;

        try {
            await pessoasServices.restaurarRegistro(Number(id));

            return res.status(200).json({ mensagem: `id ${id} restaurado` });
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async pegaMatriculas(req, res) {
        const { estudanteId } = req.params;

        try {
            // const pessoa = await database.Pessoas.findOne({ where: { id: Number(estudanteId) } });
            // const matriculas = await pessoa.getAulasMatriculadas(); // <-- mixin criado "automaticamente" com o escopo de associação em models
            const pessoa = await pessoasServices.pegaUmRegistro(estudanteId);
            const matriculas = await pessoa.getAulasMatriculadas();

            return res.status(200).json(matriculas);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async cancelaPessoa(req, res) {
        const { estudanteId } = req.params;

        try {
            // adiciona um 'rollback' para o código dentro da função
            // caso algo dê errado, as alterações seram desfeitas 
            await pessoasServices.cancelaPessoasEMatriculas(Number(estudanteId));

            return res.status(200).json({ message: `Matrículas ref. estudante ${estudanteId} canceladas` });
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

}

module.exports = PessoaController