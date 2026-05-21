import Sidebar from "../components/Sidebar";
import LogCard from "../components/LogCard";

export default function Logs() {
  return (
    <div className="flex bg-[#020817] min-h-screen">
      <Sidebar />

      <main className="flex-1 p-8">
        <h1 className="text-4xl font-bold text-white">
          Logs
        </h1>

        <p className="text-zinc-500 mt-2">
          Monitoramento dos containers
        </p>

        <div className="mt-8 grid gap-5">
          <LogCard
            service="frontend_container"
            status="success"
            message="Container iniciado com sucesso."
          />

          <LogCard
            service="api_container"
            status="success"
            message="Deploy concluído."
          />

          <LogCard
            service="auth_container"
            status="error"
            message="Falha ao iniciar container."
          />
        </div>
      </main>
    </div>
  );
}