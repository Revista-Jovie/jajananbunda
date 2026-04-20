import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function MainLayout() {
  const [showSidebar, setShowSidebar] = useState(true); // ⬅️ toggle state

  return (
    <div id="app-container" className="bg-gray-100 min-h-screen">
      <div id="layout-wrapper" className="flex flex-row">
        {showSidebar && <Sidebar />} {/* tampilkan hanya jika true */}

        <div id="main-content" className="flex-1 flex flex-col">
          {/* Kirim fungsi toggle ke Header */}
          <Header onToggleSidebar={() => setShowSidebar((prev) => !prev)} />
          <div className="flex-1 p-4">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
