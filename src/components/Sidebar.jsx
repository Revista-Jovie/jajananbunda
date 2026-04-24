import { BiFoodMenu } from "react-icons/bi"; 
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
    <div className="w-64 h-screen sticky top-0 bg-white p-6 shadow-md flex flex-col">
      {/* Logo */}
      <div className="flex justify-center items-center mb-4">
        <img
          src="/img/logo jajanan bunda.png"
          alt="Jajanan Bunda Logo"
          className="h-20 w-auto"
        />
      </div>

      {/* Main Menu */}
      <div className="space-y-2">
        <SidebarItem
          icon={<MdOutlineSpaceDashboard />}
          label="Dashboard"
          to="/"
        />
        <SidebarItem
        icon={<BiFoodMenu/>}
        label="Menu"
        to="/menu"
        />
        {/* <SidebarItem icon={<FiUserCheck />} label="Client" to="/client" /> */}
        {/* <SidebarItem icon={<AiOutlineTeam />} label="Crew" to="/crew" /> */}
        <SidebarItem
          icon={<AiOutlineUnorderedList />}
          label="Pesanan"
          to="/orders"
        />
        <SidebarItem
          icon={<MdOutlineFeedback />}
          label="Feedback"
          to="/feedback"
        />
        <SidebarItem icon={<BsQuestionCircle />} label="FaQ" to="/faq" />
        {/* <SidebarItem
          icon={<AiOutlineStar />}
          label="Rekomendasi"
          to="/rekomendasi"
        /> */}
      </div>

      {/* Footer */}
      <div className="border-t border-border mt-auto pt-6 space-y-2">
        {/* <SidebarItem
          icon={<AiOutlineSetting />}
          label="Settings"
          to="/settings"
        /> */}
        <SidebarItem icon={<MdPowerSettingsNew />} label="Logout" to="/login" />
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
        `flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer font-nunitosans hover:bg-orange-100 hover:text-orange-600 transition ${
          isActive ? "bg-orange-600 text-white" : "text-hitam"
        }`
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
}
