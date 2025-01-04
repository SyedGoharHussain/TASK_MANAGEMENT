import React, { useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { IoAddCircleSharp } from "react-icons/io5";
import { ImCross } from "react-icons/im";

import UpdateTaskForm from "./updateTask";

import { deleteTask, updateImpTask, updateCompleteTask } from "../apis/api";

const Cards = ({ home, id, title, desc, status, important, reload }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div>
      {/* Conditional Modal for Adding Tasks */}
      {isFormOpen && (
        <UpdateTaskForm
          setIsModalOpen={setIsFormOpen}
          id={id}
          title={title}
          desc={desc}
          reload={reload}
        />
      )}
      <div className="flex flex-col justify-between bg-gray-800 rounded-sm p-4">
        {/* Task Details */}
        <div>
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-gray-300 my-2">{desc}</p>
        </div>

        {/* Task Actions */}
        <div className="mt-4 w-full flex items-center">
          <button
            className={`${
              status === "Incomplete" ? "bg-red-400" : "bg-green-700"
            } p-2 rounded w-3/6`}
          >
            {status}
          </button>
          <div className="text-white p-2 w-3/6 text-2xl font-semibold flex justify-around">
            <button
              onClick={async () => {
                await updateImpTask(id);
                reload();
              }}
            >
              {important ? <FaHeart /> : <CiHeart />}
            </button>

            <button
              onClick={() => {
                setIsFormOpen(true);
              }}
            >
              <FaEdit />
            </button>
            <button
              onClick={async () => {
                await deleteTask(id);
                reload();
              }}
            >
              <MdDelete />
            </button>
            <button
              onClick={async () => {
                await updateCompleteTask(id);
                reload();
              }}
            >
              {status === "Incomplete" ? <TiTick /> : <ImCross />}
            </button>
          </div>
        </div>

        {/* Add Task Button */}
        {home === "true" && (
          <button
            className="flex flex-col justify-center items-center bg-gray-800 rounded-sm p-4 text-gray-300 hover:scale-105 hover:cursor-pointer transition-all duration-300"
            onClick={() => setIsInputOpen(true)} // Updated to match prop
          >
            <IoAddCircleSharp className="text-5xl" />
            <h2 className="text-2xl mt-4">Add Task</h2>
          </button>
        )}
      </div>
    </div>
  );
};

export default Cards;
