import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { BsFillPersonLinesFill } from "react-icons/bs";

const Footer = () => {

  return (
    <div className="w-full  bg-gradient-to-b from-gray-800 to-black p-4 text-white">
      <div className=" text-center mx-auto px-5 mt-2">
        <div className="">
          <div className="flex justify-between sm:">
            <a
              href="https://github.com/Saswat0602"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub size={30} />
            </a>
            <a
              href="https://www.linkedin.com/in/saswat0602"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin size={30} />
            </a>
            <a
              href="mailto:saswatranjan0602@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <HiOutlineMail size={30} />
            </a>

            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
              <BsFillPersonLinesFill size={30} />
            </a>
          </div>
        </div>
        <div className="mt-5">
          <p>Don't wish for it! Work for it!</p>
          <small> &copy; </small> <span>{new Date().getFullYear()}</span> made
          with &hearts; by{" "}
          <a
            className="text-bold text-2xl text-blue-500 font-signature"
            href="mailto:saswatranjan0602@gmail.com"
          >
            Saswat Ranjan
          </a>{" "}
        </div>{" "}
      </div>
    </div>
  );
};

export default Footer;
