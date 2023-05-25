const { Router } = require('express')
const PessoaController = require('../controllers/PessoaController')

const router = Router()

router.get('/pessoas', PessoaController.pegaTodasAsPessoas)
router.get('/pessoas/:id', PessoaController.pegaPessoaPorId)
router.post('/pessoas', PessoaController.criaPessoa)
router.put('/pessoas/:id', PessoaController.atualizarPessoa)
router.delete('/pessoas/:id', PessoaController.apagaPessoa)

module.exports = router