const database = require('../models'); //nao precisa escrever index.js, pq o javascript já procura esse arquivo se não tiver

class PessoaController {
    static async pegaTodasAsPessoas(req, res) {
        try {
            const todasAsPessoas = await database.Pessoas.scope('todos').findAll();
            return res.status(200).json(todasAsPessoas);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async pegaPessoasAtivas(req, res) {
        try {
            const pessoasAtivas = await database.Pessoas.findAll();
            return res.status(200).json(pessoasAtivas);
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

    static async restauraPessoa(req, res) {
        const { id } = req.params;

        try {
            await database.Pessoas.restore({ where: { id: Number(id) } });

            return res.status(200).json({ mensagem: `id ${id} restaurado` });
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async pegaMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params;

        try {
            const matricula = await database.Matriculas.findOne({
                where: {
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }
            });

            return res.status(200).json(matricula);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error.message);
        }
    }

    static async criaMatricula(req, res) {
        const { estudanteId } = req.params;
        console.log(estudanteId);
        const novaMatricula = { ...req.body, estudante_id: Number(estudanteId) };
        console.log(novaMatricula);

        try {
            const novaMatriculaCriada = await database.Matriculas.create(novaMatricula);

            return res.status(200).json(novaMatriculaCriada);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error.message);
        }
    }

    static async atualizarMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params;
        const novosDados = req.body;

        try {
            await database.Matriculas.update(novosDados, {
                where: {
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }
            });
            const matriculaAtualizada = await database.Matriculas.findOne({ where: { id: Number(matriculaId) } });

            return res.status(200).json(matriculaAtualizada);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async apagaMatricula(req, res) {
        const { matriculaId } = req.params;

        try {
            await database.Matriculas.destroy({ where: { id: Number(matriculaId) } });

            return res.status(200).json({ mensagem: `id ${matriculaId} foi deletado` });
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

}

module.exports = PessoaController