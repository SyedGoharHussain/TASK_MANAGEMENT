let baseUrl = "http://localhost:1000/api/v2";

const header = {
    id: localStorage.getItem("id"),
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  export const deleteTask = async (id) => {
  try {
    const res = await fetch(`${baseUrl}/delete-tasks/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...header,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to delete task");
    }

    const data = await res.json();
    console.log("Deleted task:", data);
    getTasks();
  } catch (error) {
    console.error("Error deleting task:", error);
  }
};


export const updateTask = async (id, task) => {
  try {
    console.log('task inside update task function:', task);

    const res = await fetch(`${baseUrl}/update-task/${id}`, {  // Ensure route is correct
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...header,
      },
      body: JSON.stringify(task),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to update task");
    }

    const data = await res.json();
    console.log("Updated task:", data);

    // You might want to call a refresh function to get the updated list of tasks
    // e.g. getTasks(); 



  } catch (error) {
    console.error("Error updating task:", error.message);
  }
};

export const updateImpTask = async (id, task) => {
  try {
    const res = await fetch(`${baseUrl}/update-imp-task/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...header,
      },
      body: JSON.stringify(task),
    });

    if (!res.ok) {
      throw new Error("Failed to update task");
    }

    const data = await res.json();
    console.log("Updated task:", data);


  } catch (error) {
    console.error("Error updating task:", error);
  }
};

export const updateCompleteTask = async (id, task) => {
  try {
    const res = await fetch(`${baseUrl}/update-complete-task/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...header,
      },
      body: JSON.stringify(task),
    });

    if (!res.ok) {
      throw new Error("Failed to update task");
    }

    const data = await res.json();
    console.log("Updated task:", data);



  } catch (error) {
    console.error("Error updating task:", error);
  }
};


