const express = require("express");
const router = express.Router();

//======Upload questions to Firebase=======
router.post("/addQuestion", (req, res) => {
  let database = req.app.get("database");
  let request = req.body;
  let worldID = request.worldID;
  let sectionID = request.section;
  let difficulty = request.difficulty;

  let question = request.questions;
  let options = request.options;
  let answer = request.answer;

  let databaseRef = database.ref("QuestionBank");
  databaseRef = databaseRef.child(worldID);
  databaseRef = databaseRef.child(sectionID);
  databaseRef = databaseRef.child(difficulty);

  databaseRef.push({
    question: question,
    options: options,
    answer: answer
  });
  res.end("upload complete");
});

//=====Get Player stars achieved for world========
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
  // let request = req.body
  let playerID = req.query.playerID;
  let worldID = req.query.worldID;
  let payload = "";

  let databaseRef = database.ref("Maps");

  databaseRef.once("value", function(snapshot) {
    let worldObj = snapshot.val();
    payload = constructpayload(playerID, worldID, worldObj);
    res.json(payload);
  });
});

//===Get Player stars achieved for world===
router.get("/getques", (req, res) => {
  let database = req.app.get("database");
  // let request = req.body
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




module.exports = router;
