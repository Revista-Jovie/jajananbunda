import {
  MdDashboard,
  MdOutlineListAlt,
  MdOutlineInventory,
  MdFeedback,
  MdSettings,
  MdPowerSettingsNew,
} from "react-icons/md";
import { FaBox, FaQuestion } from "react-icons/fa";

export default function Sidebar() {
  return (
    <div className="w-64 bg-white p-6 shadow-md flex flex-col">
      {/* Logo */}
      <div className="text-3xl font-bold font-nunitosans mb-8">
        <span className=" text-biru ">Amora</span>
        <span className="text-hitam">Bliss</span>
      </div>

      {/* Main Menu */}
      <div className="space-y-2">
        <SidebarItem icon={<MdDashboard />} label="Dashboard" active />
        <SidebarItem icon={<FaBox />} label="Products" />
        <SidebarItem icon={<MdOutlineInventory />} label="Product Stock" />
        <SidebarItem icon={<MdOutlineListAlt />} label="Order Lists" />
        <SidebarItem icon={<MdFeedback />} label="Feedback" />
        <SidebarItem icon={<FaQuestion />} label="FaQ" />
      </div>

      {/* Footer */}
      <div className="border-t border-border mt-auto pt-6 space-y-2">
        <SidebarItem icon={<MdSettings />} label="Settings" />
        <SidebarItem icon={<MdPowerSettingsNew />} label="Logout" />
      </div>
    </div>
  );
}

// Sub-component for reusability
function SidebarItem({ icon, label, active }) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-100 hover:text-blue-600 ${
        active ? "bg-biru text-white font-nunitosans" : "text-hitam font-nunitosans"
      }`}
    >
      <span className="text-xl">{icon}</span>
      <span>{label}</span>
    </div>
  );
}
