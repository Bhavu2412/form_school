import React, { useState, useEffect } from "react";
import {
  Input,
  Button,
  RadioGroup,
  Checkbox,
  Radio,
  Divider,
  IconButton,
} from "rsuite";
import { Modal, ButtonToolbar, Placeholder } from "rsuite";
import {
  faTrashAlt,
  faEdit,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

export default function Form() {
  const navigate = useNavigate();
  const [queCounter, setQueCounter] = useState(0);
  const [option, setOption] = useState("");
  const [options, setOptions] = useState([]);
  const [que, setQue] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
    navigate("/");
  };
  const [code, setCode] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    questions: [],
  });

  function handleAddQuestion() {
    if (que.trim() === "") {
      alert("Please enter a question text.");
      return;
    }
    const newQuestion = {
      id: queCounter,
      question: que,
      options: [...options.filter((opt) => opt !== ""), option].filter(
        (opt) => opt !== ""
      ),
    };
    setData((prevData) => ({
      ...prevData,
      questions: [...prevData.questions, newQuestion],
    }));
    setQueCounter((prevCounter) => prevCounter + 1);
    setQue("");
    setOptions([]);
    setOption("");
  }

  function handleChange(name, value) {
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleOptionChange(value) {
    setOption(value);
  }

  function handleQuestionChange(value) {
    setQue(value);
  }

  function handleDeleteQuestion(id) {
    setData((prevData) => ({
      ...prevData,
      questions: prevData.questions.filter((q) => q.id !== id),
    }));
  }

  function handleEditQuestion(id, newQuestion) {
    setData((prevData) => ({
      ...prevData,
      questions: prevData.questions.map((q) =>
        q.id === id ? { ...q, question: newQuestion } : q
      ),
    }));
  }

  function handleEditOption(questionId, optionIndex, newOption) {
    setData((prevData) => ({
      ...prevData,
      questions: prevData.questions.map((q) => {
        if (q.id === questionId) {
          const updatedOptions = q.options.map((opt, index) =>
            index === optionIndex ? newOption : opt
          );
          return { ...q, options: updatedOptions };
        }
        return q;
      }),
    }));
  }

  async function handleSubmit() {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_URL_HOST}/fowrm/create`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setCode(response.data.code);
      setOpen(true);
      setData({ name: "", description: "", questions: [] });
    } catch (err) {
      console.log("Error: ", err);
    }
  }

  function handleAddClick() {
    if (option.trim() === "") {
      alert("Please enter an option text.");
      return;
    }

    setOptions([...options, option]);
    setOption("");
  }

  // useEffect(() => {
  //   console.log(data);
  //   console.log(options);
  // }, [data, options]);

  return (
    <>
      <div className=" bg-white  w-full bg-grid-black/[0.1] relative flex items-center justify-center">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-white  [mask-image:radial-gradient(ellipse_at_center,transparent_40%,black)]"></div>
        <div className="flex flex-col items-center justify-center m-10 p-10 w-screen">
          <h1 className="font-Cursive text-8xl">FormsPro</h1>
          <h1 className="font-Link text-2xl">Create your form here</h1>
          <div className="m-5 p-5 flex space-y-10 flex-col bg-gray-200 w-[80%] rounded-3xl font-General">
            <label className="w-[50%]">
              <p>Enter Form name:</p>
              <Input
                type="text"
                className="w-48"
                value={data.name}
                onChange={(value) => handleChange("name", value)}
              />
            </label>
            <label className="w-[50%]">
              <p>Enter Description:</p>
              <Input
                type="text"
                value={data.description}
                className="w-48"
                onChange={(value) => handleChange("description", value)}
              />
            </label>

            <div className="bg-white w-[50%] p-4 rounded-lg">
              {data.questions.length === 0 ? (
                <div className="flex flex-col items-center justify-center space-y-2 m-3">
                  <FontAwesomeIcon icon={faSearch} />

                  <p className="font-General">No questions found to display</p>
                </div>
              ) : (
                data.questions.map((question) => (
                  <div key={question.id} className="mt-2 pl-2">
                    <div className="flex flex-row items-center justify-between">
                      <p>- {question.question}</p>
                      <div className="flex mt-2">
                        <IconButton
                          icon={<FontAwesomeIcon icon={faEdit} />}
                          appearance="primary"
                          size="xs"
                          onClick={() => {
                            const editedQuestion = prompt(
                              "Enter the edited question:",
                              question.question
                            );
                            if (editedQuestion !== null) {
                              handleEditQuestion(question.id, editedQuestion);
                            }
                          }}
                        />
                        <IconButton
                          icon={<FontAwesomeIcon icon={faTrashAlt} />}
                          appearance="primary"
                          size="xs"
                          onClick={() => handleDeleteQuestion(question.id)}
                          className="ml-2"
                        />
                      </div>
                    </div>
                    <RadioGroup
                      name={`radio-group-${question.id}`}
                      defaultValue=""
                    >
                      {question.options.map((opt, index) => (
                        <div key={index} className="flex items-center">
                          <Radio value={opt}>{opt}</Radio>
                          <IconButton
                            icon={<FontAwesomeIcon icon={faEdit} />}
                            appearance="link"
                            size="xs"
                            onClick={() => {
                              const editedOption = prompt(
                                "Enter the edited option:",
                                opt
                              );
                              if (editedOption !== null) {
                                handleEditOption(
                                  question.id,
                                  index,
                                  editedOption
                                );
                              }
                            }}
                          />
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                ))
              )}
              <Divider />
              <label>
                <Input
                  placeholder="Enter question"
                  value={que}
                  onChange={(value) => handleQuestionChange(value)}
                />
                <label className="w-[90%]">
                  <RadioGroup name="radio-group" defaultValue="">
                    {options.map((option) => (
                      <Radio className="flex flex-col space-y-3">
                        {option}
                      </Radio>
                    ))}
                    <Radio key={queCounter} value={`Option${queCounter + 1}`}>
                      <Input
                        placeholder={`Option`}
                        onChange={(value) => {
                          handleOptionChange(value);
                        }}
                        size="sm"
                      />
                      <Button className="mt-3" onClick={handleAddClick}>
                        Add Option
                      </Button>
                    </Radio>
                  </RadioGroup>
                </label>
                <label className="flex items-center justify-end">
                  <button
                    className="btn btn-one bg-blue-400 rounded-lg"
                    onClick={handleAddQuestion}
                  >
                    Add Question
                  </button>
                </label>
              </label>
            </div>

            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-col m-4">
                <Checkbox>
                  By submitting this form, I agree to comply with all specified
                  terms and conditions.
                </Checkbox>
                <Checkbox>
                  I agree with the terms and conditions outlined for using this
                  form.
                </Checkbox>
              </div>
              <button
                className="btn btn-join bg-blue-400 m-10"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      <Modal open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title className="font-Cursive text-4xl">FormPro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p></p>
          <p>
            Form created successfully. Please use the code {code} to fill out
            the form.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} appearance="primary">
            Ok
          </Button>
          <Button onClick={handleClose} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
