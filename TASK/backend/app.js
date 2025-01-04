const express = require("express");
const app = express();
require("dotenv").config();
require("./conn/conn.js");
const cors = require("cors");
const TaskAPI = require("./routes/task");
const UserAPI = require("./routes/user");

app.use(cors());
app.use(express.json());

app.use("/api/v2", TaskAPI);
app.use("/api/v1", UserAPI);

app.use("/", (req, res) => {
  res.json({ message: "Welcome to the Task Manager API" });
});

const PORT = 1000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
