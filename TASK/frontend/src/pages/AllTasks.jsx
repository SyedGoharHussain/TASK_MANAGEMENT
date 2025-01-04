import React, { useState, useEffect } from "react";
import Cards from "../components/Cards";
import InputData from "../components/InputData";
import { IoAddCircleSharp } from "react-icons/io5";

const AllTasks = () => {
  const [isInputOpen, setIsInputOpen] = useState(false);
  const [tasks, setTasks] = useState([]); // Default to an empty array
  const [loading, setLoading] = useState(false); // Loading state for fetching tasks
  const [refreshPage, setRefreshPage] = useState(false); // State to trigger refresh

  const reload = () => {
    setRefreshPage((prev) => !prev);
  };

  const baseUrl = "http://localhost:1000/api/v2";

  // Fetch tasks from the backend
  const getTasks = async () => {
    setLoading(true); // Start loading

    const header = {
      id: localStorage.getItem("id"),
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    try {
      const res = await fetch(`${baseUrl}/get-all-tasks`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...header,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch tasks");
      }

      const data = await res.json();
      console.log("Fetched tasks:", data);

      setTasks(data.data.tasks);
    } catch (error) {
      setTasks([]); // Set empty tasks array in case of error
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Fetch tasks when the component mounts or when refreshPage changes
  useEffect(() => {
    getTasks();
  }, [refreshPage]); // Re-fetch tasks when refreshPage state changes

  // Handle the task addition and refresh the task list
  const handleTaskAdded = async () => {
    setIsInputOpen(false); // Close the modal
    setRefreshPage((prev) => !prev); // Toggle the refreshPage state to trigger task re-fetch
  };

  // Handle task update (edit)
  const handleTaskUpdated = async () => {
    setRefreshPage((prev) => !prev); 
  };

  // Handle task deletion
  const handleTaskDeleted = async () => {
    setRefreshPage((prev) => !prev); 
  };

  return (
    <div>
      {/* Add Task Button */}
      <div className="w-full flex items-end px-4 py-2">
        <button
          onClick={() => setIsInputOpen(true)}
          className="text-4xl text-gray-400 hover:text-gray-100 transition-all duration-300"
        >
          <IoAddCircleSharp />
        </button>
      </div>

      {/* Display Loading State */}
      {loading && (
        <div className="text-center text-gray-500 py-4">Loading tasks...</div>
      )}

      {/* Display All Tasks */}
      {!loading && tasks.length === 0 && (
        <div className="text-center text-gray-400 py-4">
          No tasks available. Please add a new task.
        </div>
      )}

      {!loading && tasks.length > 0 && (
        <div className="grid grid-cols-3 gap-4 p-4">
          {tasks.map((task) => (
            <Cards
              key={task._id}
              id={task._id}
              title={task.title}
              desc={task.desc}
              status={task.complete ? "Complete" : "Incomplete"}
              important={task.important}
              onTaskUpdated={handleTaskUpdated} 
              onTaskDeleted={handleTaskDeleted} 
              reload={reload}
            />
          ))}
        </div>
      )}

      {/* Conditional Modal for Adding Tasks */}
      {isInputOpen && (
        <InputData
          setIsModalOpen={setIsInputOpen}
          onTaskAdded={handleTaskAdded}
          reload={reload}
        />
      )}
    </div>
  );
};

export default AllTasks;
