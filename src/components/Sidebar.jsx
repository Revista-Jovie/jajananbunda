import { FiUserCheck } from "react-icons/fi";
import { BsQuestionCircle } from "react-icons/bs";
import {
  AiOutlineStar,
  AiOutlineSetting,
  AiOutlineUnorderedList,
  AiOutlineTeam,
} from "react-icons/ai";
import {
  MdOutlineSpaceDashboard,
  MdOutlineFeedback,
  MdPowerSettingsNew,
} from "react-icons/md";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 min-h-screen bg-white p-6 shadow-md flex flex-col">
      {/* Logo */}
      <div className="flex justify-center items-center mb-4">
        <img
          src="/img/logo lavanya.png"
          alt="Lavanya Logo"
          className="h-35 w-auto"
        />
      </div>

      {/* Main Menu */}
      <div className="space-y-2">
        <SidebarItem
          icon={<MdOutlineSpaceDashboard />}
          label="Dashboard"
          to="/"
        />
        <SidebarItem icon={<FiUserCheck />} label="Client" to="/client" />
        <SidebarItem icon={<AiOutlineTeam />} label="Crew" to="/crew" />
        <SidebarItem
          icon={<AiOutlineUnorderedList />}
          label="Order"
          to="/orders"
        />
        <SidebarItem
          icon={<MdOutlineFeedback />}
          label="Feedback"
          to="/feedback"
        />
        <SidebarItem icon={<BsQuestionCircle />} label="FaQ" to="/faq" />
        <SidebarItem
          icon={<AiOutlineStar />}
          label="Rekomendasi"
          to="/rekomendasi"
        />
      </div>

      {/* Footer */}
      <div className="border-t border-border mt-auto pt-6 space-y-2">
        <SidebarItem
          icon={<AiOutlineSetting />}
          label="Settings"
          to="/settings"
        />
        <SidebarItem
          icon={<MdPowerSettingsNew />}
          label="Logout"
          to="/login"
        />

        {/* Guest Links (open in same tab) */}
        <SidebarItem
          icon={<span className="text-xl">🌐</span>}
          label="Guest Juni"
          to="https://wedding-app-gray-six.vercel.app"
          external
        />
        <SidebarItem
          icon={<span className="text-xl">🌐</span>}
          label="Guest Liza"
          to="https://wedding-app-kel4.vercel.app"
          external
        />
      </div>
    </div>
  );
}

function SidebarItem({ icon, label, to, external = false }) {
  const baseClass =
    "flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer font-nunitosans hover:bg-blue-100 hover:text-blue-600 transition text-hitam";

  if (external) {
    // Tidak menggunakan target="_blank", jadi akan tetap di tab yang sama
    return (
      <a href={to} className={baseClass}>
        {icon}
        <span>{label}</span>
      </a>
    );
  }

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer font-nunitosans hover:bg-blue-100 hover:text-blue-600 transition ${
          isActive ?  "bg-biru text-white" : "text-hitam"
        }`
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
}
