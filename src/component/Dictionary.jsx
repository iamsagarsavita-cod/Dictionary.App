import React from "react";
import { useState } from "react";
import axios from "axios";
import { FaMoon, FaSun } from "react-icons/fa";
import AudioPlayer from "./AudioPlayer";

const Dictionary = () => {
  const [word, setWord] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");
  const [wordData, setWordData] = useState(null);

  const [darkMode, setDarkMode] = useState(false);

  // Audio ke liye
  const audioUrl = wordData?.phonetics?.find((item) => item.audio)?.audio;

  const searchWord = async () => {
    try {
      if (word.trim().length === 0) {
        setErrors("Please Enter a Word...");
        return;
      }

      setLoading(true);
      setErrors("");

      let res = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
      );
      console.log(res);
      setWordData(res.data[0]);
    } catch (error) {
      console.log(error);
      setErrors("Word not found. Please try another word.");
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setWord("");
    setWordData(null);
    setErrors("");
  };

  // sysnonyms ke liye ek flapMap banake duplicate remove hoge
  const synonyms = [
    ...new Set(
      wordData?.meanings?.flatMap((meaning) => meaning.synonyms || []) || [],
    ),
  ];

  return (
    // Outer BOX
    <div
      className={`min-h-screen flex justify-center items-center transition-all duration-500 ${
        darkMode
          ? "bg-gray-900"
          : "bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100"
      }`}
    >
      {/* Card BOX */}

      <div
        className={`w-full max-w-2xl rounded-3xl p-8 shadow-2xl transition-all duration-500 ${
          darkMode
            ? "bg-gray-800 text-white border-gray-700"
            : "bg-white border-indigo-100"
        }`}
      >
        {/* Heading  */}

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-5xl font-bold text-indigo-600">
            📖 Dictionary App
          </h1>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="bg-indigo-600 text-white p-3 rounded-full hover:scale-110 transition"
          >
            {darkMode ? <FaSun size={15} /> : <FaMoon size={15} />}
          </button>
        </div>

{/* input bar with light and dark mode */}
        <div className="flex gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Enter any word..."
              className={`w-full border-2 rounded-xl px-4 py-3 pr-10 outline-none transition-all duration-300
              ${
                darkMode
                  ? "bg-gray-700 text-white border-gray-600 placeholder-gray-400 focus:border-indigo-400"
                  : "bg-white text-black border-indigo-300 placeholder-gray-500 focus:border-indigo-600"
              }`}
              value={word}
              onChange={(e) => setWord(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  searchWord();
                }
              }}
            />
{/* clear data ke liye */}
            {word && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xl"
              >
                ✖
              </button>
            )}
          </div>

{/* Search button */}
          <button
            className={`px-8 rounded-xl text-white ${
              darkMode
                ? "bg-orange-500 hover:bg-orange-600"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            Search
          </button>
        </div>

{/* loading and Searching */}
        {loading && (
          <h2 className=" text-center mt-6 text-lg text-red-800 font-semibold animate-pulse">
            Searching....
          </h2>
        )}

{/* if error aata hai to */}
        {errors && (
          <h2 className="text-center mt-6 text-lg text-red-800 font-semibold">
            {errors}
          </h2>
        )}

{/* word data or result bala section */}
        {wordData && (
          <div className="mt-8 bg-blue-200 rounded-2xl shadow-lg border border-indigo-100 p-6">
            {/* Word or audio ke liye banaya hai */}
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-indigo-700">
                {wordData.word.charAt(0).toUpperCase() + wordData.word.slice(1)}
              </h1>

              <AudioPlayer audioUrl={audioUrl} />
            </div>

            {/* ye hune Phonetic ke liye banaya hai */}
            <p className="text-gray-700  italic mt-2">
              🔊 {wordData.phonetic || "Phonetic not available"}
            </p>
            <div className="m-5 space-y-3">
              {/* part of speech ke liye */}
              <div
                className={`rounded-xl p-4 ${
                  darkMode ? "bg-gray-700" : "bg-indigo-100"
                }`}
              >
                <h3 className="font-semibold text-indigo-700">
                  Part of Speech
                </h3>

                <p className="text-lg">
                  {wordData.meanings?.[0]?.partOfSpeech}
                </p>
              </div>

              {/* word ka meaning */}
              <div
                className={`rounded-xl p-4 mt-4 ${
                  darkMode ? "bg-gray-700" : "bg-green-50"
                }`}
              >
                <h3 className="font-semibold text-green-700">
                  Meaning
                </h3>

                <p className="mt-2">
                  {wordData.meanings?.[0]?.definitions?.[0]?.definition}
                </p>
              </div>

              {/* Example ke liye */}
              <div
                className={`rounded-xl p-4 mt-4 ${
                  darkMode ? "bg-gray-700" : "bg-yellow-50"
                }`}
              >
                <h3 className="font-semibold text-yellow-700">Example</h3>

                <p className="italic mt-2">
                  {wordData.meanings?.[0]?.definitions?.[0]?.example ||
                    "No example available"}
                </p>
              </div>

              {/* synonyms ke liye */}
              <div
                className={`rounded-xl p-4 mt-4 ${
                  darkMode ? "bg-gray-700" : "bg-green-200"
                }`}
              >
                <h3 className="font-semibold text-red-500">Synonyms</h3>

                <p className="italic mt-2">
                  {synonyms.length > 0
                    ? synonyms.join(", ")
                    : "No synonyms available"}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dictionary;
