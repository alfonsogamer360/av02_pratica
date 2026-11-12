
const API_URL = import.meta.env.VITE_API_URL || "/api";

async function requisicao(endpoint, opcoes = {}) {
  const resposta = await fetch(`${API_URL}${endpoint}`, opcoes);

  if (!resposta.ok) {
    const erro = await resposta.text();
    throw new Error(erro || `Erro HTTP ${resposta.status}`);
  }

  if (resposta.status === 204) return null;

  return resposta.json();
}

export const jogoService = {
  listarTodos() {
    return requisicao("/jogos");
  },

  buscarPorId(id) {
    return requisicao(`/jogos/${id}`);
  },

  criar(jogo) {
    return requisicao("/jogos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jogo)
    });
  },

  atualizar(id, jogo) {
    return requisicao(`/jogos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jogo)
    });
  },

  excluir(id) {
    return requisicao(`/jogos/${id}`, {
      method: "DELETE"
    });
  }
};
