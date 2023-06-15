const { Router } = require('express')
const PessoaController = require('../controllers/PessoaController')
const MatriculaController = require('../controllers/MatriculaController')

const router = Router()

router.get('/pessoas', PessoaController.pegaTodasAsPessoas)
router.get('/pessoas/ativas', PessoaController.pegaPessoasAtivas)
router.get('/pessoas/:id', PessoaController.pegaPessoaPorId)
router.get('/pessoas/:estudanteId/matricula', PessoaController.pegaMatriculas)
router.get('/pessoas/:estudanteId/matricula/:matriculaId', MatriculaController.pegaUmaMatricula)
router.get('/pessoas/matricula/lotada', MatriculaController.pegaTurmasLotadas)
router.get('/pessoas/matricula/:turmaId/confirmadas', MatriculaController.pegaMatriculasPorTurma)

router.post('/pessoas', PessoaController.criaPessoa)
router.post('/pessoas/:id/restaura', PessoaController.restauraPessoa)
router.post('/pessoas/:estudanteId/matricula', MatriculaController.criaMatricula)
router.post('/pessoas/:estudanteId/matricula/:matriculaId/restaura', MatriculaController.restauraMatricula)
router.post('/pessoas/:estudanteId/cancela', PessoaController.cancelaPessoa)

router.put('/pessoas/:id', PessoaController.atualizarPessoa)
router.put('/pessoas/:estudanteId/matricula/:matriculaId', MatriculaController.atualizaMatricula)

router.delete('/pessoas/:id', PessoaController.apagaPessoa)
router.delete('/pessoas/:estudanteId/matricula/:matriculaId', MatriculaController.apagaMatricula)

module.exports = router