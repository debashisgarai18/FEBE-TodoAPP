const mongoose = require("mongoose");
require('dotenv').config();

const mongo_url = process.env.MONGO_URL;

// to connect to MongoDB
mongoose.connect(mongo_url);
// to define the schema
const TodoSchema = new mongoose.Schema({
    taskName : String,
    description : String,
    completed : Boolean
});

const Todos = mongoose.model('Todos', TodoSchema)

module.exports = {Todos};