import React, { use } from "react";
import { useState } from "react";
import axios from "axios";

const Dictionary = () => {
  const [word, setWord] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");
  const [wordData, setWordData] = useState(null);

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
      setErrors("word Not Found");
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setWord("");
    setWordData(null);
    setErrors("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 flex justify-center items-center">
      <div className="bg-white w-full max-w-2xl rounded-3xl p-8 shadow-2xl border border-indigo-100">
        <h1 className="text-5xl text-center font-bold text-indigo-600 mb-8">
          📖 Dictionary app
        </h1>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="🔍 Enter a word..."
            className="flex-1 px-5 py-3 border border-indigo-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-400"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                searchWord();
              }
            }}
          />

          <button
            className="bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 text-white px-8 rounded-xl font-semibold shadow-lg cursor-pointer"
            onClick={searchWord}
          >
            Search
          </button>
        </div>

        {loading && (
          <h2 className=" text-center mt-6 text-lg text-red-800 font-semibold animate-pulse">
            Searching....
          </h2>
        )}

        {errors && (
          <h2 className="text-center mt-6 text-lg text-red-800 font-semibold">
            {errors}
          </h2>
        )}

        {wordData && (
          <div className="mt-8 bg-blue-200 rounded-2xl shadow-lg border border-indigo-100 p-6">
            <h1 className="text-3xl font-bold text-indigo-700">
              {wordData.word.charAt(0).toUpperCase() + wordData.word.slice(1)}
            </h1>
            <p className="text-gray-700  italic mt-2">
              🔊 {wordData.phonetic || "Phonetic not available"}
            </p>
            <div className="m-5 space-y-3">
              <div className="bg-indigo-100 rounded-xl p-4">
                <h3 className="font-semibold text-indigo-700">
                  Part of Speech
                </h3>

                <p className="text-lg">
                  {wordData.meanings?.[0]?.partOfSpeech}
                </p>
              </div>

              <div className="bg-green-50 rounded-xl p-4 mt-4">
                <h3 className="font-semibold text-green-700">Meaning</h3>

                <p className="mt-2">
                  {wordData.meanings?.[0]?.definitions?.[0]?.definition}
                </p>
              </div>

              <div className="bg-yellow-50 rounded-xl p-4 mt-4">
                <h3 className="font-semibold text-yellow-700">Example</h3>

                <p className="italic mt-2">
                  {wordData.meanings?.[0]?.definitions?.[0]?.example ||
                    "No example available"}
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
