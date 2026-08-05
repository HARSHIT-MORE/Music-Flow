import {
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume2,
  X,
} from "lucide-react";

import { usePlayer } from "../context/PlayerContext";

const MusicPlayer = () => {
  const {
    currentSong,
    isPlaying,
    togglePlay,
    progress,
    changeProgress,
    stopSong,
    // changeVolume,
  } = usePlayer();

  if (!currentSong) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 md:left-64 z-50 border-t border-[#333] bg-[#121212] px-5 py-3">
      <div className="flex items-center justify-between gap-5">
        <div className="flex w-1/4 min-w-0 items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-gradient-to-br from-purple-600 to-blue-500">
            🎵
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">
              {currentSong.title}
            </p>

            <p className="truncate text-xs text-gray-400">
            {typeof currentSong.artist === "object"
                ? currentSong.artist?.username
                : currentSong.artist || "Unknown Artist"}
            </p>
          </div>
        </div>

        <div className="flex w-1/2 flex-col items-center gap-2">
          <div className="flex items-center gap-6">
            <button>
              <SkipBack size={20} />
            </button>

            <button
              onClick={togglePlay}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black"
            >
              {isPlaying ? (
                <Pause size={20} fill="black" />
              ) : (
                <Play size={20} fill="black" />
              )}
            </button>

            <button>
              <SkipForward size={20} />
            </button>
          </div>

          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={changeProgress}
            className="w-full max-w-xl accent-green-500"
          />
        </div>

        <div className="hidden w-1/4 items-center justify-end gap-3 md:flex">
          <Volume2 size={20} />

        <input
          type="range"
          min="0"
          max="100"
          // value={volume}
          // onChange={changeVolume}
          className="w-24 accent-green-500"
        />

          <button
    onClick={stopSong}
    className="rounded-full p-2 hover:bg-gray-700"
  >
    <X size={18} />
  </button>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;