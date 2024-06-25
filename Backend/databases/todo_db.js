const mongoose = require("mongoose");

// to connect to MongoDB
mongoose.connect("mongodb+srv://dg18:Iamajettsimp69@todocluster01.7uz2sce.mongodb.net/todoList");
// to define the schema
const TodoSchema = new mongoose.Schema({
    taskName : String, 
    completed : Boolean
});

const Todos = mongoose.model('Todos', TodoSchema)

module.exports = {Todos};