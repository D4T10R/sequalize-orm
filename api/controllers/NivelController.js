const database = require('../models')

class NivelController {
    static async pegarTodosNiveis(req, res) {
        try {
            const niveis = await database.Niveis.findAll()
            res.status(200).json(niveis)
        } catch(err) {
            res.status(500).send(err.message)
        }
    }

    static async pegarNivelPorId(req, res) {
        try {
            const {id} = req.params
            const nivel = await database.Niveis.findOne({where: {id: Number(id)}})
            res.status(200).json(nivel)
        } catch (err) {
            res.status(500).send(err.message)
        }
    }
    
    static async criarNivel(req, res) {
        try {
            const dadosNivel = req.body
            const nivelCriado = await database.Niveis.create(dadosNivel)
            res.status(202).send(nivelCriado)
        } catch (err) {
            res.status(500).send(err.message)
        }
    }

    static async atualizarNivel(req, res) {
        try {
            const {id} = req.params
            const dadosNivelAtualizado = req.body
            const nivelAtualizado = await database.Niveis.update(dadosNivelAtualizado, {where: {id: Number(id)}})
            res.status(200).send('Nivel atualizado com SUCESSO!')
        } catch (err) {
            res.status(500).send(err.message)
        }
    }

    static async deletarNivel(req, res) {
        try {
            const {id} = req.params
            await database.Niveis.destroy({where: {id: Number(id)}})
            res.status(200).send('Nivel DELETADO com SUCESSO!!!')
        } catch (err) {
            res.status(500).send(err.message)
        }
    }
}

module.exports = NivelController