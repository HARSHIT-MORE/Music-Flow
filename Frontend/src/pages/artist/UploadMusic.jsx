import { useEffect, useState } from "react";
import api from "../../services/api";

const UploadMusic = () => {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [album, setAlbum] = useState("");
  const [albums, setAlbums] = useState([]);
  const [music, setMusic] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    try {
      const res = await api.get("/music/albums");
      setAlbums(res.data.albums);
    } catch (err) {
      console.log(err);
    }
  };

  const submit = async (e) => {
    e.preventDefault();

    const form = new FormData();

    form.append("title", title);
    form.append("genre", genre);
    form.append("album", album);
    form.append("music", music);

    try {
      setLoading(true);

      const res = await api.post(
        "/music/upload",
        form
      );

      alert(res.data.message);

      setTitle("");
      setGenre("");
      setAlbum("");
      setMusic(null);
    } catch (err) {
      alert(err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] p-10 text-white">
      <div className="mx-auto max-w-2xl rounded-xl bg-[#181818] p-8">

        <h1 className="mb-8 text-3xl font-bold">
          Upload Music
        </h1>

        <form
          onSubmit={submit}
          className="space-y-5"
        >
          <input
            placeholder="Song Title"
            className="w-full rounded bg-[#2b2b2b] p-3"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
          />

          <input
            placeholder="Genre"
            className="w-full rounded bg-[#2b2b2b] p-3"
            value={genre}
            onChange={(e) =>
              setGenre(e.target.value)
            }
          />

          <select
            value={album}
            onChange={(e) =>
              setAlbum(e.target.value)
            }
            className="w-full rounded bg-[#2b2b2b] p-3"
          >
            <option value="">
              Select Album
            </option>

            {albums.map((a) => (
              <option
                key={a._id}
                value={a._id}
              >
                {a.title}
              </option>
            ))}
          </select>

          <input
            type="file"
            accept="audio/*"
            onChange={(e) =>
              setMusic(e.target.files[0])
            }
          />

          <button
            disabled={loading}
            className="w-full rounded bg-green-500 py-3 font-bold text-black"
          >
            {loading
              ? "Uploading..."
              : "Upload"}
          </button>
        </form>

      </div>
    </div>
  );
};

export default UploadMusic;