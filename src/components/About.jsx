import React from 'react'

const About = () => {
  return (
    <div
      name="about"
      className="w-full h-screen bg-gradient-to-b from-gray-800 to-black text-white"
    >
      <div className="max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-full">
        <div className="pb-8">
          <p className="text-4xl font-bold inline border-b-4 border-gray-500">
            About
          </p>
        </div>
        <p className="text-xl mt-20">
          I am currently pursuing an MCA degree at United School of Business
          Management in Bhubaneswar. With a BSc degree from GopaBandhu Choudhary
          College,Jajpur , <br /> I have honed my skills in C, Java, and web
          technologies such as HTML, CSS, and JavaScript, React and Backend
          Technology like Nodejs,ExpressJs ,MongoDB as well as tools like Git
          and Github.
        </p>

        <br />

        <p className="text-xl">
          I have eagerness to learn something new every day and I love to share
          my knowledge. <br /> I am eager to contribute my skills and knowledge
          to a dynamic and challenging environment where I can continue to learn
          and grow as a software developer.
        </p>
      </div>
    </div>
  );
}

export default About
