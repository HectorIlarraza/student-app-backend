const express = require("express");
const controller = express.Router();

const {repeatNTimesWithSpace, captializeFirstLetter} = require("../utils/stringUtils");

controller.get("/capitalizeName/:name/", (req, res) => {
    try{
        // get name
        const name = req.params.name;

        // get capitalizeName
        const capitalizeName = captializeFirstLetter(name);

        // send string res of result
        res.send(capitalizeName);

    }catch(err){
        res.send("There was an error.");
    }
});

controller.get("/:name/:times", (req, res) => {
    try{
        // get name
        const name = req.params.name;

        // get times
        const times = req.params.times;

        // get results of repeatNTimesWithSpace
        const repeatedNames = repeatNTimesWithSpace(name, times);

        // send string res of result
        res.send(repeatedNames);

    }catch(err){
        res.send("There was an error.");
    }
});


module.exports = controller;