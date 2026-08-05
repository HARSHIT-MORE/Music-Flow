import { usePlayer } from "../context/PlayerContext";

const MusicCard = ({ song }) => {
  const { playSong } = usePlayer();

const getArtistName = () => {
if (!song?.artist) {
return "Unknown Artist";
}

if (typeof song.artist === "string") {
  return song.artist;
}

if (typeof song.artist === "object") {
  return song.artist.username || "Unknown Artist";
}

return "Unknown Artist";

};

const artistName = getArtistName();

const handlePlay = () => {
playSong(song);
};
  return (
    <div
      className="group cursor-pointer rounded-xl bg-[#181818] p-4 transition-all duration-300 hover:bg-[#242424]"
      onClick={handlePlay}
    >
      {/* Cover */}
      <div className="relative mb-4 aspect-square overflow-hidden rounded-lg bg-gradient-to-br from-green-600 to-purple-700">

        {song.coverImage ? (
          <img
            src={song.coverImage}
            alt={song.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-5xl">
            🎵
          </div>
        )}

        {/* Play Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePlay();
          }}
          className="absolute bottom-3 right-3 flex h-12 w-12 translate-y-2 items-center justify-center rounded-full bg-green-500 text-black opacity-0 shadow-xl transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:scale-105 hover:bg-green-400"
        >
          ▶
        </button>
      </div>

      {/* Song Title */}
      <h3 className="truncate font-semibold text-white">
        {song.title}
      </h3>

      {/* Artist */}
      <p className="mt-1 truncate text-sm text-gray-400">
        {artistName || "Unknown Artist"}
      </p>
    </div>
  );
};

export default MusicCard;