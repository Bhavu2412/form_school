import { Button } from "rsuite";
import { Radio, RadioGroup } from "rsuite";
import ani from "../assets/Animation - 1718863803885.json";
import Lottie from "lottie-react";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSlack } from "@fortawesome/free-brands-svg-icons";
import { Input, InputGroup } from "rsuite";
import EyeIcon from "@rsuite/icons/legacy/Eye";
import EyeSlashIcon from "@rsuite/icons/legacy/EyeSlash";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({ username: "", password: "" });
  const [role, setRole] = useState("");
  const [visible, setVisible] = useState(false);
  const handleRoleChange = (value) => {
    setRole(value);
  };
  const handleVisibilityChange = () => {
    setVisible(!visible);
  };
  function handleChange(name, value) {
    setData({ ...data, [name]: value });
  }
  async function handleSubmit() {
    try {
      let response;
      if (role === "client") {
        response = await axios.post(
          `${process.env.REACT_APP_URL_HOST}/client/login`,
          data
        );
      } else if (role === "user") {
        response = await axios.post(
          `${process.env.REACT_APP_URL_HOST}/user/login`,
          data
        );
      } else if (role === "admin") {
        response = await axios.post(
          `${process.env.REACT_APP_URL_HOST}/admin/login`,
          data
        );
      } else {
        alert("Select your role");
        return;
      }
      alert(response.data.message);
      // console.log(response.data);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("image", response.data.ImageUrl);
      localStorage.setItem("role", role);
      localStorage.setItem("name", response.data.user);
      localStorage.setItem("email", response.data.email);
      setData({ username: "", password: "" });
      navigate("/");
    } catch (err) {
      alert(err.response.data.message);
    }
  }
  return (
    <>
      <div className="h-[180%] md:h-[100vh] w-screen flex items-center justify-center ">
        <div className="bg-contactGradient my-10 h-[90%] md:h-[90%] w-[90%] space-x-2 md:space-y-2 rounded-3xl p-10 text-blue-100 flex flex-col md:flex-row justify-start items-center">
          <div className="text-blue-100 flex-col justify-center items-center md:items-start w-[60%]">
            <div className="flex flex-col items-center md:items-start space-y-4">
              <FontAwesomeIcon
                className="h-12 md:h-32"
                icon={faSlack}
                style={{ color: "#63E6BE" }}
              />
              <h1 className="font-Cursive">Welcome</h1>
              <div className="font-Link">
                <h6>Enter Credentials.</h6>
                <h6>Your privacy is our responsibility.</h6>
                <div className="flex flex-row space-x-1">
                  <h6>Don't have an account?</h6>
                  <h6>
                    <a href="/signup" className="color-blue-700">
                      Signup
                    </a>
                  </h6>
                </div>
              </div>
            </div>
            <div className="mt-4 flex flex-col space-y-4 w-[100%] items-center justify-center md:items-start md:w-[60%] font-General">
              <label>
                <p>You are :</p>
                <RadioGroup
                  name="role"
                  inline
                  defaultValue=""
                  value={role}
                  onChange={handleRoleChange}
                  required
                >
                  <Radio value="user">Creator</Radio>
                  <Radio value="client">User</Radio>
                  <Radio value="admin">Admin</Radio>
                </RadioGroup>
              </label>
              <label>
                <p>Your Email</p>
                <Input
                  required
                  type="text"
                  name="username"
                  value={data.username}
                  onChange={(value) => handleChange("username", value)}
                />
              </label>
              <label>
                <p>Your Password</p>
                <InputGroup inside>
                  <Input
                    required
                    type={visible ? "text" : "password"}
                    value={data.password}
                    onChange={(value) => handleChange("password", value)}
                  />
                  <InputGroup.Button onClick={handleVisibilityChange}>
                    {visible ? <EyeIcon /> : <EyeSlashIcon />}
                  </InputGroup.Button>
                </InputGroup>
              </label>
              <div>
                <button className="bg-blue-400 btn-join" onClick={handleSubmit}>
                  Submit
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center m-5">
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
