import {
  Home,
  Search,
  Library,
  Plus,
  Music,
  LogOut,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-64 border-r border-[#222] bg-black p-6 md:block">
      <h1 className="mb-10 text-2xl font-bold text-green-500">
        🎵 MusicFlow
      </h1>

      <nav className="space-y-2">
        <NavLink
          to="/"
          className="flex items-center gap-4 rounded-lg px-4 py-3 text-gray-300 hover:bg-[#1a1a1a] hover:text-white"
        >
          <Home size={20} />
          Home
        </NavLink>

        <NavLink
          to="/browse"
          className="flex items-center gap-4 rounded-lg px-4 py-3 text-gray-300 hover:bg-[#1a1a1a] hover:text-white"
        >
          <Search size={20} />
          Browse
        </NavLink>

        <NavLink
          to="/albums"
          className="flex items-center gap-4 rounded-lg px-4 py-3 text-gray-300 hover:bg-[#1a1a1a] hover:text-white"
        >
          <Library size={20} />
          Albums
        </NavLink>
      </nav>

      {user?.role === "artist" && (
        <div className="mt-10">
          <p className="mb-3 text-xs uppercase text-gray-500">
            Artist Studio
          </p>

          <NavLink
            to="/artist"
            className="flex items-center gap-4 rounded-lg px-4 py-3 text-gray-300 hover:bg-[#1a1a1a] hover:text-white"
          >
            <Music size={20} />
            Dashboard
          </NavLink>

          <NavLink
            to="/artist/upload"
            className="flex items-center gap-4 rounded-lg px-4 py-3 text-gray-300 hover:bg-[#1a1a1a] hover:text-white"
          >
            <Plus size={20} />
            Upload Music
          </NavLink>
        </div>
      )}

      <button
        onClick={handleLogout}
        className="absolute bottom-8 flex items-center gap-4 px-4 py-3 text-gray-400 hover:text-red-400"
      >
        <LogOut size={20} />
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;