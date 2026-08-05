import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { usePlayer } from "../context/PlayerContext";

const AlbumDetails = () => {
  const { albumId } = useParams();

  const { playSong } = usePlayer();

  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const response = await api.get(`/music/albums/${albumId}`);

        console.log("Album Details:", response.data);

        setAlbum(response.data.album || response.data);
      } catch (error) {
        console.log("Error fetching album:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbum();
  }, [albumId]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-gray-400">Loading album...</p>
      </div>
    );
  }

  if (!album) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-gray-400">Album not found.</p>
      </div>
    );
  }

  const artistName =
    typeof album.artist === "object"
      ? album.artist?.username
      : album.artist;

  return (
    <div className="pb-32">

      {/* Album Header */}
      <section className="mb-10 flex flex-col gap-8 rounded-2xl bg-gradient-to-b from-purple-900 to-[#121212] p-8 md:flex-row md:items-end">

        <div className="h-56 w-56 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-purple-600 to-green-500 shadow-2xl">
          {album.coverImage ? (
            <img
              src={album.coverImage}
              alt={album.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-7xl">
              💿
            </div>
          )}
        </div>

        <div>
          <p className="mb-3 text-sm uppercase text-gray-300">
            Album
          </p>

          <h1 className="text-4xl font-bold md:text-6xl">
            {album.title}
          </h1>

          <p className="mt-4 text-gray-300">
            {artistName || "Unknown Artist"}
          </p>
        </div>

      </section>

      {/* Songs */}
      <section>

        <h2 className="mb-5 text-2xl font-bold">
          Songs
        </h2>

        {album.musics?.length > 0 ? (

          <div className="space-y-2">

            {album.musics.map((song, index) => (

              <div
                key={song._id}
                onClick={() => playSong(song)}
                className="flex cursor-pointer items-center gap-4 rounded-lg p-4 transition hover:bg-[#181818]"
              >

                <span className="w-6 text-gray-500">
                  {index + 1}
                </span>

                <div className="flex-1">

                  <p className="font-medium">
                    {song.title}
                  </p>

                  <p className="text-sm text-gray-400">
                    {typeof song.artist === "object"
                      ? song.artist.username
                      : song.artist}
                  </p>

                </div>

              </div>

            ))}

          </div>

        ) : (

          <p className="text-gray-400">
            No songs in this album.
          </p>

        )}

      </section>

    </div>
  );
};

export default AlbumDetails;