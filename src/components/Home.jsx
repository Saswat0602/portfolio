import React from "react";
import hero from "../assets/hero.jpg";
import { HiArrowNarrowRight } from "react-icons/hi";
import { Link } from "react-scroll";

const Home = () => {
  return (
    <>
      <div
        name="home"
        className="w-full h-screen bg-gradient-to-b from-black via-black to-gray-800"
      >
        <div className=" max-w-screen-lg mx-auto flex flex-col md:flex-row items-center justify-center h-full px-4">
          <div className="flex flex-col justify-center h-full">
            <h2 className="text-4xl sm:text-7xl font-bold text-white">
            MERN/FRONTEND Developer
            </h2>
            <p className="text-gray-500 py-4 max-w-md">
              Hi, I'm Saswat Ranjan. A passionate Front-end React Developer & MERN stack Developer based
              in Bhubaneswar, 📍
            </p>
            <div>
              <Link
                to="portfolio"
                smooth
                duration={500}
                className="group text-white w-fit px-6 py-3 my-2 flex items-center rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 cursor-pointer"
              >
                Portfolio
                <span className="group-hover:rotate-90 duration-300">
                  <HiArrowNarrowRight className="ml-1" />
                </span>
              </Link>
            </div>
          </div>
          <div>
            <img
              src={hero}
              alt="my profile"
              className="rounded-2xl mx-auto mb-16  w-[70%]"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
