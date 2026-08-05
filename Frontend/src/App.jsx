import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { PlayerProvider } from "./context/PlayerContext";

import ProtectedRoute from "./components/ProtectedRoute";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import MusicPlayer from "./components/MusicPlayer";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Home from "./pages/Home";
import Browse from "./pages/Browse";
import Albums from "./pages/Albums";
import AlbumDetails from "./pages/AlbumDetails";

import Dashboard from "./pages/artist/Dashboard";
import UploadMusic from "./pages/artist/UploadMusic";
import MySongs from "./pages/artist/MySongs";
import CreateAlbum from "./pages/artist/CreateAlbum";
import MyAlbums from "./pages/artist/MyAlbums";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#0b0b0b]">
      <Sidebar />

      <main className="min-h-screen md:ml-64">
        <Navbar />

        <div className="p-5 pb-32 md:p-8">
          {children}
        </div>
      </main>

      <MusicPlayer />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PlayerProvider>

          <Routes>

            {/* Public Routes */}

            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/register"
              element={<Register />}
            />

            {/* Listener Routes */}

            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Home />
                  </Layout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/browse"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Browse />
                  </Layout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/albums"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Albums />
                  </Layout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/album/:albumId"
              element={
                <ProtectedRoute>
                  <Layout>
                    <AlbumDetails />
                  </Layout>
                </ProtectedRoute>
              }
            />

            {/* Artist Routes */}

            <Route
              path="/artist"
              element={
                <ProtectedRoute role="artist">
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/artist/upload"
              element={
                <ProtectedRoute role="artist">
                  <UploadMusic />
                </ProtectedRoute>
              }
            />

            <Route
              path="/artist/songs"
              element={
                <ProtectedRoute role="artist">
                  <MySongs />
                </ProtectedRoute>
              }
            />

            <Route
              path="/artist/create-album"
              element={
                <ProtectedRoute role="artist">
                  <CreateAlbum />
                </ProtectedRoute>
              }
            />

            <Route
              path="/artist/albums"
              element={
                <ProtectedRoute role="artist">
                  <MyAlbums />
                </ProtectedRoute>
              }
            />

            {/* Redirect Unknown Routes */}

            <Route
              path="*"
              element={<Navigate to="/login" replace />}
            />

          </Routes>

        </PlayerProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;