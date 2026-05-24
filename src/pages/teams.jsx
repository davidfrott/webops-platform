import { useEffect, useState } from "react";
import CreateTeamModal from "../components/CreateTeamModal";
import Sidebar from "../components/Sidebar";
import { api } from "../services/api";
import { socket } from "../services/socket";
<CreateTeamModal />
export default function Teams() {
  const [equipes, setEquipes] = useState([]);

  async function carregarEquipes() {
    try {
      const response = await api.get("/equipes");
      setEquipes(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function deletarEquipe(id) {
    try {
      await api.delete(`/equipes/${id}`);

      carregarEquipes();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    carregarEquipes();

    socket.emit("pedir_atualizacao");

    socket.on(
      "status_atualizado",
      (equipesAtualizadas) => {
        setEquipes(equipesAtualizadas);
      }
    );

    return () => {
      socket.off("status_atualizado");
    };
  }, []);

  return (
    <div className="flex bg-[#020817] min-h-screen">
      <Sidebar />

      <main className="flex-1 p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white">
              Equipes
            </h1>

            <p className="text-zinc-500 mt-2">
              Gerenciamento das equipes
            </p>
          </div>
        </div>

        <div className="mt-8 bg-[#111827] border border-zinc-800 rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-[#0f172a]">
              <tr className="text-zinc-400 text-left">
                <th className="p-5">Equipe</th>
                <th className="p-5">Porta</th>
                <th className="p-5">Status</th>
                <th className="p-5">Domínio</th>
                <th className="p-5">Ações</th>
              </tr>
            </thead>

            <tbody>
              {equipes.map((equipe) => (
                <tr
                  key={equipe._id}
                  className="border-t border-zinc-800"
                >
                  <td className="p-5 text-white">
                    {equipe.nome}
                  </td>

                  <td className="p-5 text-green-400">
                    {equipe.portaHost}
                  </td>

                  <td className="p-5">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        equipe.status === "Online"
                          ? "bg-green-500/20 text-green-400"
                          : equipe.status ===
                            "Building..."
                          ? "bg-blue-500/20 text-blue-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {equipe.status}
                    </span>
                  </td>

                  <td className="p-5 text-blue-400">
                    {equipe.dominio}
                  </td>

                  <td className="p-5">
                    <button
                      onClick={() =>
                        deletarEquipe(equipe._id)
                      }
                      className="bg-red-500/20 text-red-400 px-4 py-2 rounded-lg"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}