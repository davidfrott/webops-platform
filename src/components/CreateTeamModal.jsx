import { useState } from "react";

import { api } from "../services/api";

export default function CreateTeamModal() {
  const [nome, setNome] = useState("");
  const [integrantes, setIntegrantes] =
    useState("");

  const [portaHost, setPortaHost] =
    useState("");

  const [repoGithub, setRepoGithub] =
    useState("");

  async function cadastrarEquipe(e) {
    e.preventDefault();

    try {
      await api.post("/equipes", {
        nome,
        integrantes,
        portaHost,
        repoGithub,
      });

      alert("Equipe cadastrada!");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form
      onSubmit={cadastrarEquipe}
      className="bg-[#111827] border border-zinc-800 rounded-2xl p-6 mt-8 grid gap-4"
    >
      <input
        type="text"
        placeholder="Nome da equipe"
        className="bg-[#0f172a] border border-zinc-700 rounded-lg p-3 text-white"
        onChange={(e) => setNome(e.target.value)}
      />

      <input
        type="text"
        placeholder="Integrantes"
        className="bg-[#0f172a] border border-zinc-700 rounded-lg p-3 text-white"
        onChange={(e) =>
          setIntegrantes(e.target.value)
        }
      />

      <input
        type="number"
        placeholder="Porta Host"
        className="bg-[#0f172a] border border-zinc-700 rounded-lg p-3 text-white"
        onChange={(e) =>
          setPortaHost(e.target.value)
        }
      />

      <input
        type="text"
        placeholder="URL do GitHub"
        className="bg-[#0f172a] border border-zinc-700 rounded-lg p-3 text-white"
        onChange={(e) =>
          setRepoGithub(e.target.value)
        }
      />

      <button className="bg-green-500 text-black font-bold py-3 rounded-xl">
        Criar Deploy
      </button>
    </form>
  );
}