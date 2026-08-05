import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import ArtistLayout from "../../components/artist/ArtistLayout";

const MyAlbums = () => {
  const [albums, setAlbums] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    try {
      const res = await api.get("/music/my-albums");
      setAlbums(res.data.albums || []);
    } catch (err) {
      console.log(err);
    }
  };

  const renameAlbum = async (album) => {
    const title = prompt("Enter new album name", album.title);

    if (!title || title.trim() === "") return;

    try {
      await api.put(`/music/album/${album._id}`, {
        title,
      });

      alert("Album renamed successfully");
      fetchAlbums();
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Rename failed");
    }
  };

  const deleteAlbum = async (id) => {
    if (!window.confirm("Delete this album?")) return;

    try {
      await api.delete(`/music/album/${id}`);

      alert("Album deleted successfully");

      fetchAlbums();
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  if (albums.length === 0) {
    return (
      <ArtistLayout>
        <div className="flex h-[75vh] flex-col items-center justify-center text-white">

          <div className="mb-5 text-8xl">
            💿
          </div>

          <h1 className="text-4xl font-bold">
            No Albums Yet
          </h1>

          <p className="mt-3 text-gray-400">
            Create your first album.
          </p>

        </div>
      </ArtistLayout>
    );
  }

  return (
    <ArtistLayout>

      <div className="mb-10 flex items-center justify-between">

        <h1 className="text-4xl font-bold text-white">
          My Albums
        </h1>

        <span className="rounded-full bg-green-500 px-5 py-2 font-bold text-black">
          {albums.length} Albums
        </span>

      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

        {albums.map((album) => (

          <div
            key={album._id}
            className="rounded-2xl bg-[#181818] p-5 transition hover:bg-[#232323]"
          >

            <div
              onClick={() => navigate(`/album/${album._id}`)}
              className="mb-5 flex h-56 cursor-pointer items-center justify-center rounded-xl bg-gradient-to-br from-green-600 via-green-500 to-purple-700 text-7xl transition hover:scale-105"
            >
              💿
            </div>

            <h2
              onClick={() => navigate(`/album/${album._id}`)}
              className="cursor-pointer text-2xl font-bold text-white hover:text-green-400"
            >
              {album.title}
            </h2>

            <p className="mt-2 text-gray-400">
              {album.musics?.length || 0} Songs
            </p>

            <div className="mt-6 flex gap-3">

              <button
                onClick={() => renameAlbum(album)}
                className="flex-1 rounded-lg bg-yellow-500 py-2 font-semibold text-black transition hover:bg-yellow-400"
              >
                Rename
              </button>

              <button
                onClick={() => deleteAlbum(album._id)}
                className="flex-1 rounded-lg bg-red-600 py-2 font-semibold text-white transition hover:bg-red-500"
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

    </ArtistLayout>
  );
};

export default MyAlbums;