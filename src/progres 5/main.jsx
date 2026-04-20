import { createRoot } from "react-dom/client";
import "./assets/tailwind.css";
import Sidebar from "./layouts/Sidebar";
import Header from "./layouts/Header";
import PageHeader from "./components/PageHeader";
import Dashboard from "./pages/Dashboard";

createRoot(document.getElementById("root")).render(
  <div id="app-container" className="bg-gray-100 min-h-screen flex">
    <div id="layout-wrapper" className="flex flex-row">
      <Sidebar />
      <div id="main-content" className="flex-1 flex flex-col">
        <Header />
        <div className="flex-1 p-4">
          <Dashboard />
        </div>
      </div>
    </div>
  </div>
);