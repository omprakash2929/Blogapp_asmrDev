import React, { useState } from "react";
import { FaReact, FaSearch } from "react-icons/fa";
import { GiNewspaper } from "react-icons/gi";
import { HiOutlineUserPlus } from "react-icons/hi2";
import { IoIosTrendingUp } from "react-icons/io";

import { useNavigate } from "react-router-dom";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    // Navigate to the search results page with the searchTerm as a query parameter
    navigate(`/search-results?query=${searchTerm}`);
  };

  return (
    <>
      <div className="overflow-x-hidden bg-white">
        <div className="relative py-12 sm:py-16 lg:pt-20 xl:pb-0">
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h4 className="mt-5 text-sm  leading-snug text-gray-900 sm:text-sm sm:leading-snug lg:text-xl font-semibold lg:leading-snug">
                Tech to World
              </h4>
              <h1 className="mt-5 text-3xl font-Rubik font-medium  leading-snug text-gray-900 sm:text-5xl sm:leading-snug lg:text-5xl lg:leading-snug">
                Exploring <br className="sm:hidden" />
                Tech World
                <span className="relative inline-flex lg:text-6xl  justify-center whitespace-nowrap font-Rubik ">
                  one destination at a time
                </span>
              </h1>
              <form className="mt-10" onSubmit={handleSearch}>
                <div className="group flex items-center relative border border-gray-900 p-1 focus-within:ring-1 focus-within:ring-gray-900 sm:flex-row rounded-full">
                  <FaSearch className="text-center text-[45px] px-1 py-2 font-light text-gray-500" />
                  <input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    type="text"
                    placeholder="search here"
                    className="block w-full bg-transparent px-4 py-4  placeholder-gray-400 outline-none font-Rubik "
                    required
                  />
                  <div className="flex rounded-full px-[3px] py-[3px] lg:px-[5px] lg:py-[5px] sm:absolute sm:inset-y-0 sm:right-0 sm:h-full ">
                    <button
                      type="submit"
                     
                      className="inline-flex w-full items-center justify-center bg-slate-900 px-5 lg:py-2 text-lg font-medium text-white outline-none transition-all hover:bg-gray-600 focus:bg-gray-600  py-[19px] rounded-full font-Rubik"
                    >
                      Explore
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="mx-auto mt-8 mb-8 flex w-fit flex-col items-center justify-center sm:flex-row sm:divide-y-0 sm:divide-x md:mt-5">
            <div className="px-4 py-2 flex  md:flex-row justify-center items-center space-x-7">
              <span className="flex justify-center items-center space-x-1 bg-gray-400 rounded-full p-3 text-gray-100 cursor-pointer transition-all hover:bg-gray-900">
                <FaReact className="text-xl md:text-2xl" />
                <span className="font-Rubik text-xl md:text-2xl" onClick={() => navigate("/search-results?query=react")} >React</span>
              </span>
              <span className="flex justify-center items-center space-x-1 bg-gray-400 rounded-full p-3 text-gray-100 cursor-pointer transition-all hover:bg-gray-900">
                <GiNewspaper className="text-xl md:text-2xl" />
                <span className="font-Rubik text-xl md:text-2xl" onClick={() => navigate("/search-results?query=news")} >News</span>
              </span>
              <span className="flex justify-center items-center space-x-1 bg-gray-400 rounded-full p-3 text-gray-100 cursor-pointer transition-all hover:bg-gray-900">
                <HiOutlineUserPlus className="text-xl md:text-2xl" />
                <span className="font-Rubik text-xl md:text-2xl" onClick={() => navigate("/search-results?query=jobs")} >Jobs</span>
              </span>
              <span className="md:flex justify-center items-center space-x-1 hidden bg-gray-400 rounded-full p-3 text-gray-100 cursor-pointer transition-all hover:bg-gray-900">
                <IoIosTrendingUp className="text-xl md:text-2xl" />
                <span className="font-Rubik text-xl md:text-2xl" onClick={() => navigate("/search-results?query=trending")}  >
                  Trending
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
