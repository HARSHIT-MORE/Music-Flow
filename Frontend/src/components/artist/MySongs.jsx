import { useEffect, useState } from "react";
import api from "../../services/api";
import ArtistLayout from "../../components/artist/ArtistLayout";

const MySongs = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    try {
      const res = await api.get("/music/my-songs");
      setSongs(res.data.musics);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ArtistLayout>
      <div className="p-8 text-white">
        <h1 className="mb-8 text-3xl font-bold">My Songs</h1>

        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Genre</th>
              <th className="p-3 text-left">Duration</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {songs.map((song) => (
              <tr
                key={song._id}
                className="border-b border-gray-800 hover:bg-[#1b1b1b]"
              >
                <td className="p-3">{song.title}</td>

                <td className="p-3">{song.genre}</td>

                <td className="p-3">{song.duration}s</td>

                <td className="p-3">
                  <button className="mr-3 rounded bg-blue-600 px-3 py-1">
                    Edit
                  </button>

                  <button className="rounded bg-red-600 px-3 py-1">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {songs.length === 0 && (
          <p className="mt-8 text-gray-400">
            No songs uploaded yet.
          </p>
        )}
      </div>
    </ArtistLayout>
  );
};

export default MySongs;