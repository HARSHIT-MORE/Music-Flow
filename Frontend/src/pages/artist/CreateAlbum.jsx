import { useEffect, useState } from "react";
import api from "../../services/api";
import ArtistLayout from "../../components/artist/ArtistLayout";

const CreateAlbum = () => {
  const [title, setTitle] = useState("");
  const [songs, setSongs] = useState([]);
  const [selectedSongs, setSelectedSongs] = useState([]);

  useEffect(() => {
    fetchSongs();
  }, []);
const fetchSongs = async () => {
  try {
    const res = await api.get("/music/my-songs");

    console.log(res.data);

    setSongs(res.data.musics || []);
  } catch (err) {
    console.log(err);
  }
};

  const toggleSong = (id) => {
    if (selectedSongs.includes(id)) {
      setSelectedSongs(
        selectedSongs.filter((songId) => songId !== id)
      );
    } else {
      setSelectedSongs([...selectedSongs, id]);
    }
  };

  const createAlbum = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      return alert("Please enter album title");
    }

    if (selectedSongs.length === 0) {
      return alert("Please select at least one song");
    }
    try {
      const res = await api.post("/music/album", {
        title,
        musics: selectedSongs,
      });

      alert(res.data.message);

      setTitle("");
      setSelectedSongs([]);
      fetchSongs();
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  return (
    <ArtistLayout>
      <div className="max-w-3xl">

        <h1 className="mb-8 text-4xl font-bold">
          Create Album
        </h1>

        <form
          onSubmit={createAlbum}
          className="space-y-6"
        >
          <input
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            placeholder="Album Name"
            className="w-full rounded bg-[#242424] p-4"
          />

          <div className="rounded bg-[#181818] p-5">

            <h2 className="mb-5 text-xl">
              Select Songs
            </h2>

            {songs.map((song) => (
              <label
                key={song._id}
                className="mb-3 flex cursor-pointer items-center gap-4"
              >
                <input
                  type="checkbox"
                  checked={selectedSongs.includes(song._id)}
                  onChange={() =>
                    toggleSong(song._id)
                  }
                />

                <span>{song.title}</span>
              </label>
            ))}

          </div>

          <button
            className="rounded bg-green-500 px-8 py-3 font-bold text-black"
          >
            Create Album
          </button>

        </form>
      </div>
    </ArtistLayout>
  );
};

export default CreateAlbum;