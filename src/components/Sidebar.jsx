import { Link, useLocation } from "react-router-dom";

import {
  LayoutDashboard,
  Users,
  Rocket,
  Bell,
  FileText,
  Settings,
} from "lucide-react";

export default function Sidebar() {
  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/",
    },
    {
      name: "Equipes",
      icon: Users,
      path: "/teams",
    },
    {
      name: "Deploys",
      icon: Rocket,
      path: "/deploys",
    },
    {
      name: "Alertas",
      icon: Bell,
      path: "/alerts",
    },
    {
      name: "Logs",
      icon: FileText,
      path: "/logs",
    },
    {
      name: "Configurações",
      icon: Settings,
      path: "/settings",
    },
  ];

  return (
    <aside className="w-64 bg-[#081120] border-r border-zinc-800 min-h-screen p-5">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-green-400">
          WebOps
        </h1>

        <p className="text-zinc-500 text-sm">
          Deploy Hub
        </p>
      </div>

      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          const isActive =
            location.pathname === item.path;

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                isActive
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
              }`}
            >
              <Icon size={18} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-5 left-5 text-xs text-zinc-600">
        Cluster healthy • 6 nodes
      </div>
    </aside>
  );
}