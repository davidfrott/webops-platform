import { useState } from "react";
import { api } from "../services/api";

export default function CreateTeamModal({ isOpen, onClose, onEquipeCriada }) {
  const [nome, setNome] = useState("");
  const [integrantes, setIntegrantes] = useState("");
  const [portaHost, setPortaHost] = useState("");
  const [repoGithub, setRepoGithub] = useState("");

  // Se não estiver marcado como aberto, não renderiza nada na tela
  if (!isOpen) return null;

  async function cadastrarEquipe(e) {
    e.preventDefault();

    try {
      // Ajustado de "/equipes" para "/equipos" para sincronizar com sua API
      await api.post("/equipes", {
        nome,
        integrantes,
        portaHost,
        repoGithub,
      });

      alert("Equipe cadastrada e deploy iniciado!");
      
      // Funções de controle passadas pelo Dashboard
      onEquipeCriada(); // Recarrega a lista na tela principal em tempo real
      onClose();        // Fecha o modal automaticamente
    } catch (error) {
      console.log("Erro ao cadastrar equipe:", error);
      alert("Erro ao conectar com a API de Infraestrutura.");
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#111827] border border-zinc-800 rounded-2xl p-6 w-full max-w-md shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
        
        {/* Botão de Fechar no topo superior direito */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white text-xl"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-white mb-2">🚀 Novo Deploy</h2>
        <p className="text-zinc-400 text-sm mb-6">Cadastre a equipe para provisionar o container.</p>

        <form onSubmit={cadastrarEquipe} className="grid gap-4">
          <div>
            <label className="text-zinc-400 text-xs block mb-1">Nome da Equipe</label>
            <input
              type="text"
              required
              placeholder="Ex: Backend Squad"
              className="w-full bg-[#0f172a] border border-zinc-700 rounded-lg p-3 text-white focus:outline-none focus:border-green-500"
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          <div>
            <label className="text-zinc-400 text-xs block mb-1">Integrantes (Separados por vírgula)</label>
            <input
              type="text"
              required
              placeholder="Ex: João, Maria, Pedro"
              className="w-full bg-[#0f172a] border border-zinc-700 rounded-lg p-3 text-white focus:outline-none focus:border-green-500"
              onChange={(e) => setIntegrantes(e.target.value)}
            />
          </div>

          <div>
            <label className="text-zinc-400 text-xs block mb-1">Porta do Host na VPS</label>
            <input
              type="number"
              required
              placeholder="Ex: 3005"
              className="w-full bg-[#0f172a] border border-zinc-700 rounded-lg p-3 text-white focus:outline-none focus:border-green-500"
              onChange={(e) => setPortaHost(e.target.value)}
            />
          </div>

          <div>
            <label className="text-zinc-400 text-xs block mb-1">Link do Repositório GitHub</label>
            <input
              type="text"
              required
              placeholder="https://github.com/..."
              className="w-full bg-[#0f172a] border border-zinc-700 rounded-lg p-3 text-white focus:outline-none focus:border-green-500"
              onChange={(e) => setRepoGithub(e.target.value)}
            />
          </div>

          <div className="flex gap-3 mt-4">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 bg-zinc-800 text-white font-bold py-3 rounded-xl hover:bg-zinc-700 transition"
            >
              Cancelar
            </button>
            <button 
              type="submit"
              className="flex-1 bg-green-500 text-black font-bold py-3 rounded-xl hover:bg-green-400 transition"
            >
              Criar Deploy
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}