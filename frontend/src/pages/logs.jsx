import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import LogCard from "../components/LogCard";

export default function Logs() {
  const [equipes, setEquipes] = useState([]);

  useEffect(() => {
    const carregarLogs = async () => {
      try {
        const resposta = await axios.get("http://localhost:3000/api/equipes");
        setEquipes(resposta.data);
      } catch (err) {
        console.error(err);
      }
    };
    carregarLogs();
  }, []);

  return (
    <div className="flex bg-[#020817] min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <h1 className="text-4xl font-bold text-white">Logs</h1>
        <p className="text-zinc-500 mt-2">Monitoramento dos containers ativos</p>

        <div className="mt-8 grid gap-5">
          {equipes.map((equipe) => (
            <LogCard
              key={equipe._id}
              service={`${equipe.nome.toLowerCase().replace(/\s+/g, '_')}_container`}
              status={equipe.status === "Online" || equipe.status === "online" ? "success" : "error"}
              message={equipe.status === "Online" || equipe.status === "online" ? "Container escutando requisições com sucesso." : "Instabilidade detectada pelo gateway ou serviço parado."}
            />
          ))}
        </div>
      </main>
    </div>
  );
}