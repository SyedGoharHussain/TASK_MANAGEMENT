import React from "react";
import { Link } from "react-router-dom";
import { CgNotes } from "react-icons/cg";
import { MdLabelImportant } from "react-icons/md";
import { FaCheckDouble } from "react-icons/fa6";
import { TbNotebookOff } from "react-icons/tb";

const Sidebar = () => {
  const data = [
    { title: "All tasks", icon: <CgNotes />, link: "/" },
    {
      title: "Important tasks",
      icon: <MdLabelImportant />,
      link: "/importantTasks",
    },
    {
      title: "Completed tasks",
      icon: <FaCheckDouble />,
      link: "/completedTasks",
    },
    {
      title: "Incompleted tasks",
      icon: <TbNotebookOff />,
      link: "/incompletedTasks",
    },
  ];

  return (
    <div className="h-full flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-semibold">{localStorage.getItem('username')}</h2>
       
        <hr />
      </div>
      <div className="mt-4 flex flex-col pl-2">
        {data.map((item, index) => (
          <Link
            key={index}
            to={item.link}
            className="my-2 flex items-center hover:bg-gray-600 p-2 rounded transition-all duration-300"
          >
            {item.icon} &nbsp; {item.title}
          </Link>
        ))}
      </div>
      <div>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("isLoggedIn");
            window.location.href = "/login";
          }}
          className="bg-yellow-600 w-full p-2 rounded"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
