import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

export default function Alerts() {
  const [equipes, setEquipes] = useState([]);

  useEffect(() => {
    const buscarStatus = async () => {
      try {
        const resposta = await axios.get("http://localhost:3000/api/equipes");
        setEquipes(resposta.data);
      } catch (err) {
        console.error(err);
      }
    };
    buscarStatus();
    const interval = setInterval(buscarStatus, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex bg-[#020817] min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <h1 className="text-4xl font-bold text-white">Alertas</h1>
        <p className="text-zinc-500 mt-2">Monitoramento do cluster em tempo real</p>

        <div className="mt-8 grid gap-4">
          {equipes.map((equipe) => {
            const isOnline = equipe.status === "Online" || equipe.status === "online";
            return (
              <div key={equipe._id} className="bg-[#111827] border border-zinc-800 rounded-2xl p-5">
                <div className="flex items-center justify-between">
                  <p className="text-white">
                    Serviço da equipe <strong className="text-green-400">{equipe.nome}</strong> está {isOnline ? "executando normalmente." : "offline ou falhou no Health Check."}
                  </p>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    isOnline ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                  }`}>
                    {isOnline ? "success" : "critical"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}