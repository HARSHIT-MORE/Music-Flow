import {
  Home,
  Upload,
  Music,
  Disc3,
  FolderPlus,
  LogOut,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";
import api from "../../services/api";

const ArtistSidebar = () => {
  const navigate = useNavigate();

  const menu = [
     {
    name: "Home",
    icon: <Home size={20} />,
    path: "/",
  },
    {
      name: "Dashboard",
      icon: <Home size={20} />,
      path: "/artist",
    },
    {
      name: "Upload Music",
      icon: <Upload size={20} />,
      path: "/artist/upload",
    },
    {
      name: "My Songs",
      icon: <Music size={20} />,
      path: "/artist/songs",
    },
    {
      name: "Create Album",
      icon: <FolderPlus size={20} />,
      path: "/artist/create-album",
    },
    {
      name: "My Albums",
      icon: <Disc3 size={20} />,
      path: "/artist/albums",
    },
  ];

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (err) {
      console.log(err);
    }

    navigate("/login");
  };

  return (
    <aside className="fixed left-0 top-0 flex h-screen w-64 flex-col border-r border-gray-800 bg-[#121212]">
      {/* Logo */}
      <div className="border-b border-gray-800 p-6">
        <h1 className="text-3xl font-bold text-green-500">
          MusicFlow
        </h1>

        <p className="mt-1 text-sm text-gray-400">
          Artist Dashboard
        </p>
      </div>

      {/* Menu */}
      <nav className="mt-6 flex-1 px-3">
        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/artist"}
            className={({ isActive }) =>
              `mb-2 flex items-center gap-3 rounded-lg px-5 py-4 transition-all ${
                isActive
                  ? "bg-green-500 text-black"
                  : "text-gray-300 hover:bg-[#242424]"
              }`
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="border-t border-gray-800 p-3">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-5 py-4 text-gray-300 transition hover:bg-red-600 hover:text-white"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default ArtistSidebar;