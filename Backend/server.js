const express = require("express");
const cors = require("cors");
const { Todos } = require("./databases/todo_db");
const { default: mongoose } = require("mongoose");
const app = express();

// middlewares
app.use(express.json());
app.use(cors());

// to get all the TODOS
app.get("/todos", async (req, res) => {
  const data = await Todos.find({});
  res.status(200).json(data);
});

// to post some todo in the DB
app.post("/todos", async (req, res) => {
  try {
    const taskName = req.body.task;
    const description = req.body.desc;

    await Todos.create({
      taskName: taskName,
      description: description,
      completed: false
    });

    res.status(200).json({
      message: "Data uploaded Successfully",
    });
  } catch (err) {
    res.status(404).json(err);
  }
});

// function to update a todo provided its ID
app.put("/todos/:id", async (req, res) => {
  const updateId = req.params.id;
  const updateTask = req.body.taskName;
  const updateDesc = my

  // check for Id type, if it is correct then delete else leave
  if (!mongoose.Types.ObjectId.isValid(updateId)) {
    return res.status(404).json({
      message: "ID format is not correct",
    });
  }
  const response = await Todos.findByIdAndUpdate(
    { _id: updateId },
    { taskName: updateTask }
  );
  if (response) {
    res.status(200).json({
      message: `The data with ${updateId} is being updated!!`,
    });
  } else {
    res.status(404).json({
      message: "Error! The ID is not found!!",
    });
  }
});

// function to update the todo completion status
app.put("/todos/updateStatus/:id", async (req, res) => {
  const updateId = req.params.id;
  try {
    // check for Id type, if it is correct then delete else leave
    if (!mongoose.Types.ObjectId.isValid(updateId)) {
      return res.status(404).json({
        message: "ID format is not correct",
      });
    }

    const response = await Todos.findByIdAndUpdate(
      { _id: updateId },
      { completed: true }
    );
    if (response) {
      res.status(200).json({
        message: "The todo staus is updated!!",
      });
    } else {
      res.status(404).json({
        message: "There is some issue in updating the status!!",
      });
    }
  } catch (err) {
    res.status(404).json({
      message: "Some error ocurred!!",
    });
  }
});

// to delete a todo of specifc ID
app.delete("/todos/:id", async (req, res) => {
  const delId = req.params.id;

  // check for Id type, if it is correct then delete else leave
  if (!mongoose.Types.ObjectId.isValid(delId)) {
    return res.status(404).json({
      message: "ID format is not correct",
    });
  }

  const response = await Todos.findByIdAndDelete(delId);

  if (response) {
    res.status(200).json({
      message: `The data with ${delId} has been deleted successfully!!!`,
    });
  } else {
    return res.status(404).json({
      message: "There is some issue with the ID",
    });
  }
});

// addding a global catch
app.use((err, req, res, next) => {
  res.status(404).json({
    message: "Some global error ocurred!!",
  });
});

app.listen(process.env.PORT);
