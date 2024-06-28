import { Button } from "rsuite";
import Lottie from "lottie-react";
import React, { useEffect } from "react";
import animationData from "../assets/Animation - 1718781072587.json";
import animationData2 from "../assets/Animation - 1718781520940.json";
import animationData3 from "../assets/Animation - 1718781741527.json";
import animationData4 from "../assets/Animation - 1718781778048.json";
export default function Home() {
  const redirectTo = (url) => {
    window.location.href = url;
  };
  function handleSignup() {
    redirectTo("/signup");
  }
  function handleSavings() {
    redirectTo("/dashboard");
  }
  function handleCreate() {
    redirectTo("/create");
  }
  function handleFill() {
    redirectTo("/form");
  }
  function handleJoin() {
    alert("JoinUs");
  }
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleScroll = () => {
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;
        const elementsToAnimate = document.querySelectorAll(
          ".move-from-top, .move-from-left"
        );
        elementsToAnimate.forEach((element) => {
          const elementTop =
            element.getBoundingClientRect().top + window.pageYOffset;
          if (elementTop < scrollTop + window.innerHeight) {
            element.classList.add("animate");
          } else {
            element.classList.remove("animate");
          }
        });
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);
  return (
    <div className="body_main">
      <div className=" bg-white  w-full bg-grid-black/[0.1] relative flex items-center justify-center">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-white  [mask-image:radial-gradient(ellipse_at_center,transparent_40%,black)]"></div>
        <div className="flex flex-row items-center justify-between m-10 p-10">
          <div className="space-y-8 w-1/2 p-8 move-from-top">
            <h1 className="font-serif text-5xl animate-bounce">
              Unlock Instant Insights with Forms!
            </h1>
            <h2 className="font-mono text-3xl animate-pulse">
              Streamline data collection and gain instant insights with our
              user-friendly Forms
            </h2>
            <button
              onClick={() => handleSignup()}
              className="bg-blue-400 btn-join"
            >
              <span className="text-md">Get Started</span>
            </button>
          </div>
          <div className="width-1/2 p-8 ">
            <Lottie animationData={animationData} loop={true} />
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center justify-between m-10 p-10">
        <div className="width-1/2 p-8">
          <Lottie animationData={animationData2} loop={true} />
        </div>
        <div className="space-y-8 w-1/2 p-8">
          <h1 className="font-serif text-3xl animation-typing animate-typing">
            Save valuable time and streamline data collection effortlessly with
            our efficient form solution.
          </h1>
          <p className="font-General text-xl">
            Our form simplifies data collection by offering customizable
            templates and automated responses, reducing manual input and
            streamlining information gathering. This efficiency allows users to
            focus more on analysis and decision-making rather than
            administrative tasks.
          </p>
          <button
            onClick={() => handleSavings()}
            className="bg-blue-400 btn-join"
          >
            <span>Dashboard</span>
          </button>
        </div>
      </div>

      <div className=" w-screen  bg-white  dark:bg-dot-white/[0.3] bg-dot-black/[0.3] relative flex items-center justify-center">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center  bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_50%,black)]"></div>
        <div className="flex flex-row items-center justify-between m-10 p-10">
          <div className="space-y-8 w-1/2 p-8 move-from-left">
            <h1 className="font-serif text-4xl animate-slide-in-bottom">
              Embrace collaboration and innovation with our open-source
              platform.
            </h1>
            <p className="font-General text-xl">
              Forms facilitate efficient data collection, enabling structured
              feedback and insights that aid in informed decision-making. They
              streamline communication, ensuring clarity and organization across
              teams, ultimately enhancing productivity and project management
              effectiveness.
            </p>
            <div className="fex flex-row space-x-5">
              {localStorage.getItem("role") === "user" && (
                <button
                  onClick={() => handleCreate()}
                  className="bg-blue-400 btn-join"
                >
                  <span>Create form</span>
                </button>
              )}
              {localStorage.getItem("role") === null && (
                <button
                  onClick={() => handleCreate()}
                  className="bg-blue-400 btn-join"
                >
                  <span>Create form</span>
                </button>
              )}
              {localStorage.getItem("role") === "client" && (
                <button
                  onClick={() => handleFill()}
                  className="bg-blue-400 btn-join"
                >
                  <span>Fill form</span>
                </button>
              )}
            </div>
          </div>
          <div className="width-1/2 p-8">
            <Lottie animationData={animationData3} loop={true} />
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center justify-between m-10 p-10">
        <div className="width-1/2 p-8">
          <Lottie animationData={animationData4} loop={true} />
        </div>
        <div className="space-y-8 w-1/2 flex flex-col items-start p-8">
          <h1 className="font-General text-3xl animate-slide-in-bottom">
            Join our community of form enthusiasts today and streamline your
            data collection like never before. Happy form building and even
            happier results!
          </h1>
          <button onClick={() => handleJoin()} className="bg-blue-400 btn-join">
            <span>Join Us</span>
          </button>
        </div>
      </div>
    </div>
  );
}
