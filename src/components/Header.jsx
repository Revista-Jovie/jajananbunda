import { FaBell, FaSearch } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { IoMdArrowDropdown } from "react-icons/io";
import { useNavigate } from "react-router-dom"; // ⬅️ 1. Import useNavigate

export default function Header({ onToggleSidebar }) {
  const navigate = useNavigate(); // ⬅️ 2. Inisialisasi fungsi navigate

  // ⬅️ 3. Buat fungsi untuk pindah halaman
  const handleProfileClick = () => {
    // Kalau mau ada logika hapus token/session saat logout, bisa ditaruh di sini nanti
    navigate("/login"); 
  };

  return (
    <div className="flex justify-between items-center px-6 h-16 bg-white">
      {/* Left: Menu Toggle + Search */}
      <div className="flex items-center gap-4">
        <FiMenu
          className="text-xl text-hitam cursor-pointer"
          onClick={onToggleSidebar} // panggil toggle saat diklik
        />

        {/* <div className="relative w-64">
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 focus:outline-none"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div> */}
      </div>

      {/* Right: Notification + Profile */}
      <div className="flex items-center gap-6">
        {/* <div className="relative cursor-pointer">
          <FaBell className="text-lg text-biru" />
          <span className="absolute -top-2 -right-2 text-xs bg-merah text-white rounded-full px-1">
            1
          </span>
        </div> */}

        {/* ⬅️ 4. Tambahkan onClick ke div pembungkus profil ini */}
        <div 
          className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition-colors"
          onClick={handleProfileClick} 
        >
          <img
            src="/img/profil.jpg"
            alt="avatar"
            className="w-8 h-8 rounded-full"
          />
          <div className="text-sm">
            <p className="font-semibold font-nunitosans leading-none text-abu">
              Admin
            </p>
            <p className="text-hitam text-xs">Admin</p>
          </div>
          <IoMdArrowDropdown />
        </div>
      </div>
    </div>
  );
}