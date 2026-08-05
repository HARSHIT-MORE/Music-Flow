import { useEffect, useState } from "react";
import api from "../../services/api";

import ArtistLayout from "../../components/artist/ArtistLayout";

const MySongs = () => {
  const [songs, setSongs] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    try {
      const res = await api.get("/music/my-songs");
      setSongs(res.data.musics || []);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteSong = async (id) => {
    if (!window.confirm("Delete this song?")) return;

    try {
      await api.delete(`/music/${id}`);

      setSongs((prev) =>
        prev.filter((song) => song._id !== id)
      );
    } catch (err) {
      console.log(err);
    }
  };

 const filteredSongs = (songs || []).filter((song) =>
  song.title
    ?.toLowerCase()
    .includes(search.toLowerCase())
);

  return (
     <ArtistLayout>
    <div className="min-h-screen bg-[#121212] text-white p-10">

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold">
          My Songs
        </h1>

        <input
          placeholder="Search..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="bg-[#242424] rounded-lg p-3"
        />

      </div>

      <table className="w-full">

        <thead>

          <tr className="border-b border-gray-700">

            <th className="text-left py-3">
              Title
            </th>

            <th className="text-left">
              Album
            </th>

            <th className="text-left">
              Genre
            </th>

            <th className="text-left">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {filteredSongs.map((song) => (

            <tr
              key={song._id}
              className="border-b border-gray-800"
            >

              <td className="py-4">
                {song.title}
              </td>

              <td>
                {song.album?.title ||
                  "No Album"}
              </td>

              <td>
                {song.genre}
              </td>

              <td>

                <button
                  className="mr-3 rounded bg-red-500 px-3 py-1"
                  onClick={() =>
                    deleteSong(song._id)
                  }
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
    </ArtistLayout>
  );
};

export default MySongs;