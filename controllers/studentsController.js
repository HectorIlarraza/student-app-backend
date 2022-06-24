const express = require("express");
const controller = express.Router();

const studentData = require("../studentData.json");

controller.get("/", (req, res) => {

    let {limit=25} = req.query;
    // let {limit=25, min, max} = req.query;

    limit = Number(limit);

    let studentDataForDevlivery = {...studentData};

    studentDataForDevlivery.students = studentData.students.slice(0, limit);

    res.json(studentDataForDevlivery);

    // SELECT * FROM students
    // if(!min && !max){
        // SELECT * FROM students LIMIT $1, [limit]
    // }else{
        // SELECT * FROM students WHERE id >= 1$ AND id <= $2 LIMIT $3, [min, max, limit]
    // }


});

// write a route that accepts a student id a part of the path
// returning an object (JSON), representing the student with that id

controller.get("/:id", (req, res) => {
    const id = req.params.id;

    try {
        if(!/[0-9]/.test(id)){
            res.send("Student id must be a number.")
            return;
        }
        const singleStudent = studentData.students.find(student => {
            return student.id === id;
        });
    
        console.log(singleStudent);
        if(singleStudent){
            res.json({singleStudent});
        }else{
            res.send("Student not found");
        };    

    } catch (err) {
        res.status(500).send("An error occurred");
    }
});


module.exports = controller;