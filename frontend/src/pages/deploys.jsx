import Sidebar from "../components/Sidebar";
import DeployTable from "../components/DeployTable";

export default function Deploys() {
  return (
    <div className="flex bg-[#020817] min-h-screen">
      <Sidebar />

      <main className="flex-1 p-8">
        <h1 className="text-4xl font-bold text-white">
          Deploys
        </h1>

        <p className="text-zinc-500 mt-2">
          Containers e builds ativos
        </p>

        <div className="mt-8">
          <DeployTable />
        </div>
      </main>
    </div>
  );
}