import { useEffect, useState } from "react";
import api from "../services/api";
import AlbumCard from "../components/AlbumCard";

const Albums = () => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const res = await api.get("/music/albums");
        setAlbums(res.data.albums);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAlbums();
  }, []);

  return (
    <div>
      <h1 className="mb-6 text-4xl font-bold">Albums</h1>

      <div className="grid grid-cols-2 gap-5 md:grid-cols-4 lg:grid-cols-5">
        {albums.map((album) => (
          <AlbumCard
            key={album._id}
            album={album}
          />
        ))}
      </div>
    </div>
  );
};

export default Albums;