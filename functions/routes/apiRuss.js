const express = require("express");
const router = express.Router();

//======Upload questions to Firebase=======
router.post("/addQuestion", (req, res) => {

  //Restrive payload from client
  let database = req.app.get("database");
  let request = req.body;
  let worldID = request.worldID;
  let sectionID = request.section;
  let difficulty = request.difficulty;

  let question = request.questions;
  let options = request.options;
  let answer = request.answer;

  //Traverse database objects
  let databaseRef = database.ref("QuestionBank");
  databaseRef = databaseRef.child(worldID);
  databaseRef = databaseRef.child(sectionID);
  databaseRef = databaseRef.child(difficulty);

  //Upload information to database
  databaseRef.push({
    question: question,
    options: options,
    answer: answer
  });
  res.end("upload complete");
});

//=====Get Player stars achieved for world========

//Iterate sections in world to collate sum of stars of players
function constructpayload(pid, wid, obj) {
  let totalscore = 0;
  Object.keys(obj[wid]).forEach(section => {
    if (typeof obj[wid][section][pid] !== "undefined") {
      totalscore = totalscore + parseInt(obj[wid][section][pid]["stars"]);
    }
  });
  let payload = { user: pid, stars: totalscore };
  return payload;
}

router.get("/getStar", (req, res) => {
  let database = req.app.get("database");

  //Receive matriculation and world ID 
  let matric = req.query.matric;
  let worldID = req.query.worldID;
  let payload = "";

  //Reference Map Object
  let databaseRef = database.ref("Maps");

  //Create JSON snapshot of Map object
  databaseRef.once("value", function(snapshot) {
    let worldObj = snapshot.val();

    //Call construct payload function to process retrieved database object 
    payload = constructpayload(matric, worldID, worldObj);
    res.json(payload);
  });
});

//=====Retrieve questions from Firebase for particular section of world====
router.get("/getques", (req, res) => {
  let database = req.app.get("database");
  
  let worldID = req.query.worldID;
  let sectionID = req.query.sectionID;

  let databaseRef = database.ref("QuestionBank");
  databaseRef = databaseRef.child(worldID);
  databaseRef = databaseRef.child(sectionID);

  databaseRef.once("value", function(snapshot) {
    let queslist = snapshot.val();
    res.json(queslist);
  });
});

//==========Create Arena Questions==============
router.post("/addArenaQuestion", (req, res) => {
  let database = req.app.get("database");
  let request = req.body;
  
  //Define Arena question fields
  let creator = request.creator;
  let question = request.questions;
  let options = request.options;
  let answer = request.answer;
  let attempts = request.attempts;

  let databaseRef = database.ref("Arena");
  databaseRef = databaseRef.child("Questions");

  //Upload questions to Firebase
  databaseRef.push({
    question: question,
    options: options,
    answer: answer,
    creator: creator,
    attempts: attempts,
  });
  res.end("Arena upload complete");
});

//==========Set Arena Question Score==============

function getMedal(matric, database){
  
  let arenaRef = database.ref("Arena").child("Questions")

  //Iterate question object in arena
  return arenaRef.once("value").then(function(snapshot){
    let questionObj = snapshot.val();
    //Retrieve all questionUDs
    let quesKeys = Object.keys(questionObj);
    let medalcount = 0

    //Search for player in arena questions and collate medal counts
    for(let i =0; i< quesKeys.length;i++){
        if ('players' in questionObj[quesKeys[i]]){
          if (matric in questionObj[quesKeys[i]]['players']){
            medalcount = medalcount + questionObj[quesKeys[i]]['players'][matric]['medal']
          }
        }
    }

    //Update total collated medal count of player in player object
    let userRef = database.ref("Students").child(matric);
    userRef.update({medals:medalcount})
    return "ok"
  }).catch((err)=>{
    throw new Error(err);
  });
}

//API is called on arena quiz attempt to update medals and attempts
router.post("/setArenaQuestionScore", (req, res) => {
  let database = req.app.get("database");
  let request = req.body;
  
  //Recieve questionID, Player and medal earned
  let qid = request.questionID;
  let matric = request.matric;
  let medal = request.medal;

  //Initiate multiple Object reference
  let databaseRef = database.ref("Arena");
  let questionRef = databaseRef.child("Questions");
  let qidRef = questionRef.child(qid);
  let playerRef = qidRef.child("players");
  let matricRef = playerRef.child(matric);
  
  //Set medal score local medal score in arena 
  matricRef.set({medal: medal});

  //Set medal score in leaderboard and update total arena quiz attempts
  return getMedal(matric, database).then((status)=>{
    //PlayerRef contains matriculation keys
    playerRef.once("value", function(snapshot){
      let quesObj = snapshot.val();
      //Get length of matriculation keys in PlayerRef to determine attempt count
      let len_of_attempts = Object.keys(quesObj).length; 
      qidRef.update({attempts:len_of_attempts})
    })
    res.end("ok");
    return status;

  }).catch((err)=>{
    throw err;
  })

});

//==========Fetch all Arena Question ==============

router.get("/getArenaQuestions", (req, res) => {

  let database = req.app.get("database");

  //Access Question data object in Arena
  let databaseRef = database.ref("Arena");
  databaseRef = databaseRef.child("Questions");
  
  //Iterate Questions to contruct arena question information response
  databaseRef.once("value", function(snapshot) {
    let queslist = snapshot.val();
    let dict = {}

    Object.keys(queslist).forEach(info=>{
      let jsonObj = {question: queslist[info]['question'], creator: queslist[info]['creator'], 
                      attempts: queslist[info]['attempts'], players: queslist[info]['players']}
      dict[info] = jsonObj
    })

    res.json(dict);
  });
});


//==========Get Selected Arena Question info ==============

router.get("/getSelectArenaQuestions", (req, res) => {
  
  let qid = req.query.questionID;
  let database = req.app.get("database");

  //Access particular Question ID in Arena
  let databaseRef = database.ref("Arena");
  databaseRef = databaseRef.child("Questions");
  databaseRef = databaseRef.child(qid);

  //Return snapshot of question information
  databaseRef.once("value", function(snapshot) {
    let quesInfo = snapshot.val();
    res.json(quesInfo);
  });
});

//==========Get All Worlds and Respective Population==============

function getPopulation(worldID, worldObj){
    
  //Initialize array to store unique users
    let userArr = [];

    //Iterate each world object to obtain section IDs
    Object.keys(worldObj).forEach(sections=>{
        let section = worldObj[sections]; 

        //Look through each section and only add non-repeated users into array
        Object.keys(section).forEach(user => {
          if (userArr.indexOf(user) === -1) {
            userArr.push(user); 
          }
        });
    })

    //Construct json object of world ID and respective user count to be returned to main API function
    let woridPopulationObj = {worldID: worldID, population: userArr.length}
    return woridPopulationObj;
}

router.get("/getAllWorldPopulation", (req,res)=>{

  //Access Maps Data object
  let database = req.app.get("database");
  let worldRef = database.ref("Maps"); 

  //Iterate all worlds to retrieve number of users present per world
  worldRef.once("value", function(snapshot) {
    let worlds = snapshot.val(); 
    let worldPopulationArray = []

    //For each world, call getPopulation function to construct world population object
    Object.keys(worlds).forEach(world => {
        let populationObj = getPopulation(world, worlds[world])
        worldPopulationArray.push(populationObj)
    });
    
    res.json(worldPopulationArray); 
  });

})


module.exports = router;
