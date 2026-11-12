
import React, { useState, useEffect } from 'react';
import {
  Save, X, PlusCircle, Gamepad, Monitor,
  DollarSign, Calendar
} from 'lucide-react';

const ESTADO_INICIAL = {
  titulo: '',
  plataforma: '',
  preco: '',
  data_lancamento: ''
};

export default function JogoForm({
  jogoEmEdicao,
  onSalvar,
  onCancelarEdicao
}) {
  const [formData, setFormData] = useState(ESTADO_INICIAL);

  useEffect(() => {
    if (jogoEmEdicao) {
      setFormData({
        titulo: jogoEmEdicao.titulo || '',
        plataforma: jogoEmEdicao.plataforma || '',
        preco: jogoEmEdicao.preco || '',
        data_lancamento: jogoEmEdicao.data_lancamento
          ? jogoEmEdicao.data_lancamento.split('T')[0]
          : ''
      });
    } else {
      setFormData(ESTADO_INICIAL);
    }
  }, [jogoEmEdicao]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: name === 'preco' && value !== ''
        ? Number(value)
        : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSalvar(formData);

    if (!jogoEmEdicao) {
      setFormData(ESTADO_INICIAL);
    }
  };

  const inputClass =
    "w-full min-w-0 bg-[#090d16] border border-slate-700 rounded-xl px-4 py-3 text-base sm:text-sm text-white placeholder-slate-500 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all";

  const labelClass =
    "flex items-center gap-2 text-xs font-semibold text-slate-300 mb-2";

  return (
    <form
      onSubmit={handleSubmit}
      className={`rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 border shadow-xl transition-all ${
        jogoEmEdicao
          ? 'bg-amber-950/20 border-amber-500/40'
          : 'bg-[#111827] border-slate-800'
      }`}
    >
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">

        <div className="flex items-center gap-3 min-w-0">
          <div
            className={`p-3 rounded-xl shrink-0 ${
              jogoEmEdicao
                ? 'bg-amber-500/20 text-amber-400'
                : 'bg-indigo-500/20 text-indigo-400'
            }`}
          >
            {jogoEmEdicao
              ? <Save className="w-5 h-5" />
              : <PlusCircle className="w-5 h-5" />
            }
          </div>

          <div className="min-w-0">
            <h2 className="text-base sm:text-lg font-bold text-white">
              {jogoEmEdicao
                ? 'Editar Jogo'
                : 'Cadastrar Novo Jogo'
              }
            </h2>

            <p className="text-xs text-slate-400 mt-1">
              {jogoEmEdicao
                ? `Editando registro #${jogoEmEdicao.id}`
                : 'Preencha os dados do jogo abaixo'
              }
            </p>
          </div>
        </div>

        {jogoEmEdicao && (
          <button
            type="button"
            onClick={onCancelarEdicao}
            className="w-full sm:w-auto justify-center px-4 py-3 sm:py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium flex items-center gap-2 transition-colors"
          >
            <X className="w-4 h-4" />
            Cancelar edição
          </button>
        )}
      </div>

      {/* Campos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">

        {/* Título */}
        <div className="min-w-0 sm:col-span-2">
          <label className={labelClass}>
            <Gamepad className="w-4 h-4 text-indigo-400" />
            Título *
          </label>

          <input
            type="text"
            name="titulo"
            required
            maxLength={150}
            value={formData.titulo}
            onChange={handleChange}
            placeholder="Ex: God of War Ragnarok"
            className={inputClass}
          />
        </div>

        {/* Plataforma */}
        <div className="min-w-0">
          <label className={labelClass}>
            <Monitor className="w-4 h-4 text-indigo-400" />
            Plataforma *
          </label>

          <input
            type="text"
            name="plataforma"
            required
            maxLength={50}
            value={formData.plataforma}
            onChange={handleChange}
            placeholder="Ex: PS5, PC, Switch"
            className={inputClass}
          />
        </div>

        {/* Preço */}
        <div className="min-w-0">
          <label className={labelClass}>
            <DollarSign className="w-4 h-4 text-indigo-400" />
            Preço *
          </label>

          <input
            type="number"
            step="0.01"
            min="0"
            name="preco"
            required
            value={formData.preco}
            onChange={handleChange}
            placeholder="199.90"
            className={inputClass}
          />
        </div>

        {/* Data */}
        <div className="min-w-0 sm:col-span-2">
          <label className={labelClass}>
            <Calendar className="w-4 h-4 text-indigo-400" />
            Data de lançamento *
          </label>

          <input
            type="date"
            name="data_lancamento"
            required
            value={formData.data_lancamento}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        {/* Botão */}
        <div className="sm:col-span-2 mt-2">
          <button
            type="submit"
            className={`w-full sm:w-auto sm:min-w-48 py-3.5 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${
              jogoEmEdicao
                ? 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white'
            }`}
          >
            <Save className="w-4 h-4" />
            {jogoEmEdicao ? 'Atualizar Jogo' : 'Salvar Jogo'}
          </button>
        </div>
      </div>
    </form>
  );
}
