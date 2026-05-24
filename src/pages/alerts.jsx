import Sidebar from "../components/Sidebar";

export default function Alerts() {
  const alerts = [
    {
      id: 1,
      message: "Auth Service está offline",
      level: "critical",
    },
    {
      id: 2,
      message: "Deploy do API Core em andamento",
      level: "warning",
    },
    {
      id: 3,
      message: "Frontend Squad saudável",
      level: "success",
    },
  ];

  return (
    <div className="flex bg-[#020817] min-h-screen">
      <Sidebar />

      <main className="flex-1 p-8">
        <h1 className="text-4xl font-bold text-white">
          Alertas
        </h1>

        <p className="text-zinc-500 mt-2">
          Monitoramento do cluster
        </p>

        <div className="mt-8 grid gap-4">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="bg-[#111827] border border-zinc-800 rounded-2xl p-5"
            >
              <div className="flex items-center justify-between">
                <p className="text-white">
                  {alert.message}
                </p>

                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    alert.level === "critical"
                      ? "bg-red-500/20 text-red-400"
                      : alert.level === "warning"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-green-500/20 text-green-400"
                  }`}
                >
                  {alert.level}
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}