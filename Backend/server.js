const express = require("express");
const cors = require("cors");
const app = express();

// middlewares
app.use(express.json());
app.use(cors());

const dummyTodo = [
    {
        id: 1,
        task : "Do BTrees",
        completed : false
    },
    {
        id: 2,
        task : "Do Gym",
        completed : false
    },
    {
        id: 3,
        task : "Do Graphs",
        completed : false
    },
    {
        id: 4,
        task : "Do React",
        completed : false
    },
    {
        id: 5,
        task : "Do TypeScript",
        completed : false
    },
    {
        id: 6,
        task : "Do JS",
        completed : false
    },
]

app.get("/todos", (req, res) => {
    res.status(200).json(dummyTodo);
})

app.post("/todos", (req, res) => {
    try{

        const taskId = req.body.id
        const taskName = req.body.task;
        const taskComp = req.body.completed;
        
        const addTask = {
            id : taskId,
            task : taskName,
            completed : taskComp
        }
        
        dummyTodo.push(addTask);

        res.status(200).json({
            message : "Data pushed Successfully",
        })
    }
    catch(err){
        res.status(404).json(err);
    }
})

// addding a global catch
app.use((err, req, res, next) => {
    res.status(404).json({
        message : err
    })
})

app.listen(3000);