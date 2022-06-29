// import code for express
const express = require("express");
const cors = require('cors')

// intialize app
const app = express();

const studentsController = require("./controllers/studentsController");
const namesController = require("./controllers/namesController");

app.use(cors());
app.use("/students", studentsController);
app.use("/names", namesController)

// route
app.get('/', (req, res) => {
    res.send("Hello World!");
})

// export app
module.exports = app;