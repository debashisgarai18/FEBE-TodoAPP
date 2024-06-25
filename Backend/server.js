const express = require("express");
const cors = require("cors");
const { Todos } = require("./databases/todo_db");
const app = express();


// middlewares 
app.use(express.json());
app.use(cors());

const dummyTodo = [];

app.get("/todos", async (req, res) => {
    const data = await Todos.find({});
    res.status(200).json(data);
})

app.post("/todos", async (req, res) => {
    try{
        const taskName = req.body.task;
        
        
        await Todos.create({
            taskName : taskName, 
            completed : false
        })

        res.status(200).json({
            message : "Data uploaded Successfully",
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