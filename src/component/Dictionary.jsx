import React, { use } from 'react'
import { useState } from 'react';
import axios from 'axios'

const Dictionary = () => {

  const [word, setWord] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");
  const [wordData, setWordData] = useState(null);

  const searchWord = async () => {
    try{
      if(word.trim().length === 0){
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
    }catch (error){
      console.log(error);
      setErrors("word Not Found");
    }finally{
      setLoading(false);
    }
  }


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

        {
          loading && (
            <h2 className=" text-center mt-6 text-lg text-red-800 font-semibold animate-pulse">
              Searching....
            </h2>
          )
        }

        {
          errors && (
            <h2 className="text-center mt-6 text-lg text-red-800 font-semibold">
              {errors}
            </h2>
          )
        }

        {
          wordData && (
            <div className='mt-8 bg-indigo-50 rounded-2xl p-6'>
              <h1 className='text-3xl font-bold text-indigo-700'>
                {wordData.word}
              </h1>
              <p className='text-gray-700 mt-1'>
                  {wordData.phonetic || "phonetic not found"}
              </p>
              <div className='m-5 space-y-3'>
                <div className='bg-white/70 rounded-xl p-3 flex justify-between'>
                  <span className='font-semibold'>part of Speech</span>
                  <span>{wordData.meanings[0].partOfSpeech}</span>
                </div>

                <div className='bg-white/70 rounded-xl p-3'>
                  <h3 className='font-semibold mb-2'> Meaning</h3>
                  <p>{wordData.meanings[0].definitions[0].definition}</p>
                </div>

                <div className='bg-white/70 rounded-xl p-3'>
                  <h3 className='font-semibold mb-2'> Example</h3>
                  <p>{wordData.meanings[0].definitions[0].example || "No Example Available"}</p>
                </div>
              </div>

            </div>
          )
        }

      </div>
    </div>
  )
}

export default Dictionary;
