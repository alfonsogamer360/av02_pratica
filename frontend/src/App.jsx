import React, { useState, useEffect } from 'react';
import {
  Gamepad2,
  Search,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  X,
  Filter,
  Monitor,
  Calendar,
  Hash,
  Edit2,
  Trash2
} from 'lucide-react';
import { jogoService } from './services/api';
import JogoForm from './components/JogoForm';
import JogoList from './components/JogoList';

export default function App() {
  const [jogos, setJogos] = useState([]);
  const [filtroTexto, setFiltroTexto] = useState('');
  const [jogoEmEdicao, setJogoEmEdicao] = useState(null);
  const [jogoDetalhes, setJogoDetalhes] = useState(null);
  const [buscaId, setBuscaId] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [feedback, setFeedback] = useState({ tipo: '', mensagem: '' });

  const exibirFeedback = (tipo, mensagem) => {
    setFeedback({ tipo, mensagem });
    setTimeout(() => setFeedback({ tipo: '', mensagem: '' }), 4500);
  };

  // GET ALL
  const carregarJogos = async () => {
    setCarregando(true);
    try {
      const dados = await jogoService.listarTodos();
      setJogos(Array.isArray(dados) ? dados : dados.data || []);
    } catch (error) {
      console.error(error);
      exibirFeedback(
        'erro',
        'Falha ao buscar jogos em http://localhost:3000/jogos. Verifique se o CORS está ativo no backend.'
      );
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarJogos();
  }, []);

  // POST ou PATCH
  const handleSalvarJogo = async (dadosJogo) => {
    try {
      if (jogoEmEdicao) {
        await jogoService.atualizar(jogoEmEdicao.id, dadosJogo);
        exibirFeedback('sucesso', `Jogo #${jogoEmEdicao.id} atualizado com sucesso!`);
        setJogoEmEdicao(null);
      } else {
        await jogoService.criar(dadosJogo);
        exibirFeedback('sucesso', 'Novo jogo adicionado ao catálogo!');
      }
      carregarJogos();
    } catch (error) {
      console.error(error);
      exibirFeedback('erro', 'Erro ao salvar jogo. Confira os campos no console.');
    }
  };

  // DELETE
  const handleExcluirJogo = async (id) => {
    if (!window.confirm(`Tem certeza que deseja remover o jogo #${id}?`)) return;
    try {
      await jogoService.excluir(id);
      exibirFeedback('sucesso', `Jogo #${id} excluído com sucesso!`);
      if (jogoEmEdicao?.id === id) setJogoEmEdicao(null);
      if (jogoDetalhes?.id === id) setJogoDetalhes(null);
      carregarJogos();
    } catch (error) {
      console.error(error);
      exibirFeedback('erro', 'Não foi possível excluir o registro.');
    }
  };

  // GET BY ID
  const handleBuscarPorId = async (id) => {
    if (!id) return;
    try {
      const resultado = await jogoService.buscarPorId(id.trim());
      const payload = resultado.data || resultado;
      // Como o Knex/Postgres costuma devolver um array [ { ... } ], pegamos o índice 0
      const jogoEncontrado = Array.isArray(payload) ? payload[0] : payload;

      if (!jogoEncontrado) {
        exibirFeedback('erro', `Nenhum jogo encontrado com o ID #${id}.`);
        return;
      }

      setJogoDetalhes(jogoEncontrado);
    } catch (error) {
      console.error(error);
      exibirFeedback('erro', `Nenhum jogo encontrado com o ID #${id}.`);
    }
  };

  // Filtro local instantâneo por título, gênero ou plataforma
  const jogosFiltrados = jogos.filter((jogo) => {
    const termo = filtroTexto.toLowerCase();
    const titulo = (jogo.titulo || jogo.nome || '').toLowerCase();
    const genero = (jogo.genero || '').toLowerCase();
    const plataforma = (jogo.plataforma || '').toLowerCase();
    return (
      titulo.includes(termo) ||
      genero.includes(termo) ||
      plataforma.includes(termo)
    );
  });

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Topbar / Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-3.5">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-3 rounded-2xl shadow-lg shadow-indigo-500/20">
              <Gamepad2 className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-white">
                Catálogo de Jogos
              </h1>
              <p className="text-xs sm:text-sm text-slate-400">
                Gerenciamento completo via API REST • React + Tailwind v4
              </p>
            </div>
          </div>

          {/* Controles: Busca por ID + Atualizar */}
          <div className="flex flex-wrap items-center gap-2.5">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleBuscarPorId(buscaId);
              }}
              className="flex items-center"
            >
            <input
                type="text"
                placeholder="Buscar por ID (UUID)..."
                value={buscaId}
                onChange={(e) => setBuscaId(e.target.value)}
                className="bg-[#111827] border border-slate-700 rounded-l-xl px-3.5 py-2 text-sm text-white placeholder-slate-500 w-44 focus:outline-none focus:border-indigo-500"
                />
              <button
                type="submit"
                className="bg-slate-800 hover:bg-slate-700 border border-l-0 border-slate-700 px-3.5 py-2 rounded-r-xl text-slate-200 transition-colors cursor-pointer"
                title="Consultar GET /jogos/:id"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>

            <button
              onClick={carregarJogos}
              className="px-3.5 py-2 bg-[#111827] hover:bg-slate-800 border border-slate-700 rounded-xl text-slate-300 text-sm flex items-center gap-2 transition-colors cursor-pointer"
              title="Recarregar dados da API"
            >
              <RefreshCw className={`w-4 h-4 ${carregando ? 'animate-spin text-indigo-400' : ''}`} />
              <span className="hidden sm:inline">Sincronizar</span>
            </button>
          </div>
        </header>

        {/* Banner de Feedback */}
        {feedback.mensagem && (
          <div
            className={`mb-6 p-4 rounded-xl border flex items-center justify-between gap-3 text-sm ${
              feedback.tipo === 'erro'
                ? 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
            }`}
          >
            <div className="flex items-center gap-3">
              {feedback.tipo === 'erro' ? (
                <AlertCircle className="w-5 h-5 shrink-0" />
              ) : (
                <CheckCircle2 className="w-5 h-5 shrink-0" />
              )}
              <span>{feedback.mensagem}</span>
            </div>
            <button
              onClick={() => setFeedback({ tipo: '', mensagem: '' })}
              className="opacity-70 hover:opacity-100 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Cartão Visual de Detalhes (GET BY ID) */}
        {jogoDetalhes && (
          <div className="mb-8 bg-gradient-to-br from-[#111827] via-[#131c31] to-[#0f172a] border border-indigo-500/40 rounded-2xl p-6 shadow-2xl shadow-indigo-950/40 relative overflow-hidden">
            {/* Brilho decorativo de fundo */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 relative z-10">
              {/* Lado Esquerdo: Ícone + Título + UUID */}
              <div className="flex items-start gap-4">
                <div className="bg-indigo-500/15 border border-indigo-500/30 p-3.5 rounded-2xl text-indigo-400 shrink-0">
                  <Gamepad2 className="w-8 h-8" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-sky-500/15 text-sky-400 border border-sky-500/30">
                      Jogo Encontrado
                    </span>
                    <span className="flex items-center gap-1 text-xs font-mono text-slate-400 bg-slate-900/80 px-2.5 py-0.5 rounded-md border border-slate-800">
                      <Hash className="w-3 h-3 text-slate-500" />
                      {jogoDetalhes.id}
                    </span>
                  </div>
                  <h2 className="text-2xl font-extrabold text-white tracking-tight mt-1">
                    {jogoDetalhes.titulo}
                  </h2>
                </div>
              </div>

              {/* Botão Fechar */}
              <button
                onClick={() => setJogoDetalhes(null)}
                className="self-end sm:self-start text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800/60 hover:bg-slate-700 transition-colors cursor-pointer"
                title="Fechar detalhes"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Grid de Informações */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-5 border-t border-slate-800/80 relative z-10">
              {/* Plataforma */}
              <div className="bg-[#090d16]/70 border border-slate-800/90 rounded-xl p-4">
                <span className="flex items-center gap-1.5 text-xs font-medium text-slate-400 mb-1">
                  <Monitor className="w-3.5 h-3.5 text-indigo-400" /> Plataforma
                </span>
                <p className="text-sm font-semibold text-slate-100">
                  {jogoDetalhes.plataforma}
                </p>
              </div>

              {/* Preço */}
              <div className="bg-[#090d16]/70 border border-slate-800/90 rounded-xl p-4">
                <span className="text-xs font-medium text-slate-400 block mb-1">
                  Valor de Catálogo
                </span>
                <p className="text-xl font-extrabold font-mono text-emerald-400">
                  R$ {Number(jogoDetalhes.preco).toFixed(2)}
                </p>
              </div>

              {/* Data de Lançamento */}
              <div className="bg-[#090d16]/70 border border-slate-800/90 rounded-xl p-4">
                <span className="flex items-center gap-1.5 text-xs font-medium text-slate-400 mb-1">
                  <Calendar className="w-3.5 h-3.5 text-indigo-400" /> Data de Lançamento
                </span>
                <p className="text-sm font-semibold text-slate-100">
                  {jogoDetalhes.data_lancamento
                    ? new Date(jogoDetalhes.data_lancamento).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric'
                      })
                    : '—'}
                </p>
              </div>
            </div>

            {/* Ações Rápidas no Card */}
            <div className="flex items-center justify-end gap-2.5 mt-5 pt-4 border-t border-slate-800/60 relative z-10">
              <button
                onClick={() => {
                  setJogoEmEdicao(jogoDetalhes);
                  setJogoDetalhes(null);
                }}
                className="px-4 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Edit2 className="w-3.5 h-3.5" /> Editar este jogo
              </button>
              <button
                onClick={() => handleExcluirJogo(jogoDetalhes.id)}
                className="px-4 py-2 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/30 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" /> Excluir
              </button>
            </div>
          </div>
        )}

        {/* Formulário de Cadastro / Edição */}
        <JogoForm
          jogoEmEdicao={jogoEmEdicao}
          onSalvar={handleSalvarJogo}
          onCancelarEdicao={() => setJogoEmEdicao(null)}
        />

        {/* Barra de Filtro Rápido */}
        <div className="mb-4 flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Filter className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filtrar por título, gênero ou plataforma..."
              value={filtroTexto}
              onChange={(e) => setFiltroTexto(e.target.value)}
              className="w-full bg-[#111827] border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Tabela de Jogos */}
        <JogoList
          jogos={jogosFiltrados}
          onEditar={(jogo) => {
            setJogoEmEdicao(jogo);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onExcluir={handleExcluirJogo}
          onVisualizar={handleBuscarPorId}
        />
      </div>
    </div>
  );
}