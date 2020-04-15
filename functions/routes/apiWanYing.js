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
  let title = request.title;
  let group = request.group;
  let players = request.players;
  let quesobject = request.question;
 
  let databaseRef = database.ref("Arena");
  databaseRef = databaseRef.child("Assignment");
  
  databaseRef.push({
    title: title,
    group: group,
    players: players,
    teacher: creator,
    question: quesobject
  });
 
  res.end("Assignment upload complete");
});



//==========Fetch all Assignment Question ==============

router.get("/getAssignmentQuestions", (req, res) => {

  let database = req.app.get("database");

  let databaseRef = database.ref("Arena");
  databaseRef = databaseRef.child("Assignment");
  
  databaseRef.once("value", function(snapshot) {
    let queslist = snapshot.val();
    let dict = {}

    Object.keys(queslist).forEach(info=>{
      let jsonObj = {question: queslist[info]['question'], teacher: queslist[info]['teacher'], 
                      group: queslist[info]['group'], title: queslist[info]['title'], 
                      players: queslist[info]['players']}
      dict[info] = jsonObj
    })

    res.json(dict);
  });
});


//==========Get Selected Assignment Question info ==============

router.get("/getSelectAssignmentQuestion", (req, res) => {
  
  let aid = req.query.assignID;
  let database = req.app.get("database");

  let databaseRef = database.ref("Arena");
  databaseRef = databaseRef.child("Assignment");
  databaseRef = databaseRef.child(aid);
  databaseRef.once("value", function(snapshot) {
    let assignInfo = snapshot.val();
    res.json(assignInfo);
  });
});



//==========Set Arena Assignment Player==============

// function getAttempts(playerRef) {

//   return playerRef.once("value").then(function(snapshot) {
//     let quesObj = snapshot.val();
//     let len_of_attempts = Object.keys(quesObj).length; 
//     return len_of_attempts;
//   }).catch((err)=>{
//     throw new Error(err)
//   });
// }

// function getPlayers(matric, database){
  
//   let arenaRef = database.ref("Arena").child("Assignment")
//   return arenaRef.once("value").then(function(snapshot){
//     let questionObj = snapshot.val();
//     let quesKeys = Object.keys(questionObj);
//     let medalcount = 0
//     for(let i =0; i< quesKeys.length;i++){
//         if ('players' in questionObj[quesKeys[i]]){
//           if (matric in questionObj[quesKeys[i]]['players']){
//             medalcount = medalcount + questionObj[quesKeys[i]]['players'][matric]['medal']
//           }
//         }
//     }

//     let userRef = database.ref("Students").child(matric);
//     userRef.update({medals:medalcount})
//     return "ok"
//   }).catch((err)=>{
//     throw new Error(err);
//   });
// }

router.post("/setAssignmentPlayer", (req, res) => {
  let database = req.app.get("database");
  let request = req.body;
  
  let aid = request.assignID;
  let matric = request.matric;
  // let medal = request.medal;

  let databaseRef = database.ref("Arena");
  let assignRef = databaseRef.child("Assignment");
  let aidRef = assignRef.child(aid);
  // let playerRef = qidRef.child("players");
  // let matricRef = aidRef.child(matric);

  let playerRef = aidRef.child("players"); 

  playerRef.once("value", function(snapshot) {
    let playerlist = snapshot.val();
    // let dict = {}

    Object.keys(playerlist).forEach(info=>{
      // let jsonObj = {question: queslist[info]['question'], teacher: queslist[info]['teacher'], 
      //                 group: queslist[info]['group'], title: queslist[info]['title'], 
      //                 players: queslist[info]['players']}
      // dict[info] = jsonObj
      // playerlist.set({players: matric});
      // playerRef.set(matric);
      playerlist[info] = matric;
  

    })

    res.json(playerlist);
  });



  // aidRef.set({players: matric});
  // matricRef.set({medal: medal});

  // return getPlayers(matric, database).then((status)=>{
  //   playerRef.once("value", function(snapshot){
  //     let quesObj = snapshot.val();
  //     let len_of_attempts = Object.keys(quesObj).length; 
  //     qidRef.update({attempts:len_of_attempts})
  //   })
  //   res.end("ok");
  //   return status;
  //   // res.json(status);
  // }).catch((err)=>{
  //   throw err;
  // })

  // getAttempts(playerRef).then((attempt)=>{
  //   qidRef.update({attempts:attempt})
  //   res.json("Ok");
  // }).catch((err)=>{
  //   res.json(err);
  // })
  // res.end("New player added");
});


module.exports = router;


