import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function LogsModal({ isOpen, onClose, equipeId, equipeNome }) {
  const [logs, setLogs] = useState("Carregando logs do container...");

  useEffect(() => {
    if (!isOpen || !equipeId) return;

    const buscarLogs = async () => {
      try {
        // Consome a rota exata de logs do Docker criada no back-end
        const resposta = await api.get(`equipes/${equipeId}/logs`);
        setLogs(resposta.data.logs);
      } catch (error) {
        const mensagemDeErro = error.response?.data?.erro || "Não foi possível conectar ao servidor.";
        setLogs(mensagemDeErro);
      }
    };

    buscarLogs();
    // Atualiza os logs automaticamente a cada 5 segundos se o modal estiver aberto
    const intervalo = setInterval(buscarLogs, 5000);
    return () => clearInterval(intervalo);
  }, [isOpen, equipeId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#111827] border border-zinc-800 rounded-2xl p-6 w-full max-w-2xl shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
        
        <button onClick={onClose} className="absolute top-4 right-4 text-zinc-400 hover:text-white text-xl">&times;</button>

        <h2 className="text-2xl font-bold text-white mb-1">Logs do Container</h2>
        <p className="text-zinc-400 text-sm mb-4">Monitoramento em tempo real para: <strong className="text-green-400">{equipeNome}</strong></p>

        {/* Janela estilo terminal linux */}
        <div className="bg-[#020817] border border-zinc-800 rounded-xl p-4 h-80 overflow-y-auto font-mono text-xs text-zinc-300 leading-relaxed whitespace-pre-wrap">
          {logs}
        </div>

        <div className="mt-4 flex justify-end">
          <button 
            onClick={onClose}
            className="bg-zinc-800 text-white font-bold px-6 py-2 rounded-xl hover:bg-zinc-700 transition"
          >
            Fechar Janela
          </button>
        </div>
      </div>
    </div>
  );
}