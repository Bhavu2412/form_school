import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSlack } from "@fortawesome/free-brands-svg-icons";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Avatar } from "rsuite";
import React, { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // Set initial state to false

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-blue-400 h-16 w-full flex items-center justify-between flex-row font-hTags relative">
      <div className="flex flex-row m-2 p-2 space-x-4 items-center">
        <a href="/">
          <FontAwesomeIcon
            className="h-14"
            icon={faSlack}
            style={{ color: "#63E6BE" }}
          />
        </a>
        <div className="hidden md:flex space-x-4">
          <a
            href="/about"
            className="cursor-pointer text-black btn btn-one flex items-center justify-center"
          >
            AboutUs
          </a>
          <a
            href="/dashboard"
            className="cursor-pointer text-black btn btn-one flex items-center justify-center"
          >
            Dashboard
          </a>
          <a
            href="/contact"
            className="cursor-pointer text-black btn btn-one flex items-center justify-center"
          >
            ContactUs
          </a>
        </div>
      </div>
      <div className="hidden md:flex flex-row m-2 p-2 space-x-4">
        <a
          href="/signup"
          className="cursor-pointer text-black btn btn-one flex items-center justify-center"
        >
          Signup
        </a>
        <a
          href="/login"
          className="cursor-pointer text-black btn btn-one flex items-center justify-center"
        >
          Login
        </a>
        {localStorage.getItem("image") ? (
          <a href="/profile">
            <Avatar circle size="sm" src={localStorage.getItem("image")} />
          </a>
        ) : (
          <a href="/profile">
            <Avatar circle size="sm" />
          </a>
        )}
      </div>
      <div className="md:hidden flex items-center m-2 p-2">
        <button onClick={toggleMenu}>
          <FontAwesomeIcon
            className="h-8"
            icon={isOpen ? faTimes : faBars}
            style={{ color: "#fff" }}
          />
        </button>
      </div>
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-blue-400 h-auto flex flex-col items-center space-y-4 py-4 z-10">
          <a href="/profile" onClick={toggleMenu}>
            <Avatar
              circle
              size="sm"
              src={localStorage.getItem("image") || ""}
            />
          </a>
          <a
            href="/about"
            className="cursor-pointer text-black btn btn-one flex items-center justify-center"
            onClick={toggleMenu}
          >
            AboutUs
          </a>
          <a
            href="/dashboard"
            className="cursor-pointer text-black btn btn-one flex items-center justify-center"
            onClick={toggleMenu}
          >
            Dashboard
          </a>
          <a
            href="/contact"
            className="cursor-pointer text-black btn btn-one flex items-center justify-center"
            onClick={toggleMenu}
          >
            ContactUs
          </a>
          <a
            href="/signup"
            className="cursor-pointer text-black btn btn-one flex items-center justify-center"
            onClick={toggleMenu}
          >
            Signup
          </a>
          <a
            href="/login"
            className="cursor-pointer text-black btn btn-one flex items-center justify-center"
            onClick={toggleMenu}
          >
            Login
          </a>
        </div>
      )}
    </div>
  );
}
