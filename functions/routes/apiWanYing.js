const express = require("express");
const router = express.Router();

//==========Retrieve the Population of a Selected World==============
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


//==========Retrieve Leaderboard Information==============
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
  let request = req.body; // Get param from URL query string
  
  let creator = request.creator; //teacherID
  let title = request.title; // title of the assignment
  let group = request.group; // class
  let players = request.players; //student matriculation 
  let quesobject = request.question; // a list of question objects
 
  let databaseRef = database.ref("Arena");
  databaseRef = databaseRef.child("Assignment");
  // add the new assignment with its relevant attributes into database
  databaseRef.push({
    title: title,
    group: group,
    players: players,
    teacher: creator,
    question: quesobject
  });
 
  res.end("Assignment upload complete"); // return success message
});



//==========Fetch all Assignment Question ==============
router.get("/getAssignmentQuestions", (req, res) => { 

  let database = req.app.get("database");

  let databaseRef = database.ref("Arena");
  databaseRef = databaseRef.child("Assignment"); // pointer points to assignment in firebase
  
  databaseRef.once("value", function(snapshot) {
    let assignlist = snapshot.val();
    let dict = {}

    Object.keys(assignlist).forEach(info=>{
      let jsonObj = {question: assignlist[info]['question'], 
                     teacher: assignlist[info]['teacher'], 
                     group: assignlist[info]['group'], 
                     title: assignlist[info]['title'], 
                     players: assignlist[info]['players']}
      dict[info] = jsonObj // format the data to be returned as a dict
    })

    res.json(dict); // return all assignment info
  });
});


//==========Get Selected Assignment Question info ==============
router.get("/getSelectAssignmentQuestion", (req, res) => {
  
  let aid = req.query.assignID; // get the chosen assignment id from param
  let database = req.app.get("database");

  let databaseRef = database.ref("Arena");
  databaseRef = databaseRef.child("Assignment");
  databaseRef = databaseRef.child(aid); // databaseRef referencing a selected assignment
  databaseRef.once("value", function(snapshot) {
    let assignInfo = snapshot.val();
    res.json(assignInfo); // return the selected assignment info
  });
});



//==========Set Arena Assignment Player==============
router.post("/setAssignmentPlayer", (req, res) => {
  let database = req.app.get("database");
  let request = req.body;
  
  let aid = request.assignID; // get the chosen assignment id from param
  let matric = request.matric; // get the player id (matric) from param

  let databaseRef = database.ref("Arena");
  let assignRef = databaseRef.child("Assignment");
  let aidRef = assignRef.child(aid);  // aideRef referencing a selected assignment

    aidRef.once("value", function(snapshot) {
    let aidlist = snapshot.val();
    console.log(aidlist)
      if ("players" in aidlist){ // check if there are existing players
        let arr = aidlist["players"] // copy the existing players into the new created arr
        arr.push(matric)  // add a new player id (matric) into the arr
        aidRef.update({players : arr}) // update the pointer to set a new dict that consists of the updated arr
      } else { // no existing players 
        aidRef.update({ players: [matric]}); // update the pointer to set a new dict that consists of the given matric in an arr
      }
    res.json("New players added to assignment"); // return success message
  });

});


module.exports = router;


