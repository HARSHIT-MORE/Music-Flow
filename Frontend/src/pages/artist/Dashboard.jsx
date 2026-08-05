import { useEffect, useState } from "react";
import api from "../../services/api";

import ArtistSidebar from "../../components/artist/ArtistSidebar";
import ArtistNavbar from "../../components/artist/ArtistNavbar";
import StatCard from "../../components/artist/StatCard";
import ArtistLayout from "../../components/artist/ArtistLayout";

const Dashboard = () => {
  const [stats, setStats] = useState({
    songs: 0,
    albums: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const songs = await api.get("/music");
        const albums = await api.get("/music/albums");

        setStats({
          songs: songs.data.musics.length,
          albums: albums.data.albums.length,
        });
      } catch (err) {
        console.log(err);
      }
    };

    fetchStats();
  }, []);

  return (
    <ArtistLayout>
    <div className="min-h-screen bg-[#0b0b0b] text-white">

      <ArtistSidebar />

      <div className="ml-64">

        <ArtistNavbar />

        <div className="grid grid-cols-1 gap-8 p-8 md:grid-cols-2">

          <StatCard
            title="Total Songs"
            value={stats.songs}
            color="bg-green-600"
          />

          <StatCard
            title="Albums"
            value={stats.albums}
            color="bg-purple-600"
          />

        </div>

      </div>

    </div>
    </ArtistLayout>
  );
};

export default Dashboard;
