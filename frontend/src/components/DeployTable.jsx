import { useEffect, useState } from "react";
import axios from "axios";

export default function DeployTable() {
  const [deploys, setDeploys] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buscarDeploys = async () => {
      try {
        const resposta = await axios.get("http://localhost:3000/api/equipes");
        setDeploys(resposta.data);
      } catch (error) {
        console.error("Erro ao carregar tabela de deploys:", error);
      } finally {
        setLoading(false);
      }
    };

    buscarDeploys();
    // Atualiza o estado da tabela a cada 15 segundos para acompanhar builds
    const intervalo = setInterval(buscarDeploys, 15000);
    return () => clearInterval(intervalo);
  }, []);

  if (loading) return <p className="text-zinc-500 p-5">Buscando registros na VPS...</p>;

  return (
    <div className="bg-[#111827] border border-zinc-800 rounded-2xl overflow-hidden">
      <table className="w-full">
        <thead className="bg-[#0f172a]">
          <tr className="text-zinc-400 text-left">
            <th className="p-5">Equipe</th>
            <th className="p-5">Container</th>
            <th className="p-5">Porta</th>
            <th className="p-5">Status</th>
          </tr>
        </thead>

        <tbody>
          {deploys.length === 0 ? (
            <tr>
              <td colSpan="4" className="p-5 text-center text-zinc-500">
                Nenhum container provisionado até o momento.
              </td>
            </tr>
          ) : (
            deploys.map((deploy) => {
              const isOnline = deploy.status === "Online" || deploy.status === "online";
              
              // Gera um nome padronizado de container dinamicamente se não vier do banco
              const nomeContainer = deploy.containerName || 
                `${deploy.nome.toLowerCase().replace(/\s+/g, "_")}_container`;

              return (
                <tr key={deploy._id} className="border-t border-zinc-800">
                  <td className="p-5 text-white font-medium">
                    {deploy.nome}
                  </td>

                  <td className="p-5 text-zinc-400 font-mono text-sm">
                    {nomeContainer}
                  </td>

                  <td className="p-5 text-green-400">
                    {deploy.portaHost || deploy.porta}
                  </td>

                  <td className="p-5">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        isOnline
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {isOnline ? "Online" : "Offline"}
                    </span>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}