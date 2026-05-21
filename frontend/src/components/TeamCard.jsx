export default function TeamCard({
  team,
  members,
  port,
  domain,
  online,
}) {
  return (
    <div className="bg-[#111827] border border-zinc-800 rounded-2xl p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">
          {team}
        </h2>

        <div
          className={`px-3 py-1 rounded-full text-sm ${
            online
              ? "bg-green-500/20 text-green-400"
              : "bg-red-500/20 text-red-400"
          }`}
        >
          {online ? "Online" : "Offline"}
        </div>
      </div>

      <p className="text-zinc-500 mt-2">
        {members}
      </p>

      <div className="mt-6 space-y-2">
        <p className="text-zinc-400">
          Porta:
          <span className="text-green-400 ml-2">
            {port}
          </span>
        </p>

        <p className="text-zinc-400 truncate">
          {domain}
        </p>
      </div>

      <div className="flex gap-3 mt-6">
        <button className="bg-yellow-500/20 text-yellow-400 px-4 py-2 rounded-lg">
          Logs
        </button>

        <button className="bg-blue-500/20 text-blue-400 px-4 py-2 rounded-lg">
          Visualizar
        </button>
      </div>
    </div>
  );
}