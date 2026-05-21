import Sidebar from "../components/Sidebar";

export default function Teams() {
  return (
    <div className="flex bg-[#020817] min-h-screen">
      <Sidebar />

      <main className="flex-1 p-8">
        <h1 className="text-4xl font-bold text-white">
          Equipes
        </h1>

        <p className="text-zinc-500 mt-2">
          Gerenciamento das equipes e deploys
        </p>

        <div className="mt-8 bg-[#111827] border border-zinc-800 rounded-2xl p-6">
          <table className="w-full text-left">
            <thead>
              <tr className="text-zinc-500 border-b border-zinc-800">
                <th className="pb-4">Equipe</th>
                <th className="pb-4">Porta</th>
                <th className="pb-4">Status</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-b border-zinc-800">
                <td className="py-4 text-white">
                  Frontend Squad
                </td>

                <td className="text-green-400">
                  3001
                </td>

                <td>
                  <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full">
                    Online
                  </span>
                </td>
              </tr>

              <tr>
                <td className="py-4 text-white">
                  Auth Service
                </td>

                <td className="text-green-400">
                  3004
                </td>

                <td>
                  <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full">
                    Offline
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}