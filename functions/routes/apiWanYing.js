const express = require("express");
const router = express.Router();

router.get("/getWorldPopulation", (req, res) => {
  let database = req.app.get("database");
  let worldID = req.query.worldID;
  let userArr = []; // array that contains unique users
  let worldRef = database.ref("Maps").child(worldID); // world pointer

  worldRef.once("value", function(snapshot) {
    let world = snapshot.val(); // list of world objects in json
    Object.keys(world).forEach(section => {
      if (typeof world[section] !== "undefined") {
        let sections = world[section]; // list of sections object in json
        Object.keys(sections).forEach(user => {
          if (userArr.indexOf(user) === -1) {
            // check if the user does not exist in the array
            userArr.push(user); // push the new user into the array
          }
        });
      }
    });
    let payload = { worldPopulation: userArr.length }; // set the world population to the array size
    res.json(payload); // returns the world population
  });
});

router.get("/getLeaderboard", (req, res) => {
  let database = req.app.get("database");
  let worldID = req.query.worldID;
  let worldRef = database.ref("Maps").child(worldID);
  worldRef.once("value", function(snapshot) {
    let world = snapshot.val();
    let dict = {}; // dictionary to store userid: stars

    Object.keys(world).forEach(section => {
      if (typeof world[section] !== "undefined") {
        // check that the section exists
        let sections = world[section]; // section object in json
        Object.keys(sections).forEach(user => {
          if (!(user in dict)) {
            // check for new user
            dict[user] = parseInt(world[section][user]["stars"]); // set the dict's stars of the new user
          } else {
            // existing user
            dict[user] += parseInt(world[section][user]["stars"]); // tally up individual user score achieved in each section
          }
        });
      }
    });
    res.json(dict); // return the userid & their stars achieved
  });
});




//==========Create Assignment Questions==============
router.post("/addAssignmentQuestion", (req, res) => {
  let database = req.app.get("database");
  let request = req.body;
  
  let creator = request.creator;
  let question = request.question;
  let options = request.options;
  let answer = request.answer;
  let players = request.players;

  let databaseRef = database.ref("Assignment");
  databaseRef.push({
    players: players,
    creator: creator,
  });
  databaseRef = databaseRef.child("Questions");
  databaseRef.push({
    question: question,
    options: options,
    answer: answer,
  });
  res.end("Assignment upload complete");
});



module.exports = router;


