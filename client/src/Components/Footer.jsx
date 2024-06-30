import { Input, Divider } from "rsuite";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSlack } from "@fortawesome/free-brands-svg-icons";
export default function Footer() {
  function handleSubmitClick() {
    alert("You tried to contact us");
  }
  return (
    <div className="h-90 bg-blue-400 text-black">
      <div className="flex flex-col">
        <div className="flex flex-col md:flex-row justify-between h-auto md:h-64 m-4 p-4 space-y-8 md:space-y-0">
          <div className="flex flex-row sm:flex-col md:flex-row items-center space-x-0 md:space-x-20 justify-around w-full md:w-1/4">
            <div className="flex flex-col items-center space-y-4 text-lg justify-between w-full md:w-auto">
              <p className="font-sans text-lg font-bold text-blue-900 text-left">
                About
              </p>
              <ul className="space-y-4 flex font-serif flex-col">
                <li className="transition-colors cursor-pointer hover-underline-animation">
                  Careers
                </li>
                <li className="transition-colors cursor-pointer hover-underline-animation">
                  News
                </li>
                <li className="transition-colors cursor-pointer hover-underline-animation">
                  Review
                </li>
                <li className="transition-colors cursor-pointer hover-underline-animation">
                  AboutUs
                </li>
              </ul>
            </div>
            <Divider orientation="vertical" className="hidden md:block" />
            <div className="flex flex-col font-serif text-lg space-y-4 items-center justify-between w-full md:w-auto">
              <p className="font-sans text-lg font-bold text-blue-900 text-left">
                Consumer
              </p>
              <ul className="space-y-4 font-serif flex flex-col">
                <li className="transition-colors cursor-pointer hover-underline-animation">
                  Privacy
                </li>
                <li className="transition-colors cursor-pointer hover-underline-animation">
                  <a href="/security">Security</a>
                </li>
                <li className="transition-colors cursor-pointer hover-underline-animation">
                  <a
                    href="/terms"
                    className="text-customeGolden hover-text-customeGolden"
                  >
                    Terms of Use
                  </a>
                </li>
                <li className="transition-colors cursor-pointer hover-underline-animation">
                  <a
                    href="/"
                    className="text-customeGolden hover-text-customeGolden"
                  >
                    JoinUs
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="text-4xl md:text-8xl font-Cursive flex flex-col items-center justify-center w-full md:w-auto">
            <FontAwesomeIcon
              className="h-16 md:h-32"
              icon={faSlack}
              style={{ color: "#63E6BE" }}
            />
            <div className="flex flex-row space-x-10 mt-10">
              <svg
                className="cursor-pointer hover:animate-pulse"
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 2476 2476"
                id="instagram"
              >
                <path d="M825.4 1238c0-227.9 184.7-412.7 412.6-412.7 227.9 0 412.7 184.8 412.7 412.7 0 227.9-184.8 412.7-412.7 412.7-227.9 0-412.6-184.8-412.6-412.7m-223.1 0c0 351.1 284.6 635.7 635.7 635.7s635.7-284.6 635.7-635.7-284.6-635.7-635.7-635.7S602.3 886.9 602.3 1238m1148-660.9c0 82 66.5 148.6 148.6 148.6 82 0 148.6-66.6 148.6-148.6s-66.5-148.5-148.6-148.5-148.6 66.5-148.6 148.5M737.8 2245.7c-120.7-5.5-186.3-25.6-229.9-42.6-57.8-22.5-99-49.3-142.4-92.6-43.3-43.3-70.2-84.5-92.6-142.3-17-43.6-37.1-109.2-42.6-229.9-6-130.5-7.2-169.7-7.2-500.3s1.3-369.7 7.2-500.3c5.5-120.7 25.7-186.2 42.6-229.9 22.5-57.8 49.3-99 92.6-142.4 43.3-43.3 84.5-70.2 142.4-92.6 43.6-17 109.2-37.1 229.9-42.6 130.5-6 169.7-7.2 500.2-7.2 330.6 0 369.7 1.3 500.3 7.2 120.7 5.5 186.2 25.7 229.9 42.6 57.8 22.4 99 49.3 142.4 92.6 43.3 43.3 70.1 84.6 92.6 142.4 17 43.6 37.1 109.2 42.6 229.9 6 130.6 7.2 169.7 7.2 500.3 0 330.5-1.2 369.7-7.2 500.3-5.5 120.7-25.7 186.3-42.6 229.9-22.5 57.8-49.3 99-92.6 142.3-43.3 43.3-84.6 70.1-142.4 92.6-43.6 17-109.2 37.1-229.9 42.6-130.5 6-169.7 7.2-500.3 7.2-330.5 0-369.7-1.2-500.2-7.2M727.6 7.5c-131.8 6-221.8 26.9-300.5 57.5-81.4 31.6-150.4 74-219.3 142.8C139 276.6 96.6 345.6 65 427.1 34.4 505.8 13.5 595.8 7.5 727.6 1.4 859.6 0 901.8 0 1238s1.4 378.4 7.5 510.4c6 131.8 26.9 221.8 57.5 300.5 31.6 81.4 73.9 150.5 142.8 219.3 68.8 68.8 137.8 111.1 219.3 142.8 78.8 30.6 168.7 51.5 300.5 57.5 132.1 6 174.2 7.5 510.4 7.5 336.3 0 378.4-1.4 510.4-7.5 131.8-6 221.8-26.9 300.5-57.5 81.4-31.7 150.4-74 219.3-142.8 68.8-68.8 111.1-137.9 142.8-219.3 30.6-78.7 51.6-168.7 57.5-300.5 6-132.1 7.4-174.2 7.4-510.4s-1.4-378.4-7.4-510.4c-6-131.8-26.9-221.8-57.5-300.5-31.7-81.4-74-150.4-142.8-219.3C2199.4 139 2130.3 96.6 2049 65c-78.8-30.6-168.8-51.6-300.5-57.5-132-6-174.2-7.5-510.4-7.5-336.3 0-378.4 1.4-510.5 7.5"></path>
              </svg>
              <svg
                className="cursor-pointer hover:animate-pulse"
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 16 16"
                id="facebook"
              >
                <path d="M14 0H2C.897 0 0 .897 0 2v12c0 1.103.897 2 2 2h6v-5.5H6V8h2V6a3 3 0 0 1 3-3h2v2.5h-1c-.552 0-1-.052-1 .5v2h2.5l-1 2.5H11V16h3c1.103 0 2-.897 2-2V2c0-1.103-.897-2-2-2z"></path>
              </svg>
              <svg
                className="cursor-pointer hover:animate-pulse"
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="24"
                viewBox="0 5 1036 990"
                id="linkedin"
              >
                <path d="M0 120c0-33.334 11.667-60.834 35-82.5C58.333 15.833 88.667 5 126 5c36.667 0 66.333 10.666 89 32 23.333 22 35 50.666 35 86 0 32-11.333 58.666-34 80-23.333 22-54 33-92 33h-1c-36.667 0-66.333-11-89-33S0 153.333 0 120zm13 875V327h222v668H13zm345 0h222V622c0-23.334 2.667-41.334 8-54 9.333-22.667 23.5-41.834 42.5-57.5 19-15.667 42.833-23.5 71.5-23.5 74.667 0 112 50.333 112 151v357h222V612c0-98.667-23.333-173.5-70-224.5S857.667 311 781 311c-86 0-153 37-201 111v2h-1l1-2v-95H358c1.333 21.333 2 87.666 2 199 0 111.333-.667 267.666-2 469z"></path>
              </svg>
            </div>
          </div>
          <div className="flex flex-col justify-between space-y-4 w-full md:w-auto">
            <div className="space-y-4">
              <p className="font-Link text-blue-900 text-4xl flex flex-col items-center">
                Contact Us
              </p>
              <Input
                className="mt-4"
                key={"outside"}
                type="email"
                label="Email"
                labelPlacement={"outside"}
              />
              <button onClick={handleSubmitClick} className="btn btn-one">
                Submit
              </button>
            </div>
            <Divider className="horizintal" />
            <div className="flex flex-col font-General">
              <p>FormsPro</p>
              <p>123 Main Street, California 3823</p>
              <p>Inglewood, 90312, USA</p>
              <p>Phone: +1 (555)-123-4567</p>
              <p>Email: FormsPro@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-center items-center h-16">
        <p>&copy; 2024 MyCompany. All rights reserved.</p>
      </div>
    </div>
  );
}
