import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";

const InputData = ({ setIsModalOpen,reload }) => {
  const [data, setData] = useState({
    title: "",
    desc: "",
  });

  const baseUrl = 'http://localhost:1000/api/v2';

  const handleData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const headers = {
    id: localStorage.getItem("id"),
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const submitData = async (e) => {
    e.preventDefault();

    if (data.title === "" || data.desc === "") {
      alert("Title and description are required!");
      return;
    }

    if (!headers.id || !headers.Authorization) {
      alert("Authorization failed. Please login again.");
      return;
    }

    try {
      const res = await fetch(`${baseUrl}/create-task`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body: JSON.stringify(data),
      });

      const resData = await res.json();

      if (res.ok) {
        setIsModalOpen(false);
        reload();
        setData({
          title: "",
          desc: "",
        });
      } else {
       
      }
    } catch (error) {
      console.error("Error creating task:", error);
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
            placeholder="Description..."
            className="px-3 py-2 rounded w-full bg-gray-700 my-3"
            value={data.desc}
          ></textarea>

          <button
            type="submit"
            className="px-3 py-2 bg-blue-400 rounded text-black text-xl font-semibold"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default InputData;
