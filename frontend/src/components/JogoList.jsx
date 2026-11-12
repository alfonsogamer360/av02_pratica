
import React from 'react';
import {
  Edit2, Trash2, Eye, Gamepad2, Layers,
  Monitor, Calendar, DollarSign
} from 'lucide-react';

export default function JogoList({
  jogos,
  onEditar,
  onExcluir,
  onVisualizar
}) {

  const formatarData = (data) => {
    if (!data) return '—';

    // Evita problemas de fuso horário em datas YYYY-MM-DD
    const dataLimpa = String(data).split('T')[0];
    const [ano, mes, dia] = dataLimpa.split('-');

    return `${dia}/${mes}/${ano}`;
  };

  const formatarPreco = (preco) => {
    return Number(preco).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  const BotoesAcao = ({ jogo }) => (
    <div className="flex items-center gap-2">

      <button
        type="button"
        onClick={() => onVisualizar(jogo.id)}
        title="Visualizar"
        aria-label={`Visualizar ${jogo.titulo}`}
        className="flex-1 sm:flex-none min-h-11 px-3 rounded-xl flex items-center justify-center gap-2 text-sky-400 bg-sky-500/10 hover:bg-sky-500/20 transition-colors"
      >
        <Eye className="w-4 h-4" />
        <span className="text-xs sm:hidden">Ver</span>
      </button>

      <button
        type="button"
        onClick={() => onEditar(jogo)}
        title="Editar"
        aria-label={`Editar ${jogo.titulo}`}
        className="flex-1 sm:flex-none min-h-11 px-3 rounded-xl flex items-center justify-center gap-2 text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 transition-colors"
      >
        <Edit2 className="w-4 h-4" />
        <span className="text-xs sm:hidden">Editar</span>
      </button>

      <button
        type="button"
        onClick={() => onExcluir(jogo.id)}
        title="Excluir"
        aria-label={`Excluir ${jogo.titulo}`}
        className="flex-1 sm:flex-none min-h-11 px-3 rounded-xl flex items-center justify-center gap-2 text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 transition-colors"
      >
        <Trash2 className="w-4 h-4" />
        <span className="text-xs sm:hidden">Excluir</span>
      </button>
    </div>
  );

  if (!jogos || jogos.length === 0) {
    return (
      <div className="bg-[#111827] border border-dashed border-slate-700 rounded-2xl p-8 sm:p-14 text-center">
        <div className="w-16 h-16 bg-slate-800/80 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-slate-700">
          <Gamepad2 className="w-8 h-8 text-indigo-400" />
        </div>

        <h3 className="text-base font-semibold text-white mb-1">
          Nenhum jogo registrado
        </h3>

        <p className="text-sm text-slate-400 max-w-md mx-auto">
          Adicione o primeiro jogo utilizando o formulário acima.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#111827] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">

      {/* Cabeçalho */}
      <div className="px-4 sm:px-6 py-4 border-b border-slate-800 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <Layers className="w-4 h-4 text-indigo-400 shrink-0" />

          <h3 className="text-sm font-semibold text-white">
            Lista de Jogos
          </h3>
        </div>

        <span className="shrink-0 text-xs font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-3 py-1.5 rounded-full">
          {jogos.length} {jogos.length === 1 ? 'registro' : 'registros'}
        </span>
      </div>

      {/* MOBILE: Cards */}
      <div className="block md:hidden p-3 space-y-3">

        {jogos.map((jogo) => (
          <article
            key={jogo.id}
            className="bg-[#090d16] border border-slate-800 rounded-xl p-4 space-y-4"
          >
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 shrink-0 rounded-xl bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center">
                <Gamepad2 className="w-5 h-5 text-indigo-400" />
              </div>

              <div className="min-w-0 flex-1">
                <h4 className="font-bold text-white text-sm leading-snug break-words">
                  {jogo.titulo}
                </h4>

                <p className="text-xs text-slate-500 mt-1 break-all">
                  ID: {jogo.id}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">

              <div className="bg-slate-800/40 rounded-xl p-3 min-w-0">
                <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-2">
                  <Monitor className="w-3.5 h-3.5" />
                  Plataforma
                </div>

                <span className="inline-block max-w-full truncate bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 px-2 py-1 rounded-lg text-xs font-medium">
                  {jogo.plataforma}
                </span>
              </div>

              <div className="bg-slate-800/40 rounded-xl p-3 min-w-0">
                <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-2">
                  <DollarSign className="w-3.5 h-3.5" />
                  Preço
                </div>

                <span className="text-sm font-bold text-emerald-400 break-words">
                  {formatarPreco(jogo.preco)}
                </span>
              </div>

              <div className="col-span-2 bg-slate-800/40 rounded-xl p-3">
                <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
                  <Calendar className="w-3.5 h-3.5" />
                  Data de lançamento
                </div>

                <span className="text-sm text-slate-200">
                  {formatarData(jogo.data_lancamento)}
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800">
              <BotoesAcao jogo={jogo} />
            </div>
          </article>
        ))}

      </div>

      {/* DESKTOP: Tabela */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">

          <thead>
            <tr className="bg-[#090d16]/60 border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider">
              <th className="py-4 px-5">ID</th>
              <th className="py-4 px-4">Título</th>
              <th className="py-4 px-4">Plataforma</th>
              <th className="py-4 px-4">Preço</th>
              <th className="py-4 px-4">Lançamento</th>
              <th className="py-4 px-5 text-right">Ações</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-800/80 text-sm">
            {jogos.map((jogo) => (
              <tr
                key={jogo.id}
                className="hover:bg-slate-800/40 transition-colors"
              >
                <td className="py-4 px-5 font-mono text-xs text-slate-500 max-w-32 truncate">
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

                <td className="py-4 px-4 font-mono text-emerald-400 font-medium whitespace-nowrap">
                  {formatarPreco(jogo.preco)}
                </td>

                <td className="py-4 px-4 text-slate-400 font-mono text-xs whitespace-nowrap">
                  {formatarData(jogo.data_lancamento)}
                </td>

                <td className="py-4 px-5">
                  <div className="flex justify-end">
                    <BotoesAcao jogo={jogo} />
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
