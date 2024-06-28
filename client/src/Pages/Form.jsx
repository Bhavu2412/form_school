import React, { useState } from "react";
import { Input, RadioGroup, Checkbox, Radio, Loader } from "rsuite";
import { Modal } from "rsuite";
import Lottie from "lottie-react";
import animationData from "../assets/Animation - 1718780730340.json";
import axios from "axios";
export default function Form() {
  const [code, setCode] = useState(null);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const [display, setDisplay] = useState(true);
  const [data, setData] = useState(null);
  const [answers, setAnswers] = useState([]);
  function handleChange(value) {
    setCode(value);
  }
  async function handleSubmit() {
    setDisplay(false);
    try {
      const response = await axios.post(
        "http://localhost:8080/client/fetch",
        {
          code: code,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setData({
        name: response.data.form.name,
        description: response.data.form.description,
        questions: response.data.form.questions,
      });
    } catch (err) {
      alert("Error: " + err.response.data.message);
      setDisplay(true);
    }
  }
  async function handleFormSubmit() {
    try {
      const response = await axios.post(
        "http://localhost:8080/client/fill",
        {
          code: code,
          answers: answers,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setOpen(true);
    } catch (err) {
      alert("Error: " + err.response.data.message);
    }
  }
  function handleRadioButton(index, value) {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  }
  return (
    <>
      {display && (
        <div className="w-screen bg-gray-200 p-6 flex items-center justify-center">
          <div className="bg-white w-[30%] p-3 rounded-lg">
            <p className="font-Link">To start test,</p>
            <label className="space-y-2">
              <p className="font-General">Enter code:</p>
              <Input
                type="text"
                onChange={(value) => {
                  handleChange(value);
                }}
              />
              <button
                className=" btn btn-join bg-blue-400"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </label>
          </div>
        </div>
      )}
      {data ? (
        <div className=" bg-white  w-full bg-grid-black/[0.1] relative flex items-center justify-center">
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-white  [mask-image:radial-gradient(ellipse_at_center,transparent_40%,black)]"></div>
          <div className="flex flex-col items-center justify-center m-10 p-10 w-screen">
            {data ? (
              <>
                <h1 className="font-Cursive">{data.name}</h1>
                <h4 className="font-Link">{data.description}</h4>
              </>
            ) : (
              <>
                <h1 className="font-Cursive">Form</h1>
                <h4 className="font-Link">Description</h4>
              </>
            )}
            <div className="m-5 p-5 flex space-y-10 flex-col bg-gray-200 w-[80%] rounded-3xl">
              {data.questions.map((que, index) => (
                <label key={index}>
                  <p>{que.question}</p>
                  <RadioGroup
                    name={`radio-group-${index}`}
                    onChange={(value) => handleRadioButton(index, value)}
                  >
                    {que.options.map((opt, optIndex) => (
                      <Radio key={optIndex} value={opt}>
                        {opt}
                      </Radio>
                    ))}
                  </RadioGroup>
                </label>
              ))}
              <div className="flex flex-row items-center justify-between">
                <div className="flex flex-col m-4">
                  <Checkbox>
                    By submitting this form, I agree to comply with all
                    specified terms and conditions.
                  </Checkbox>
                  <Checkbox>
                    I agree with the terms and conditions outlined for using
                    this form.
                  </Checkbox>
                </div>
                <button
                  className="btn btn-join bg-blue-400 m-10"
                  onClick={handleFormSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        !display && (
          <div className="flex items-center justify-center h-[90vh] w-screen">
            <Loader content="Loading form..." />
          </div>
        )
      )}
      <Modal open={open} onClose={handleClose}>
        <Modal.Body>
          <Lottie animationData={animationData} loop={false} className="h-56" />
        </Modal.Body>
      </Modal>
    </>
  );
}
