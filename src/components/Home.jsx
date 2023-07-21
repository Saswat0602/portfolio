import React from "react";
import hero from "../assets/hero.jpg";
import { HiArrowNarrowRight } from "react-icons/hi";
import { Link } from "react-scroll";

const Home = () => {
  return (
    <>
      <div
        name="home"
        className="w-full h-screen bg-gradient-to-b via-black from-black to-gray-800  "
      >
        <div className="max-w-screen-lg mx-auto flex flex-col items-center justify-center h-full px-4 md:flex-row">
          <div className="flex flex-col justify-center h-full">
            <h2 className="text-4xl sm:text-7xl font-bold text-white">
              I'm a Mern stack Developer
            </h2>
            <p className="text-gray-500 py-4 max-w-md">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde
              deserunt impedit atque est delectus? At dolorum nemo beatae eos
              repellendus atque harum, fuga v
            </p>
            <div className="text-white w-fit px-6 py-3 my-2 flex items-center rounded-md bg-gradient-to-r from-cyan-500 to to-blue-500 cursor-pointer">
              <button>
                Portfolio
                <span>
                  <HiArrowNarrowRight />
                </span>
              </button>
            </div>
          </div>
          <div>
            <img
              src={hero}
              alt="my profile"
              className="rounded-2xl mx-auto w-2/3 md:w-full"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
