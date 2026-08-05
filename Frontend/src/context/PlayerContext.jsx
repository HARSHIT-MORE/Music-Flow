import { createContext, useContext, useEffect, useRef, useState } from "react";

const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const audioRef = useRef(new Audio());

  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  // const [volume, setVolume] = useState(80);

  useEffect(() => {
    const audio = audioRef.current;
    // audio.volume = 0.8;
    const handleEnded = () => {
        setIsPlaying(false);
        setProgress(0);
      };

      audio.addEventListener("ended", handleEnded);
    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    audio.addEventListener("timeupdate", updateProgress);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  // const playSong = (song) => {
  //   if (!song?.uri) return;

  //   if (currentSong?._id === song._id) {
  //     audioRef.current.play();
  //     setIsPlaying(true);
  //     return;
  //   }

  //   audioRef.current.src = song.uri;
  //   audioRef.current.play();

  //   setCurrentSong(song);
  //   setIsPlaying(true);
  // };

  const playSong = async (song) => {
  if (!song?.uri) {
    console.log("Song has no URI");
    return;
  }

  try {
    const audio = audioRef.current;

    if (currentSong?._id !== song._id) {
      audio.pause();
      audio.currentTime = 0;

      audio.src = song.uri;
      audio.load();

      setCurrentSong(song);
    }

    await audio.play();

    setIsPlaying(true);
  } catch (err) {
    console.error("Audio playback failed:", err);
  }
};
  const pauseSong = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  // const togglePlay = () => {
  //   if (!currentSong) return;

  //   if (isPlaying) {
  //     pauseSong();
  //   } else {
  //     playSong(currentSong);
  //   }
  // };


  // const changeProgress = (e) => {
  //   const value = e.target.value;

  //   if (audioRef.current.duration) {
  //     audioRef.current.currentTime =
  //       (value / 100) * audioRef.current.duration;

  //     setProgress(value);
  //   }
  // };
  
const togglePlay = async () => {
  if (!currentSong) return;

  try {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      await audioRef.current.play();
      setIsPlaying(true);
    }
  } catch (err) {
    console.log(err);
  }
};

  const changeProgress = (e) => {
  const value = Number(e.target.value);

  if (!audioRef.current.duration) return;

  audioRef.current.currentTime =
    (value / 100) * audioRef.current.duration;

  setProgress(value);
};


//   const stopSong = () => {
//   audioRef.current.pause();
//   audioRef.current.currentTime = 0;
//   audioRef.current.src = "";

//   setCurrentSong(null);
//   setIsPlaying(false);
//   setProgress(0);
// };

const stopSong = () => {
  const audio = audioRef.current;

  audio.pause();
  audio.currentTime = 0;
  audio.removeAttribute("src");
  audio.load();

  setCurrentSong(null);
  setIsPlaying(false);
  setProgress(0);
};

// const changeVolume = (e) => {
//   const value = Number(e.target.value);

//   setVolume(value);

//   audioRef.current.volume = value / 100;
// };
  return (
    <PlayerContext.Provider
      value={{
        currentSong,
        isPlaying,
        progress,
        playSong,
        pauseSong,
        togglePlay,
        changeProgress,
        stopSong,
        // changeVolume,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  return useContext(PlayerContext);
};