const express = require("express");
const controller = express.Router();
const studentData = require("../studentData.json");
const db = require("../db/index");

controller.get("/", async (req, res) => {

    // let {limit=25} = req.query;
    let {limit=25, min, max} = req.query;

    limit = Number(limit);

    // let studentDataForDevlivery = {...studentData};
    const studentDataForDelivery = await db.any("SELECT * FROM students");

    studentDataForDelivery.students = studentData.students.slice(0, limit);

    res.json(studentDataForDelivery);

    // SELECT * FROM students
    // if(!min && !max){
        // SELECT * FROM students LIMIT $1, [limit]
    // }else{
        // SELECT * FROM students WHERE id >= 1$ AND id <= $2 LIMIT $3, [min, max, limit]
    // }

});

// write a route that accepts a student id a part of the path
// returning an object (JSON), representing the student with that id

controller.get("/:id", async (req, res) => {
    const studentId = req.params.id;

    try {
        if(!/[0-9]/.test(studentId)){
            res.send("Student id must be a number.")
            return;
        }

        const singleStudent = await db.oneOrNone("SELECT * FROM students WHERE id=$1", [studentId]);
    
        if(singleStudent){
            res.json(singleStudent);
        }else{
            res.send("Student not found");
        };    

    } catch (err) {
        res.status(500).send("An error occurred");
    }
});

controller.get("/:id/grades", async (req, res) => {

    try{
        const studentId = req.params.id;

        const grades = await db.any("SELECT * FROM grades WHERE student_id = $1", [studentId]);

        grades.sort((a,b) => a.date - b.date);

        res.json(grades);
        
    }catch(err){
        res.status(500).send(err);
    }
})

module.exports = controller;