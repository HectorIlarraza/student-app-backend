const express = require("express");
const controller = express.Router();
const studentData = require("../studentData.json");
const db = require("../db/index");

controller.get("/", async (req, res) => {

    let {limit=25, min, max} = req.query;

    limit = Number(limit);

    // let studentDataForDevlivery = {...studentData};
    const studentDataForDelivery = await db.any("SELECT * FROM students");

    studentDataForDelivery.students = studentData.students.slice(0, limit);

    res.json(studentDataForDelivery);

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

        const grades = await db.any("SELECT * FROM grades WHERE student_id=$1", [studentId]);

        grades.sort((a,b) => a.date - b.date);

        res.json(grades);
        
    }catch(err){
        res.status(500).send(err);
    }
});

controller.post("/", async (req, res) => {
    
    try {
        
        // get new student body
        const {firstname, lastname, company, city, skill, pic, email} = req.body;

        // save student to db
        const student = await db.one("INSERT INTO students (firstname, lastname, company, email, city, skill, pic) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *", 
        [firstname, lastname, company, email, city, skill, pic]);

        // send a json response returning the new student
        res.json(student);

    } catch (err) {
        console.log(err)
        res.status(500).send(err);
    }
});

controller.put("/:id", async (req,res) => {
    try {
        const studentId = req.params.id;

        const {firstname, lastname, email, company, city, skill, pic} = req.body;

        const updatedUser = await db.one("UPDATE students SET firstname=$1, lastname=$2, email=$3, company=$4, city=$5, skill=$6, pic=$7 WHERE id=$8 RETURNING *", 
        [firstname, lastname, email, company, city, skill, pic, studentId]);

        res.json(updatedUser);

    } catch (err) {
        console.log(err)
        res.status(500).send(err);
    }
});

controller.delete("/:id", async (req,res) => {
    try {
        const studentId = req.params.id;

        await db.none("DELETE FROM grades WHERE student_id = $1", [studentId]);

        const deletedStudent = await db.one("DELETE FROM students WHERE id = $1 RETURNING *", [studentId]);

        res.json(deletedStudent);

    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = controller;