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

    static async pegaUmaMatricula(req, res) {
        try {
            const { estudanteId } = req.params 
            const { matriculaId } = req.params
            const umaMatricula = await database.Matriculas.findOne( 
                { where: { 
                    id: Number(matriculaId), 
                    estudante_Id: Number(estudanteId)}
                } 
            )
            return res.status(200).json(umaMatricula);
        } catch (err) {
            return res.status(500).send(err.message)
        }
    }

    static async criaMatricula(req, res) {
        try {
            const { estudanteId } = req.params
            const novaMatricula = { ...req.body, estudante_id: Number(estudanteId)}
            const novaMatriculaCriada = await database.Matriculas.create(novaMatricula)
            return res.status(200).json(novaMatriculaCriada)
        } catch (err) {
            return res.status(500).send(err.message)
        }
    }

    static async atualizaMatricula(req, res) {
        try {
            const { estudanteId } = req.params
            const { matriculaId } = req.params
            const atualizacoesPessoa = req.body
            await database.Pessoas.update(atualizacoesPessoa, { 
                where: { 
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId) 
                } 
            })
            const matriculaAtualizada = await database.Matriculas.findOne( { where: { id: Number(matriculaId) } } )
            return res.status(200).json(matriculaAtualizada)
        } catch (err) {
            return res.status(500).send(err.message)
        }
    }

    static async deletarMatriculas(req, res) {
        try {   
            const { estudanteId } = req.params
            const { matriculaId } = req.params
            await database.Matriculas.destroy( { 
                where: { 
                    id: Number(matriculaId) 
                } 
            })
            return res.status(200).json("matricula deletada")
        } catch (err) {
            return res.status(500).send(err.message)
        }
    }

    static async restauraPessoa(req, res) {
        try {
            const { id } = req.params
            await database.Pessoas.restore({ where: { id: Number(id) } })
            return res.status(200).json({ message: "Id restaurado" })
        } catch (err) {
            return res.status(500).send(err.message)
        }
    }

}


module.exports = PessoaController;