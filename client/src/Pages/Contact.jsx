import { Input, Dropdown } from "rsuite";
import Lottie from "lottie-react";
import { Button } from "rsuite";
import animationData from "../assets/Animation - 1718859706573.json";
import { useEffect, useState } from "react";

export default function Contact() {
  const [data, setData] = useState({
    name: "",
    email: "",
    message: "",
  });

  function handleChange(name, value) {
    setData({ ...data, [name]: value });
  }

  const handleSubmitClick = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("message", data.message);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL_HOST}/form/api/contact`,
        {
          method: "POST",
          body: formData,
        }
      );
      const result = await response.json();
      if (result.status === "success") {
        alert(result.message);
      } else {
        alert("Error submitting form");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="bg-white w-full bg-grid-black/[0.1] relative flex items-center justify-center">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_40%,black)]"></div>
      <div className="flex flex-col items-center justify-center m-4 p-4 w-full max-w-screen-lg">
        <div className="w-full flex flex-col space-y-3 items-center justify-center">
          <h3 className="font-Cursive text-2xl md:text-4xl lg:text-6xl">
            Contact Us
          </h3>
          <h3 className="font-Link text-lg md:text-xl lg:text-3xl">
            Feel free to email us
          </h3>
          <div className="w-full bg-white flex flex-col md:flex-row rounded-lg">
            <div className="w-full md:w-1/2 flex flex-col items-center md:items-end justify-center p-4">
              <div className="w-full h-60 md:h-full">
                <Lottie
                  animationData={animationData}
                  loop={true}
                  className="w-full h-full"
                />
              </div>
              <div className="flex flex-col space-y-2 justify-center items-center md:space-y-4 md:mr-4 mt-4 font-General">
                <h2 className="font-Link text-xl md:text-2xl">
                  How can we help?
                </h2>
                <ol className="text-sm space-y-1 md:text-md md:space-y-2">
                  <li className="cursor-pointer">
                    <a>How do I create a new form?</a>
                  </li>
                  <li className="cursor-pointer">
                    <a>How do I delete a new form?</a>
                  </li>
                  <li className="cursor-pointer">
                    <a>Can I merge multiple forms into one?</a>
                  </li>
                  <li className="cursor-pointer">
                    <a>How do I share my form with others?</a>
                  </li>
                  <li className="cursor-pointer">
                    <a>Why isn't my form loading properly?</a>
                  </li>
                </ol>
              </div>
            </div>
            <div className="w-full md:w-1/2 font-General p-4">
              <div className="flex flex-col justify-center items-center md:items-start mt-2">
                <h2 className="font-hTags text-xl md:text-2xl lg:text-4xl">
                  Have Questions?
                </h2>
                <h3 className="font-Link text-lg">Shoot us an email.</h3>
              </div>
              <div className="w-full p-2">
                <p className="text-sm md:text-md lg:text-lg">
                  Introducing FormPro, the ultimate solution for effortless form
                  creation and data collection. Designed for ease of use,
                  FormPro offers an intuitive interface and customizable
                  templates, enabling users to quickly create professional
                  forms.
                </p>
              </div>
              <div className="bg-gray-100 m-4 p-4 rounded-lg flex flex-col space-y-2 md:space-y-4">
                <Dropdown title="Select Issues here">
                  <Dropdown.Item>Form Issue</Dropdown.Item>
                  <Dropdown.Item>Issue with Deleting form</Dropdown.Item>
                  <Dropdown.Item>Community Issue</Dropdown.Item>
                  <Dropdown.Item>Analysis Issue</Dropdown.Item>
                  <Dropdown.Item>Excel issue</Dropdown.Item>
                  <Dropdown.Item>Settings</Dropdown.Item>
                </Dropdown>
                <label className="w-full">
                  <p className="text-sm md:text-md lg:text-lg">Your Name</p>
                  <Input
                    type="text"
                    onChange={(value) => handleChange("name", value)}
                  />
                </label>
                <label className="w-full">
                  <p className="text-sm md:text-md lg:text-lg">Your Email</p>
                  <Input
                    type="text"
                    onChange={(value) => handleChange("email", value)}
                  />
                </label>
                <label className="w-full">
                  <p className="text-sm md:text-md lg:text-lg">Your Message</p>
                  <Input
                    as="textarea"
                    rows={6}
                    placeholder="Message..."
                    onChange={(value) => handleChange("message", value)}
                  />
                </label>
                <label className="w-full">
                  <p className="text-sm md:text-md lg:text-lg">
                    Screenshot (Optional)
                  </p>
                  <Input type="file" />
                </label>
                <label className="w-full">
                  <Button appearance="primary" onClick={handleSubmitClick}>
                    Submit
                  </Button>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
