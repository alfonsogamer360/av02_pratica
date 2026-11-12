import axios from 'axios';

const api = axios.create({
  // Altere a porta caso seu backend rode em outra (ex: 3000, 3333 ou 8080)
  baseURL: 'http://localhost:3000'
});

export const jogoService = {
  // GET ALL
  listarTodos: async () => {
    const response = await api.get('/jogos');
    return response.data;
  },

  // GET BY ID
  buscarPorId: async (id) => {
    const response = await api.get(`/jogos/${id}`);
    return response.data;
  },

  // POST
  criar: async (dadosJogo) => {
    const response = await api.post('/jogos', dadosJogo);
    return response.data;
  },

  // PATCH (conforme identificado em PATCH.png no seu repositório)
  atualizar: async (id, dadosJogo) => {
    const response = await api.patch(`/jogos/${id}`, dadosJogo);
    return response.data;
  },

  // DELETE
  excluir: async (id) => {
    const response = await api.delete(`/jogos/${id}`);
    return response.data;
  }
};

export default api;