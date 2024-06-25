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

    await Todos.create({
      taskName: taskName,
      completed: false,
    });

    res.status(200).json({
      message: "Data uploaded Successfully",
    });
  } catch (err) {
    res.status(404).json(err);
  }
});

// to delete a todo of specifc ID
app.delete("/todos/:id", async (req, res) => {
  try {
    const delId = req.params.id;
    
    // check for Id type, if it is correct then delete else leave
    if(!mongoose.Types.ObjectId.isValid(delId)){
        return res.status(404).json({
            message : "ID format is not correct"
        })
    }

    const res = await Todos.findByIdAndDelete(delId);

    if (res) {
      res.status(200).json({
        message: `The data with ${id} has been deleted successfully!!!`,
      });
    } else {
      return res.status(404).json({
        message: "There is some issue with the ID",
      });
    }
  } catch (err) {
    res.status(404).json({ message: "Some error" });
  }
});

// addding a global catch
app.use((err, req, res, next) => {
  res.status(404).json({
    message: err,
  });
});

app.listen(process.env.PORT);
