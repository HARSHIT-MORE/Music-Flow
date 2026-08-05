import { useEffect, useState } from "react";
import api from "../services/api";
import MusicCard from "../components/MusicCard";

const Browse = () => {
  const [songs, setSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const res = await api.get("/music");

        console.log(res.data.musics);

        const music = res.data.musics || [];

        setSongs(music);
        setFilteredSongs(music);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSongs();
  }, []);

  useEffect(() => {
    const filtered = songs.filter((song) => {
      const title = song?.title || "";

      let artistName = "";

      if (song?.artist?.username) {
        artistName = song.artist.username;
      }

      return (
        title.toLowerCase().includes(search.toLowerCase()) ||
        artistName.toLowerCase().includes(search.toLowerCase())
      );
    });

    setFilteredSongs(filtered);
  }, [songs, search]);

  return (
    <div className="pb-10">
      <h1 className="mb-6 text-4xl font-bold">Browse</h1>

      <input
        type="text"
        placeholder="Search songs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-8 w-full rounded-lg bg-[#181818] p-3 outline-none"
      />

      <div className="grid grid-cols-2 gap-5 md:grid-cols-4 lg:grid-cols-5">
        {filteredSongs.map((song) => (
          <MusicCard key={song._id} song={song} />
        ))}
      </div>
    </div>
  );
};

export default Browse;