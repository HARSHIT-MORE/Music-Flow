import { Search, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between bg-black/80 px-6 py-4 backdrop-blur-md">
      <div className="relative w-full max-w-md">
        <Search
          size={20}
          className="absolute left-4 top-3 text-gray-400"
        />

        <input
          type="text"
          placeholder="What do you want to play?"
          className="w-full rounded-full bg-[#242424] py-3 pl-12 pr-4 text-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div className="ml-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 text-black">
          <User size={20} />
        </div>

        <div className="hidden md:block">
            <p className="text-sm font-semibold">
                {user?.username || "Guest"}
            </p>

            <p className="text-xs text-gray-400">
                {user?.email || ""}
            </p>


          <p className="text-xs text-gray-400">
            {user?.role || "User"}
          </p>
        </div>
      </div>
    </header>
  );
};

export default Navbar;