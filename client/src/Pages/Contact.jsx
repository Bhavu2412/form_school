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
    <>
      <div className=" bg-white  w-full bg-grid-black/[0.1] relative flex items-center justify-center">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-white  [mask-image:radial-gradient(ellipse_at_center,transparent_40%,black)]"></div>
        <div className="flex flex-col items-center justify-center m-10 p-10 w-screen">
          <div className="h-[130vh] w-[100vw]  flex flex-col space-y-3 items-center justify-center">
            <h3 className="font-Cursive text-6xl">Contact Us</h3>
            <h3 className="font-Link text-3xl">Feel free to email us</h3>
            <div className="h-[110vh] w-[80vw] bg-white flex flex-row rounded-lg">
              <div className=" h-[100%] w-1/2 flex flex-col items-end justify-center">
                <div className="h-1/2">
                  <Lottie
                    animationData={animationData}
                    loop={true}
                    className="h-[100%]"
                  />
                </div>
                <div className="flex flex-col space-y-8 justify-center items-center mr-20 font-General">
                  <h2 className="font-Link">How can we help?</h2>
                  <ol className="text-lg space-y-4">
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
              <div className=" h-[100%] w-1/2 font-General">
                <div className="flex flex-col justify-center mt-3">
                  <h2 className="m-0 p-0 font-hTags">Have Questions?</h2>
                  <h3 className="m-0 p-0 font-Link">Shoot us an email.</h3>
                </div>
                <div className="w-[70%]">
                  <p>
                    Introducing FormPro, the ultimate solution for effortless
                    form creation and data collection. Designed for ease of use,
                    FormPro offers an intuitive interface and customizable
                    templates, enabling users to quickly create professional
                    forms.
                  </p>
                </div>
                <div className="bg-gray-100 m-4 p-4 rounded-lg flex flex-col justify-center space-y-4 w-[50%]">
                  <Dropdown title="Select Issues here">
                    <Dropdown.Item>Form Issue</Dropdown.Item>
                    <Dropdown.Item>Issue with Deleting form</Dropdown.Item>
                    <Dropdown.Item>Community Issue</Dropdown.Item>
                    <Dropdown.Item>Analysis Issue</Dropdown.Item>
                    <Dropdown.Item>Excel issue</Dropdown.Item>
                    <Dropdown.Item>Settings</Dropdown.Item>
                  </Dropdown>
                  <label>
                    <p>Your Name</p>
                    <Input
                      type="text"
                      onChange={(value) => handleChange("name", value)}
                    />
                  </label>
                  <label>
                    <p>Your Email</p>
                    <Input
                      type="text"
                      onChange={(value) => handleChange("email", value)}
                    />
                  </label>
                  <label>
                    <p>Your Message</p>
                    <Input
                      as="textarea"
                      rows={6}
                      placeholder="Message..."
                      onChange={(value) => handleChange("message", value)}
                    />
                  </label>
                  <label>
                    <p>Screenshot (Optional)</p>
                    <Input type="file" rows={6} />
                  </label>
                  <label>
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
    </>
  );
}
