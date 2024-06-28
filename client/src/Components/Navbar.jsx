import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSlack } from "@fortawesome/free-brands-svg-icons";
import { Avatar } from "rsuite";
import React, { useState, useEffect } from "react";

export default function Navbar() {
  return (
    <>
      <div className=" bg-blue-400 h-16 w-screen flex items-center justify-between flex-row font-hTags">
        <div className="flex flex-row m-2 p-2 space-x-4 items-center">
          <a href="/">
            <FontAwesomeIcon
              className="h-14"
              icon={faSlack}
              style={{ color: "#63E6BE" }}
            />
          </a>
          <a
            href="/about"
            className="cursor-pointer text-black btn btn-one flex items-center justify-center"
          >
            AboutUs
          </a>
          <a
            href="/dashboard"
            className="cursor-pointer text-black  btn btn-one flex items-center justify-center"
          >
            Dashboard
          </a>
          <a
            href="/contact"
            className="cursor-pointer text-black  btn btn-one flex items-center justify-center"
          >
            ContactUs
          </a>
        </div>
        <div className="flex flex-row  m-2 p-2 space-x-4">
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
      </div>
    </>
  );
}
