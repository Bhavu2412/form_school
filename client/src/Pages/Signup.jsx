import ani from "../assets/Animation - 1718863803885.json";
import { Radio, RadioGroup } from "rsuite";
import Lottie from "lottie-react";
import React, { useState, useEffect } from "react";
import { Input, InputGroup } from "rsuite";
import EyeIcon from "@rsuite/icons/legacy/Eye";
import EyeSlashIcon from "@rsuite/icons/legacy/EyeSlash";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function Signup() {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    username: "",
    imgFile: "",
    profession: "",
  });
  const [visible, setVisible] = React.useState(false);
  const handleRoleChange = (value) => {
    setRole(value);
  };
  const handleVisibilityChange = () => {
    setVisible(!visible);
  };
  function handleFileChange(e) {
    setData({ ...data, imgFile: e.target.files[0] });
  }
  function handleChange(name, value) {
    setData({ ...data, [name]: value });
  }
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("username", data.username);
    formData.append("profession", data.profession);
    formData.append("image", data.imgFile);

    try {
      let response;
      if (role === "client") {
        response = await axios.post(
          `http://localhost:8080/client/signup`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
      } else if (role === "user") {
        response = await axios.post(
          `http://localhost:8080/user/signup`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
      } else {
        alert("Select your role");
        return;
      }
      alert(response.data.message);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("image", response.data.imageUrl);
      localStorage.setItem("role", response.data.userRole);
      localStorage.setItem("name", data.name);
      localStorage.setItem("email", data.email);
      setData({
        name: "",
        email: "",
        password: "",
        username: "",
        imgFile: "",
        profession: "",
      });
      navigate("/");
    } catch (err) {
      alert("Error occurred: " + err.response.data.message);
    }
  };

  return (
    <>
      <div className="h-[100vh] w-screen flex items-center justify-center ">
        <div className="bg-contactGradient h-[95%] w-[90%] space-y-2 rounded-3xl p-10 text-blue-100 flex flex-row justify-start items-center">
          <div className="text-blue-100 flex flex-col justify-center items-start">
            <div className="space-y-2">
              <h3 className="font-others">Start for Free</h3>
              <div>
                <h1 className="font-Cursive">Create new Account</h1>
                <div className="flex flex-row space-x-2 font-General">
                  <h5>Already a member?</h5>
                  <h5>
                    <a href="/login" className="color-blue-700">
                      Login
                    </a>
                  </h5>
                </div>
              </div>
            </div>
            <div className="mt-4 space-y-4 font-General">
              <label>
                <p>You are :</p>
                <RadioGroup
                  name="role"
                  inline
                  defaultValue=""
                  value={role}
                  onChange={handleRoleChange}
                >
                  <Radio value="user">Creator</Radio>
                  <Radio value="client">User</Radio>
                </RadioGroup>
              </label>
              {role === "user" && (
                <label>
                  <p>Are you :</p>
                  <RadioGroup
                    name="role"
                    inline
                    defaultValue=""
                    value={data.profession}
                    onChange={(value) => handleChange("profession", value)}
                  >
                    <Radio value="user">Teacher</Radio>
                    <Radio value="HR">Hr</Radio>
                    <Radio value="others">Other</Radio>
                  </RadioGroup>
                </label>
              )}
              <div className="w-[100%]">
                <label>
                  <p>Your Name</p>
                  <Input
                    type="text"
                    name="name"
                    value={data.name}
                    onChange={(value) => handleChange("name", value)}
                  />
                </label>
              </div>
              <div className="flex flex-row space-x-4">
                <label>
                  <p>Your Email</p>
                  <Input
                    type="text"
                    name="email"
                    value={data.email}
                    onChange={(value) => handleChange("email", value)}
                  />
                </label>
                <label>
                  <p>Your Username</p>
                  <Input
                    type="text"
                    name="username"
                    value={data.username}
                    onChange={(value) => handleChange("username", value)}
                  />
                </label>
              </div>
              <div className="w-[100%]">
                <label>
                  <p>Your Password</p>
                  <InputGroup inside>
                    <Input
                      type={visible ? "text" : "password"}
                      value={data.password}
                      onChange={(value) => handleChange("password", value)}
                    />
                    <InputGroup.Button onClick={handleVisibilityChange}>
                      {visible ? <EyeIcon /> : <EyeSlashIcon />}
                    </InputGroup.Button>
                  </InputGroup>
                </label>
              </div>
              <div>
                <label>
                  <p>Your photo</p>
                  <input
                    type="file"
                    className="bg-white w-[100%] text-black p-1 rounded-md"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
              <div>
                <button
                  className="bg-blue-400 btn-join font-General"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Lottie
              animationData={ani}
              loop={true}
              className="w-[75%] flex items-center justify-center"
            />
          </div>
        </div>
      </div>
    </>
  );
}
