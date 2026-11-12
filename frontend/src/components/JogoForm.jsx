import React, { useState, useEffect } from 'react';
import { Save, X, PlusCircle, Gamepad, Monitor, DollarSign, Calendar } from 'lucide-react';

const ESTADO_INICIAL = {
  titulo: '',
  plataforma: '',
  preco: '',
  data_lancamento: ''
};

export default function JogoForm({ jogoEmEdicao, onSalvar, onCancelarEdicao }) {
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
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'preco' && value !== '' ? Number(value) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSalvar(formData);
    if (!jogoEmEdicao) {
      setFormData(ESTADO_INICIAL);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`rounded-2xl p-6 mb-8 border transition-all shadow-xl ${
        jogoEmEdicao
          ? 'bg-amber-950/20 border-amber-500/40'
          : 'bg-[#111827] border-slate-800'
      }`}
    >
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div
            className={`p-2 rounded-lg ${
              jogoEmEdicao ? 'bg-amber-500/20 text-amber-400' : 'bg-indigo-500/20 text-indigo-400'
            }`}
          >
            {jogoEmEdicao ? <Save className="w-5 h-5" /> : <PlusCircle className="w-5 h-5" />}
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">
              {jogoEmEdicao ? `Editar Jogo #${jogoEmEdicao.id}` : 'Cadastrar Novo Jogo'}
            </h2>
            <p className="text-xs text-slate-400">
              {jogoEmEdicao
                ? 'Altere os campos e clique em atualizar'
                : 'Insira os dados correspondentes à tabela do PostgreSQL'}
            </p>
          </div>
        </div>

        {jogoEmEdicao && (
          <button
            type="button"
            onClick={onCancelarEdicao}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" /> Cancelar
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4">
        {/* Título */}
        <div className="lg:col-span-4">
          <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 mb-1.5">
            <Gamepad className="w-3.5 h-3.5 text-indigo-400" /> Título *
          </label>
          <input
            type="text"
            name="titulo"
            required
            value={formData.titulo}
            onChange={handleChange}
            placeholder="Ex: God of War"
            className="w-full bg-[#090d16] border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Plataforma */}
        <div className="lg:col-span-3">
          <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 mb-1.5">
            <Monitor className="w-3.5 h-3.5 text-indigo-400" /> Plataforma *
          </label>
          <input
            type="text"
            name="plataforma"
            required
            value={formData.plataforma}
            onChange={handleChange}
            placeholder="Ex: PS5, PC, Switch"
            className="w-full bg-[#090d16] border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Preço */}
        <div className="lg:col-span-2">
          <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 mb-1.5">
            <DollarSign className="w-3.5 h-3.5 text-indigo-400" /> Preço *
          </label>
          <input
            type="number"
            step="0.01"
            name="preco"
            required
            value={formData.preco}
            onChange={handleChange}
            placeholder="199.90"
            className="w-full bg-[#090d16] border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Data de Lançamento */}
        <div className="lg:col-span-3">
          <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 mb-1.5">
            <Calendar className="w-3.5 h-3.5 text-indigo-400" /> Data de Lançamento *
          </label>
          <input
            type="date"
            name="data_lancamento"
            required
            value={formData.data_lancamento}
            onChange={handleChange}
            className="w-full bg-[#090d16] border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Botão de Submissão */}
        <div className="lg:col-span-12 flex justify-end mt-2">
          <button
            type="submit"
            className={`font-semibold py-2.5 px-6 rounded-xl transition-all flex items-center justify-center gap-2 text-sm shadow-lg cursor-pointer ${
              jogoEmEdicao
                ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/25'
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