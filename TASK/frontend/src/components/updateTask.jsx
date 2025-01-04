import React, { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import { updateTask } from "../apis/api";

const UpdateTaskForm = ({ setIsModalOpen, id, title, desc, reload }) => {
  const [data, setData] = useState({
    title: title || "",
    desc: desc || "",
  });

  const handleData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitData = async (e) => {
    e.preventDefault();

    if (data.title === "" || data.desc === "") {
      alert("Title and description are required!");
      return;
    }

    try {
      // Call the update task function from the api
      const updatedTask = await updateTask(id, data);

      setIsModalOpen(false);
      reload();
    } catch (error) {

      console.log(error);
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 bg-gray-800 opacity-50 h-screen w-full"></div>

      <form
        onSubmit={submitData}
        className="fixed top-0 left-0 flex items-center justify-center h-screen w-full"
      >
        <div className="w-2/6 bg-gray-900 p-4 rounded">
          <div className="flex justify-end">
            <button
              type="button"
              className="text-2xl"
              onClick={() => setIsModalOpen(false)}
            >
              <RxCross2 />
            </button>
          </div>

          <input
            type="text"
            placeholder="Title"
            className="px-3 py-2 rounded w-full bg-gray-700 my-3"
            name="title"
            value={data.title}
            onChange={handleData}
          />
          <textarea
            onChange={handleData}
            name="desc"
            cols="30"
            rows="10"
            placeholder="desc..."
            className="px-3 py-2 rounded w-full bg-gray-700 my-3"
            value={data.desc}
          ></textarea>

          <button
            type="submit"
            className="px-3 py-2 bg-blue-400 rounded text-black text-xl font-semibold"
          >
            Edit
          </button>
        </div>
      </form>
    </>
  );
};

export default UpdateTaskForm;
