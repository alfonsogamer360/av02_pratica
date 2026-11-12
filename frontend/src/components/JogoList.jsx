import React from 'react';
import { Edit2, Trash2, Eye, Gamepad2, Layers } from 'lucide-react';

export default function JogoList({ jogos, onEditar, onExcluir, onVisualizar }) {
  if (!jogos || jogos.length === 0) {
    return (
      <div className="bg-[#111827] border border-dashed border-slate-700 rounded-2xl p-14 text-center">
        <div className="w-16 h-16 bg-slate-800/80 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-slate-700">
          <Gamepad2 className="w-8 h-8 text-indigo-400" />
        </div>
        <h3 className="text-base font-semibold text-white mb-1">
          Nenhum jogo registado
        </h3>
        <p className="text-sm text-slate-400 max-w-md mx-auto">
          Adicione o primeiro jogo utilizando o formulário acima.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#111827] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
      <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-indigo-400" />
          <h3 className="text-sm font-semibold text-white">Lista de Jogos</h3>
        </div>
        <span className="text-xs font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-3 py-1 rounded-full">
          {jogos.length} {jogos.length === 1 ? 'registo' : 'registos'}
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#090d16]/60 border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider">
              <th className="py-3.5 px-6">ID</th>
              <th className="py-3.5 px-4">Título</th>
              <th className="py-3.5 px-4">Plataforma</th>
              <th className="py-3.5 px-4">Preço</th>
              <th className="py-3.5 px-4">Data de Lançamento</th>
              <th className="py-3.5 px-6 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80 text-sm">
            {jogos.map((jogo) => (
              <tr
                key={jogo.id}
                className="hover:bg-slate-800/40 transition-colors group"
              >
                <td className="py-4 px-6 font-mono text-xs text-slate-500">
                  #{jogo.id}
                </td>
                <td className="py-4 px-4 font-semibold text-white">
                  {jogo.titulo}
                </td>
                <td className="py-4 px-4">
                  <span className="bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 px-2.5 py-1 rounded-md text-xs font-medium">
                    {jogo.plataforma}
                  </span>
                </td>
                <td className="py-4 px-4 font-mono text-emerald-400 font-medium">
                  R$ {Number(jogo.preco).toFixed(2)}
                </td>
                <td className="py-4 px-4 text-slate-400 font-mono text-xs">
                  {jogo.data_lancamento ? new Date(jogo.data_lancamento).toLocaleDateString('pt-BR') : '—'}
                </td>
                <td className="py-4 px-6 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => onVisualizar(jogo.id)}
                      title="Ver Detalhes (GET /:id)"
                      className="p-2 text-sky-400 hover:bg-sky-500/15 rounded-lg transition-colors cursor-pointer"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onEditar(jogo)}
                      title="Editar (PATCH)"
                      className="p-2 text-amber-400 hover:bg-amber-500/15 rounded-lg transition-colors cursor-pointer"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onExcluir(jogo.id)}
                      title="Excluir (DELETE)"
                      className="p-2 text-rose-400 hover:bg-rose-500/15 rounded-lg transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}