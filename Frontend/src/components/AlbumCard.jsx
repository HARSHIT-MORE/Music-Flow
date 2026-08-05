import { useNavigate } from "react-router-dom";

const AlbumCard = ({ album }) => {
  const navigate = useNavigate();

  const artistName =
    typeof album.artist === "object"
      ? album.artist?.username
      : album.artist;

  return (
    <div
      onClick={() => navigate(`/album/${album._id}`)}
      className="cursor-pointer rounded-xl bg-[#181818] p-4 transition hover:bg-[#242424]"
    >
      <div className="mb-4 aspect-square overflow-hidden rounded-lg bg-gradient-to-br from-pink-600 to-purple-700">
        {album.coverImage ? (
          <img
            src={album.coverImage}
            alt={album.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-5xl">
            💿
          </div>
        )}
      </div>

      <h3 className="truncate font-semibold">
        {album.title}
      </h3>

      <p className="mt-1 truncate text-sm text-gray-400">
        {artistName || "Unknown Artist"}
      </p>
    </div>
  );
};

export default AlbumCard;