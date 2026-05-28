import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Teams from "./pages/teams";
import Deploys from "./pages/deploys";
import Logs from "./pages/logs";
import Alerts from "./pages/alerts";
import Settings from "./pages/settings";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/deploys" element={<Deploys />} />
        <Route path="/logs" element={<Logs />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}