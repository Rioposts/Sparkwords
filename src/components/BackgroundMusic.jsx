import React, { useEffect, useRef, useState } from "react";
import { MdMusicNote, MdMusicOff } from "react-icons/md";
import "../styles/BackgroundMusic.css"; 

const BackgroundMusic = ({ src }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true); // Start as playing

  useEffect(() => {
    const playMusic = () => {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          // Autoplay blocked
          setIsPlaying(false);
        });
      }
    };
    playMusic();
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;
    isPlaying ? audioRef.current.play() : audioRef.current.pause();
  }, [isPlaying]);

  const toggleMusic = () => setIsPlaying((prev) => !prev);

  return (
    <>
      <audio ref={audioRef} loop>
        <source src={src} type="audio/mp3" />
      </audio>
      <button className="music-toggle-button" onClick={toggleMusic}>
        {isPlaying ? <MdMusicNote size={24} /> : <MdMusicOff size={24} />}
      </button>
    </>
  );
};

export default BackgroundMusic;
