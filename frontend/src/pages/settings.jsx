import Sidebar from "../components/Sidebar";

export default function Settings() {
  return (
    <div className="flex bg-[#020817] min-h-screen">
      <Sidebar />

      <main className="flex-1 p-8">
        <h1 className="text-4xl font-bold text-white">
          Configurações
        </h1>

        <p className="text-zinc-500 mt-2">
          Configurações da plataforma
        </p>

        <div className="mt-8 bg-[#111827] border border-zinc-800 rounded-2xl p-6">
          <div className="grid gap-6">

            <div>
              <label className="text-zinc-400 block mb-2">
                IP do Servidor
              </label>

              <input
                type="text"
                value="137.131.172.170"
                readOnly
                className="w-full bg-[#0f172a] border border-zinc-700 rounded-xl p-3 text-white"
              />
            </div>

            <div>
              <label className="text-zinc-400 block mb-2">
                Porta Backend
              </label>

              <input
                type="text"
                value="3000"
                readOnly
                className="w-full bg-[#0f172a] border border-zinc-700 rounded-xl p-3 text-white"
              />
            </div>

            <button className="bg-green-500 text-black font-bold py-3 rounded-xl">
              Salvar Configurações
            </button>

          </div>
        </div>
      </main>
    </div>
  );
}