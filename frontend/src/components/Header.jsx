export default function Header() {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-4xl font-bold text-white">
          Dashboard
        </h1>

        <p className="text-zinc-500 mt-1">
          Monitoramento de deploys e containers
        </p>
      </div>

      <button className="bg-green-500 hover:bg-green-400 transition px-5 py-3 rounded-xl text-black font-semibold">
        + Nova Equipe
      </button>
    </div>
  );
}