import React from "react";
import yelpCamp from "../assets/portfolio/yelpCamp.png";
import food from "../assets/portfolio/food.png";
import news from "../assets/portfolio/news.png";
import note from "../assets/portfolio/note.png";
import movie from "../assets/portfolio/movie.png";
import tic from "../assets/portfolio/tictactoe.png";
// import todo from '../assets/portfolio/todo.png'

const Portfolio = () => {
  const portfolios = [
    {
      id: 1,
      src: yelpCamp,
      name: "Yelp-Camp",
      href : "https://github.com/Saswat0602/YELP-CAMP-PROJECT.git"
    
    },
    {
      id: 2,
      src: news,
      name: "News-App",
      href: "https://github.com/Saswat0602/news-app.git",
    },
    {
      id: 3,
      src: movie,
      name: "Movie-App",
      href: "https://github.com/Saswat0602/movieSearch.git",
    },
    {
      id: 4,
      src: tic,
      name: "Tic-Tac-Toe",
      href: "https://github.com/Saswat0602/tic-tac-toe.git",
    },
    {
      id: 5,
      src: note,
      name: "Note-Taker",
      href: "https://github.com/Saswat0602/notebook.git",
    },
    {
      id: 6,
      src: food,
      name: "Food-Oredering-App",
      href: "https://github.com/Saswat0602/food-website.gethub.io.git",
    },
  ];

  return (
    <div
      name="portfolio"
      className="bg-gradient-to-b from-black to-gray-800 w-full md:h-screen text-white"
    >
      <div className="max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-full">
        <div className="pb-8">
          <p className="text-4xl font-bold inline border-b-4 border-gray-500">
            Portfolio
          </p>
          <p className="py-6">Check out some of my work right here</p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 px-12 sm:px-0">
          {portfolios.map(({ id, src, name, href }) => (
            <div key={id} className=" shadow-md shadow-gray-600 rounded-lg">
              <h2>{name}</h2>
              <img
                src={src}
                alt=""
                className="rounded-md duration-200 hover:scale-105"
              />
              <div className="flex items-center justify-center">
                <a 
                  href={href}
                  className="px-12 py-3 w-1/2 m-4 duration-200 hover:scale-105"
                  target="_blank" // This will open the link in a new tab
                  rel="noopener noreferrer" // Recommended for security reasons
                >
                  Code
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
