const database = require('../models');

class PessoaController {
    static async pegaTodasAsPessoas(req, res) {
        try {
            const todasAsPessoas = await database.Pessoas.findAll();
            return res.status(200).json(todasAsPessoas);
        } catch (err) {
            return res.status(500).send(err.message)
        }
    }

    static async pegaUmaPessoa(req, res) {
        try {
            const { id } = req.params 
            const umaPessoa = await database.Pessoas.findOne( { where: { id: Number(id) } } )
            return res.status(200).json(umaPessoa);
        } catch (err) {
            return res.status(500).send(err.message)
        }
    }

    static async criarPessoa(req, res) {
        try {
            const novaPessoa = req.body
            const novaPessoaCriada = await database.Pessoas.create(novaPessoa)
            return res.status(200).json(novaPessoaCriada)
        } catch (err) {
            return res.status(500).send(err.message)
        }
    }

    static async atualizarPessoa(req, res) {
        try {
            const { id } = req.params
            const atualizacoesPessoa = req.body
            await database.Pessoas.update(atualizacoesPessoa, { where: { id: Number(id) } })
            const pessoaAtualizada = await database.Pessoas.findOne( { where: { id: Number(id) } } )
            return res.status(200).json(pessoaAtualizada)
        } catch (err) {
            return res.status(500).send(err.message)
        }
    }

    static async deletarPessoa(req, res) {
        try {   
            const { id } = req.params
            const pessoaDeletada = await database.Pessoas.destroy( { where: { id: Number(id) } } )
            return res.status(200).json("Pessoa deletada")
        } catch (err) {
            return res.status(500).send(err.message)
        }
    }

}



module.exports = PessoaController;