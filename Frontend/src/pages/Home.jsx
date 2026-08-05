import { useEffect, useState } from "react";
import api from "../services/api";

import MusicCard from "../components/MusicCard";
import AlbumCard from "../components/AlbumCard";

const Home = () => {
  const [songs, setSongs] = useState([]);
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get Music
        const songsResponse = await api.get("/music");

        console.log(
          "Music API Response:",
          songsResponse.data
        );

        // Backend returns { musics: [...] }
        setSongs(songsResponse.data.musics || []);

        // Get Albums
        const albumsResponse = await api.get(
          "/music/albums"
        );

        console.log(
          "Album API Response:",
          albumsResponse.data
        );

        // Adjust based on your actual album response
        setAlbums(
          albumsResponse.data.albums ||
          albumsResponse.data ||
          []
        );

      } catch (error) {
        console.log(
          "Error fetching data:",
          error
        );
      }
    };
    fetchData();
  }, []);

  return (
    <div className="pb-32">

      {/* Hero */}
      <section className="mb-10 rounded-2xl bg-gradient-to-r from-green-900 via-purple-900 to-black p-8 md:p-12">

        <p className="mb-3 text-sm text-green-400">
          WELCOME TO MUSICFLOW
        </p>

        <h1 className="text-4xl font-bold md:text-6xl">
          Your music.
          <br />
          Your world.
        </h1>

        <p className="mt-5 max-w-xl text-gray-300">
          Discover new music, listen to your favorite
          artists, and explore amazing albums.
        </p>

      </section>


      {/* Music Section */}
      <section className="mb-10">

        <h2 className="mb-5 text-2xl font-bold">
          Recently Added
        </h2>

        {songs.length === 0 ? (

          <div className="rounded-xl bg-[#181818] p-10 text-center text-gray-400">
            No music available yet.
          </div>

        ) : (

          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">

            {songs.map((song) => (
              <MusicCard
                key={song._id}
                song={song}
              />
            ))}

          </div>

        )}

      </section>


      {/* Albums Section */}
      <section>

        <h2 className="mb-5 text-2xl font-bold">
          Popular Albums
        </h2>

        {albums.length === 0 ? (

          <div className="rounded-xl bg-[#181818] p-10 text-center text-gray-400">
            No albums available yet.
          </div>

        ) : (

          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">

            {albums.map((album) => (
              <AlbumCard
                key={album._id}
                album={album}
              />
            ))}

          </div>

        )}

      </section>

    </div>
  );
};

export default Home;