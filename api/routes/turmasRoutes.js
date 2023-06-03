const {Router} = require('express')
const TurmaController = require('../controllers/TurmaController')

const router = Router()

router.get('/turmas', TurmaController.pegarTodasAsTurmas)
router.get('/turmas/:id', TurmaController.pegarTurmaPorId)
router.post('/turmas', TurmaController.criaTurma)
router.put('/turmas/:id', TurmaController.atualizarTurma)
router.delete('/turmas/:id', TurmaController.deletarTurma)


module.exports = router