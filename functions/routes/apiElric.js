const express = require("express");
const router = express.Router();

/* POST request to create user account */
router.post("/createAccount", (req, res) => {
  let database = req.app.get("database");
  let playerRef = database.ref("Players");
  const playerId = playerRef.child(req.body.user_id);
  const playerName = req.body.name;
  const playerClass = req.body.class;

  playerId.set({
    class: playerClass,
    name: playerName,
    score: "0",
    current_progress: "1-1"
  });
  res.end("Account created");
});

/* POST request to create records in each world */
router.post("/createWorld", (req, res) => {
  let database = req.app.get("database");
  let mapRef = database.ref("Maps");
  let playerRef = database.ref("Players");

  for (let x = 1; x <= 8; x++) {
    setTimeout(function() {
      let world = mapRef.child("World-" + x);
      for (let y = 1; y <= 8; y++) {
        setTimeout(function() {
          let section = world.child(x + "-" + y);
          if (x == 1 && y == 1) {
            playerRef.once("value", function(snapshot) {
              snapshot.forEach(function(childSnapshot) {
                let section_id = section.child(childSnapshot.key);
                section_id.set({
                  score: "0"
                });
              });
            });
          } else {
            let section_id = section.child("No_Data");
            section_id.set({
              score: "-"
            });
          }
        }, 1000);
      }
    }, 1000);
  }
  res.end("World created");
});

/* GET request to get player current stage progress */
router.get("/getCurrentWorldStatus", (req, res) => {
  let database = req.app.get("database");
  let mapRef = database.ref("Maps");
  let jsonResult = [];

  const player_id = req.body.user_id;

  /* Asynchronous function */
  async function getPlayerStatus() {
    // Do all your await calls inside this function
    const snap = await mapRef.once("value");
    /* JSON object for Maps */
    const maps = snap.val();

    /* Iterate through each world key */
    Object.keys(maps).forEach(world => {
      const sections = maps[world];
      /* Iterate through each section key */
      Object.keys(sections).forEach(section => {
        const users = maps[world][section];
        /* Iterate through each user_id key */
        Object.keys(users).forEach(id => {
          if (player_id === id) {
            jsonResult.push({
              stage: section,
              score: maps[world][section][id]["score"]
            });
          }
        });
      });
    });
    // res.end(JSON.stringify(jsonResult));
  }
  getPlayerStatus();

  /* Alternative Asyncronous function */
  //   mapRef.once("value").then(snap => {
  //     /* JSON object for Maps */
  //     const maps = snap.val();

  //     Object.keys(maps).forEach(world => {
  //       const sections = maps[world];

  //       Object.keys(sections).forEach(section => {
  //         const users = maps[world][section];

  //         Object.keys(users).forEach(id => {
  //           if (user_id === id)
  //             jsonResult.push({
  //               stage: section,
  //               score: maps[world][section][id]["score"]
  //             });
  //         });
  //       });
  //     });
  //   });
});

/* POST request to update player score at specified stage */
router.post("/setSectionStars", (req, res) => {
  /* variables from the front end */
  let database = req.app.get("database");
  const player_id = req.body.player_id;
  const section_id = req.body.section_id;
  const score = req.body.score;
  const world = section_id.split("-");

  /* Create database reference */
  let userRef = database.ref("Maps").child("World-" + world[0]);
  let playerRef = database.ref("Players").child(player_id);

  /* Asynchronous function */
  async function setPlayerScore() {
    const snap = await userRef.once("value");
    const user = snap.val();

    const newSnap = await playerRef.once("value");
    const player = newSnap.val();

    /* No user has attempted this stage */
    if (!(section_id in user)) {
      Object.keys(player).forEach(child => {
        if (child == "score") {
          var totalScore = parseInt(player[child]);
          var newScore = totalScore + parseInt(score);
          const newPlayerRecord = userRef.child(section_id).child(player_id);

          /* Insert player stage score */
          newPlayerRecord.set({
            score: score.toString()
          });
          /* Update specified player total score */

          playerRef.update({
            score: newScore.toString()
          });
        }
      });
    } else if (section_id in user) {
      /* User has yet to attempt stage */
      let userRef = database
        .ref("Maps")
        .child("World-" + world[0])
        .child(section_id);

      const snap = await userRef.once("value");
      const user = snap.val();

      if (!(player_id in user)) {
        Object.keys(player).forEach(child => {
          if (child == "score") {
            let totalScore = parseInt(player[child]);
            let newScore = totalScore + parseInt(score);

            userRef
              .child(section_id)
              .child(player_id)
              .update({
                score: score.toString()
              });

            /* Update specified player total score */
            playerRef.update({
              score: newScore.toString()
            });
          }
        });
      } else {
        /* Improvement in score in user attempt */
        Object.keys(user).forEach(child => {
          if (child == player_id) {
            let currentScore = parseInt(user[child].score);
            let diffInScore = parseInt(score) - currentScore;

            Object.keys(player).forEach(child => {
              if (child == "score") {
                let totalScore = parseInt(player[child]);
                let newScore = totalScore + diffInScore;

                if (diffInScore > 0) {
                  /* Update specified player stage score */
                  userRef.child(player_id).update({
                    score: score.toString()
                  });

                  /* Update specified player total score */
                  playerRef.update({
                    score: newScore.toString()
                  });
                }
              }
            });
          }
        });
      }
    }
  }
  setPlayerScore();
});

module.exports = router;
