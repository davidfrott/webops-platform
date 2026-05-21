    import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StatusCard from "../components/StatusCard";
import TeamCard from "../components/TeamCard";

export default function Dashboard() {
  return (
    <div className="flex bg-[#020817] min-h-screen">
      <Sidebar />

      <main className="flex-1 p-8">
        <Header />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatusCard
            title="TOTAL DE EQUIPES"
            value="6"
            subtitle="1 em build"
          />

          <StatusCard
            title="ONLINE"
            value="4"
            subtitle="Containers saudáveis"
          />

          <StatusCard
            title="OFFLINE"
            value="1"
            subtitle="Requer atenção"
          />

          <StatusCard
            title="DEPLOYS"
            value="56"
            subtitle="+18% esta semana"
          />
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-5">
            Equipes & Containers
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
            <TeamCard
              team="Frontend Squad"
              members="Ana, Bruno, Carla"
              port="3001"
              domain="app-3001.oraclecloud.com"
              online={true}
            />

            <TeamCard
              team="API Core"
              members="Diego, Elisa"
              port="3002"
              domain="app-3002.oraclecloud.com"
              online={true}
            />

            <TeamCard
              team="Auth Service"
              members="Iris, João"
              port="3004"
              domain="app-3004.oraclecloud.com"
              online={false}
            />
          </div>
        </div>
      </main>
    </div>
  );
}