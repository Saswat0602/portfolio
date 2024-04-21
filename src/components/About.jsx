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
        <p className="text-3xl font-extralight mt-6">
          Currently I am working at Hysclaer As a junior technical programmer.
        </p>


        <p className="text-xl mt-6 font-thin">
          I have completed my MCA degree at United School of Business
          Management in Bhubaneswar. With a BSc degree from Utkal University 
          .<br /><br /> I have honed my skills in web
          technologies such as HTML, CSS, and JavaScript, React ,React Native and Backend
          Technology like Nodejs,ExpressJs ,MongoDB as well as tools like Git
          and Github.
        </p>

        <br />

        <p className="text-xl font-thin">
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
