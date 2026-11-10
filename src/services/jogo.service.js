import { repositoryJogo } from "../repositories/jogo.repository.js";

class ServiceJogo {
    async getAll() {
        const pegarTudo = await repositoryJogo.getAll()
        return pegarTudo
    }
    
    async getById(id) {
        const pegarPorId = await repositoryJogo.getById(id)
        return pegarPorId
    }
    
    async create(dados) {
        const criar = await repositoryJogo.create(dados)
        return criar
    }

    async patchKnex(id,dados) {
        const patch = await repositoryJogo.patchKnex(id,dados)
        return patch
    }
    
    async delete(id) {
        const deletar = await repositoryJogo.delete(id)
        return deletar
    }
}

export const serviceJogo = new ServiceJogo()
