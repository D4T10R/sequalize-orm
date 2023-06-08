const database = require('../models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

class TurmaController {
    static async pegarTodasAsTurmas(req, res) {
        const { data_incial, data_final } = req.query
        const where = {}
        data_incial || data_final ? where.data_inicio = {} : null
        data_incial ? where.data_inicio[Op.gte] = data_incial : null
        data_final ? where.data_inicio[Op.lte] = data_final : null
        try {
            const todasAsTurmas = await database.Turmas.findAll({ where })
            res.status(200).json(todasAsTurmas)
        } catch (err) {
            res.status(500).send(err.message)
        }
    }

    // {
    //     where: {
    //         data_incio: {
    //             [Op.gte]: data,
    //             [op.lte]: data
    //         }
    //     }
    // }

    static async pegarTurmaPorId(req, res) {
        try {
            const { id } = req.params
            const turma = await database.Turmas.findOne({ where: { id: Number(id) } })
            res.status(200).json(turma)
        } catch(err) {
            res.status(500).send(err.message)
        }
    }

    static async criaTurma(req, res) {
        try {
            const dadosTurma = req.body
            const novaTurmaCriada = database.Turmas.create(dadosTurma)
            res.status(201).send('Nova turma criada com SUCESSO')
        } catch (err) {
            res.status(500).send(err.message)
        }
    }

    static async atualizarTurma(req, res) {
        try {
            const { id } = req.params
            const dadosTurmaAtulizados = req.body
            await database.Turmas.update(dadosTurmaAtulizados,  { where: { id: Number(id) } })
            const turmAtualizada = await database.Turmas.findOne( { where: { id: Number(id) } } )
            res.send(200).send(turmAtualizada)
        } catch(err) {
            res.status(500).send(err.message)
        }
    }

    static async deletarTurma(req, res) {
        try {
            const { id } = req.params
            const turmaDeletada = await database.Turmas.destroy({ where: { id: Number(id) } })
            res.status(200).send('Pessoa deletada com SUCESSO!')
        } catch(err) {
            res.status(500).send(err.message)
        }
    }
}

module.exports = TurmaController