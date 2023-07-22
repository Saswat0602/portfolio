import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { BsFillPersonLinesFill } from "react-icons/bs";

const Footer = () => {

  return (
    
      <div
        className="bg-gradient-to-b from-gray-800 to-black w-full h-full text-white"
      >
        <footer className=" text-center p-5 mt-3">
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
          <div className="">
            <small> &copy; </small> <span>{new Date().getFullYear()}</span> made
            with &hearts; by <em>Saswat Ranjan</em>{" "}
          </div>{" "}
        </footer>
      </div>
    
  );
};

export default Footer;
