const router = require("express").Router();
const Task = require("../models/task");
const User = require("../models/user");
const { authenticateToken } = require("./auth");

router.post("/create-task", authenticateToken, async (req, res) => {
  try {
    const { title, desc } = req.body;
    const  id  = req.headers.id;

    console.log('user id : ',id)
    
    const newTask = new Task({ title: title, desc: desc });
    const saveTask = await newTask.save();
    const taskId = saveTask._id;
    await User.findByIdAndUpdate(id, { $push: { tasks: taskId } });
    res.status(200).json({ message: "Task saved successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Server error" });
  }
});


router.get("/get-all-tasks", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await User.findById(id).populate({
      path: "tasks",
      options: { sort: { createdAt: -1 } },
    });
    res.status(200).json({ msg:'success',data: userData });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "internal server error" });
  }
});

router.delete("/delete-tasks/:id", authenticateToken, async (req, res) => {
  try {
    console.log("delet");
    const { id } = req.params;
    const userId = req.header.id;
    await Task.findByIdAndDelete(id);
    await User.findByIdAndUpdate(userId, { $pull: { tasks: id } });
    res.status(200).json({ message: "task deleteed successfully" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "internal server error" });
  }
});

router.put("/update-task/:id", authenticateToken, async (req, res) => {
  try {
    console.log('inside update function!')
    const { id } = req.params;

    const { title, desc } = req.body;
    await Task.findByIdAndUpdate(id, { title: title, desc: desc });
    res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Internal Server Error" });
  }
});

router.put("/update-imp-task/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const TaskData = await Task.findById(id);
    const ImpTask = TaskData.important;
    await Task.findByIdAndUpdate(id, { important: !ImpTask });
    res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Internal Server Error" });
  }
});

router.put("/update-complete-task/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const TaskData = await Task.findById(id);
    const CompleteTask = TaskData.complete;
    await Task.findByIdAndUpdate(id, { complete: !CompleteTask });
    res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Internal Server Error" });
  }
});

router.get("/get-imp-tasks", authenticateToken, async (req, res) => {
  try {
    console.log('inside get imp tasks')
    const { id } = req.headers;

    const Data = await User.findById(id).populate({
      path: "tasks",
      match: { important: true },
      options: { sort: { createdAt: -1 } },
    });

    const ImpTaskData = Data.tasks;

    res.status(200).json({ data: ImpTaskData });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Internal Server Error" });
  }
});

router.get("/get-complete-tasks", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers; // Extract user ID from headers
    const Data = await User.findById(id).populate({
      path: "tasks",
      match: { complete: true }, // Filter only completed tasks
      options: { sort: { createdAt: -1 } }, // Sort by creation date in descending order
    });

    const CompTaskData = Data.tasks; // Extract completed tasks
    res.status(200).json({ data: CompTaskData }); // Send response with task data
  } catch (error) {
    console.log(error); // Log error for debugging
    res.status(400).json({ message: "Internal Server Error" }); // Handle server errors
  }
});

router.get("/get-incomplete-tasks", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const Data = await User.findById(id).populate({
      path: "tasks",
      match: { complete: false }, // Filter only incompleted tasks
      options: { sort: { createdAt: -1 } },
    });

    const CompTaskData = Data.tasks;
    res.status(200).json({ data: CompTaskData });
  } catch (error) {
    console.log(error); // Log error for debugging
    res.status(400).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
