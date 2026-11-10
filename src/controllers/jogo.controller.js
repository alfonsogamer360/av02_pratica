import { serviceJogo } from "../services/jogo.service.js";

class ControllerJogo {
    async getAll (req,res) {
        try {
            const jogo = await serviceJogo.getAll()
            return res.status(200).json(jogo)
        } catch (error) {
            console.error(error)
            res.status(500).json({error: "Erro ao pegar os jogos"})
        }
    }

    async getById (req,res) {
        const jogoId = req.params.id
        try {
            const jogo = await serviceJogo.getById(jogoId)
            if (jogo) {
                return res.status(200).json(jogo)
            } else {
                return res.status(404).json({message: `Erro, jogo não achado`}) 
            }
        } catch (error) {
            console.error(error)
            res.status(500).json({error: "Erro ao pegar o jogo pelo id"})
        }
    }

    async create (req,res) {
        try {
            const jogo = await serviceJogo.create(req.body)
            return res.status(201).json(jogo)
        } catch (error) {
            console.error(error)
            res.status(500).json({error: "Erro ao criar o jogo"})
        }
    }

    async patchKnex (req,res) {
        const jogoId = req.params.id
        try {
            const jogo = await serviceJogo.patchKnex(jogoId,req.body)
            if (jogo) {
                return res.status(200).json(jogo)
            } else {
                return res.status(404).json({message: `Erro, jogo não achado`})  
            }
        } catch (error) {
            console.error(error)
            res.status(500).json({error: "Erro ao atualizar o jogo"})
        }
    }

    async delete (req,res) {
        const jogoId = req.params.id
        try {
            const jogo = await serviceJogo.delete(jogoId)
            if (jogo) {
                return res.status(204).json(jogo)
            } else {
                return res.status(404).json({message: `Erro, jogo não achado`}) 
            }
        } catch (error) {
            console.error(error)
            res.status(500).json({error: "Erro ao deletar o jogo"})
        }
    }
}

export const controllerJogo = new ControllerJogo() 