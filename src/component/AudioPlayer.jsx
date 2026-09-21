import React, { useRef } from "react";
import { FaVolumeUp } from "react-icons/fa";

const AudioPlayer = ({ audioUrl }) => {
  const audioRef = useRef(null);

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {
        // Some browsers block audio until a user gesture or when the file is unavailable.
      });
    }
  };

  if (!audioUrl) return null;

  return (
    <>
      <audio ref={audioRef} src={audioUrl} />

      <button
        onClick={playAudio}
        className="bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full transition-all duration-300"
        title="Play Pronunciation"
      >
        <FaVolumeUp size={18} />
      </button>
    </>
  );
};

export default AudioPlayer;
