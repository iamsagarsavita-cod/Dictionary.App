import React, { use } from 'react'
import { useState } from 'react';
import axios from 'axios'

const Dictionary = () => {

  const [word, setWord] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");
  const [wordData, setWordData] = useState(null);




  return (
    <div className="min-h-screen bg-linear-to-r from-indigo-100 via-sky-100 to-cyan-100 flex justify-center items-center">
      <div className="bg-white/50 w-full max-w-2xl rounded-3xl p-8 shadow-xl">
      <h1 className="text-4xl text-center font-bold text-indigo-600 mb-8">
        📖 Dictionary app</h1>

        <div className="flex gap-3">

          <input type="text" placeholder="Enter any word" className="flex-1 border-2 border-indigo-300 rounded-xl px-4 py-3 outline-none  focus:border-indigo-600" 
          value={word}
          onChange={(e) => setWord(e.target.value)}
          />

          <button
          className="bg-indigo-600 text-white px-10 font-medium text-lg rounded-xl hover:bg-indigo-700 cursor-pointer"
          onClick={searchWord}>
            Search</button>
        </div>



      </div>
    </div>
  )
}

export default Dictionary;
