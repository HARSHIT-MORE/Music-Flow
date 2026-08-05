import { useAuth } from "../../context/AuthContext";

const ArtistNavbar = () => {
  const { user } = useAuth();

  return (
    <header className="flex items-center justify-between border-b border-gray-800 bg-[#121212] px-8 py-5">

      <div>

        <h2 className="text-3xl font-bold">
          Artist Dashboard
        </h2>

        <p className="text-gray-400">
          Welcome back,
          {" "}
          {user?.username}
        </p>

      </div>

    </header>
  );
};

export default ArtistNavbar;