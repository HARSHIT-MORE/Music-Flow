import ArtistSidebar from "./ArtistSidebar";
import ArtistNavbar from "./ArtistNavbar";

const ArtistLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white">
      <ArtistSidebar />

      <div className="ml-64">
        <ArtistNavbar />

        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default ArtistLayout;