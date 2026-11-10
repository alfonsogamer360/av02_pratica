import { knex } from "../database/knex.js";

class RepositoryJogo {

    async getAll () {
        const pegarTudo = knex('jogos').select("*").returning("*")
        return pegarTudo
    }

    async getById (id) {
        const pegarPorId = knex('jogos').where({id}).select("*").returning("*")
        return pegarPorId
    }
    
    async create (dados) {
        const [criar] = await knex('jogos').insert(dados).returning("*")
        return criar
    } 

    async patchKnex (id, dados) {
        const [patch] = await knex('jogos').where({id}).update(dados).returning("*") 
        return patch
    }

    async delete (id){
        const [deletar] = await knex('jogos').where({id}).del().returning("*")  
        return deletar
    }
}

export const repositoryJogo = new RepositoryJogo()