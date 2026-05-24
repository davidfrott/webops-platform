export default function DeployTable() {
  const deploys = [
    {
      team: "Frontend Squad",
      port: 3001,
      container: "frontend_container",
      status: true,
    },
    {
      team: "API Core",
      port: 3002,
      container: "api_container",
      status: true,
    },
    {
      team: "Auth Service",
      port: 3004,
      container: "auth_container",
      status: false,
    },
  ];

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
          {deploys.map((deploy, index) => (
            <tr
              key={index}
              className="border-t border-zinc-800"
            >
              <td className="p-5 text-white">
                {deploy.team}
              </td>

              <td className="p-5 text-zinc-400">
                {deploy.container}
              </td>

              <td className="p-5 text-green-400">
                {deploy.port}
              </td>

              <td className="p-5">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    deploy.status
                      ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {deploy.status
                    ? "Online"
                    : "Offline"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}