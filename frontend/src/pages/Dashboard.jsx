import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StatusCard from "../components/StatusCard";
import TeamCard from "../components/TeamCard";
import CreateTeamModal from "../components/CreateTeamModal";

export default function Dashboard() {
  const [equipes, setEquipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const buscarEquipes = async () => {
    try {
      const resposta = await axios.get("http://localhost:3000/api/equipes");
      setEquipes(resposta.data);
    } catch (error) {
      console.error("Erro ao buscar equipes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    buscarEquipes();
    const intervalo = setInterval(buscarEquipes, 10000);
    return () => clearInterval(intervalo);
  }, []);

  const totalEquipes = equipes.length;
  const equipesOnline = equipes.filter((e) => e.status === "Online" || e.status === "online" || e.online === true).length;
  const equipesOffline = totalEquipes - equipesOnline;

  return (
    <div className="flex bg-[#020817] min-h-screen">
      <Sidebar />

      <main className="flex-1 p-8">
        <Header onOpenModal={() => setIsModalOpen(true)} />

        {loading ? (
          <p className="text-white mt-5">Carregando dados do cluster...</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              <StatusCard title="TOTAL DE EQUIPES" value={totalEquipes.toString()} subtitle="No banco relacional" />
              <StatusCard title="ONLINE" value={equipesOnline.toString()} subtitle="Containers saudáveis" />
              <StatusCard title="OFFLINE" value={equipesOffline.toString()} subtitle="Requerem atenção" />
              <StatusCard title="DEPLOYS" value={totalEquipes.toString()} subtitle="Ativos na infraestrutura" />
            </div>

            <div className="mt-10">
              <h2 className="text-2xl font-bold text-white mb-5">Equipes & Containers</h2>
              {equipes.length === 0 ? (
                <p className="text-gray-400">Nenhum container ativo no momento.</p>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
                  {equipes.map((equipe) => (
                    <TeamCard
                      key={equipe._id}
                      id={equipe._id}
                      team={equipe.nome}
                      members={equipe.membros || "Alunos Cadastrados"}
                      port={equipe.portaHost || equipe.porta}
                      domain={equipe.dominio}
                      online={equipe.status === "Online" || equipe.status === "online"}
                    />
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </main>

      {/* Exibe o modal quando o estado for verdadeiro */}
      {isModalOpen && (
        <CreateTeamModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onEquipeCriada={buscarEquipes} 
        />
      )}
    </div>
  );
}