import React, { useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import axios from "axios";
import img from "../img/img1.gif"
import { AiOutlineMenu } from 'react-icons/ai';
const Form = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form with data: ", input);
    try {
      const { data } = await axios.post(
        "http://localhost:8800/tasks",
        input
      );
      console.log("Server response: ", data);
      if (data?.status) {
        window.alert("Task Created");
      }
    } catch (error) {
      window.alert(error.response.data.message);
    }
  };

  const handleInputChange = (e) => {
    setInput((prevInput) => ({
      ...prevInput,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="  ">
       <div className="bg-black flex p-5 font-bold text-white">
      <div className="icon-white text-2xl px-2"><AiOutlineMenu /></div>
      <h1 className="text-xl">Notes</h1>
    </div>
      <div className="flex bg-violet-400 justify-center py-5">
      <div className="w-80 h-70 px-5">
      <img src={img} alt="" className="max-w-full max-h-full object-contain" />
      </div>

  <div className="flex rounded-md flex-col items-center bg-gray-200 border-double bottom-2 p-5">
    <h1 className="font-bold mb-4">TASK</h1>
    <input
      className="bg-blue-400 p-2 text-black-900 font-bold placeholder-white mb-2"
      placeholder="Title"
      name="title"
      value={input.title}
      onChange={handleInputChange}
    />
    <input
      className="bg-red-400 p-2 text-black-900 font-bold placeholder-white mb-2"
      placeholder="Description"
      name="description"
      value={input.description}
      onChange={handleInputChange}
    />
    <button className="border-4 p-2 border-black-400 bg-gray-400" type="submit">
      <AiOutlineCheck />
    </button>
  </div>
  </div>
</form>


  );
};

export default Form;
