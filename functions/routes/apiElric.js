const express = require("express");
const router = express.Router();

/* POST request to create student account */
router.post("/createPlayerAccount", (req, res) => {
  /* Firebase reference */
  let database = req.app.get("database");
  let playerRef = database.ref("Players");

  /* POST variables */
  const playerId = playerRef.child(req.body.playerID);
  const playerName = req.body.playerName;
  const playerClass = req.body.playerClass;

  playerId.set({
    class: playerClass,
    name: playerName,
    stars: "0",
    medals: "0",
    current_progress: "1-1"
  });
  res.end("Account created");
});

/* POST request to create teacher account */
router.post("/createTeacherAccount", (req, res) => {
  /* Firebase reference */
  let database = req.app.get("database");
  let teacherRef = database.ref("Teachers");

  /* POST variables */
  const teacher_id = teacherRef.child(req.body.teacherID);
  const teacherName = req.body.teacherName;
  const teacherClass = req.body.teacherClass;

  teacher_id.set({
    class: teacherClass,
    name: teacherName
  });
  res.end("Account created");
});

/* POST request to create records in each world */
router.post("/createWorld", (req, res) => {
  /* Firebase reference */
  let database = req.app.get("database");
  let mapRef = database.ref("Maps");
  let playerRef = database.ref("Players");

  for (let x = 1; x <= 6; x++) {
    setTimeout(function() {
      let world = mapRef.child("World-" + x);
      for (let y = 1; y <= 6; y++) {
        setTimeout(function() {
          let section = world.child(x + "-" + y);

          playerRef.once("value", function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
              let section_id = section.child(childSnapshot.key);
              section_id.set({
                stars: y
              });
            });
          });
        }, 1000);
      }
    }, 1000);
  }
  res.end("World created");
});

/* GET request to get player current stage progress */
router.get("/getCurrentWorldStatus", (req, res) => {
  /* Firebase reference */
  let database = req.app.get("database");
  let mapRef = database.ref("Maps");

  let jsonResult = {};

  // Retrieving playerID under URL query string
  const player_id = req.query.playerID;

  /* Asynchronous function */
  async function getPlayerStatus() {
    // Do all your await calls inside this function
    const snap = await mapRef.once("value");
    /* JSON object for Maps */
    const maps = snap.val();

    /* Iterate through each world key */
    Object.keys(maps).forEach(world => {
      const sections = maps[world]; /* sections object */
      /* Iterate through each section key */
      Object.keys(sections).forEach(section => {
        const users = maps[world][section]; /* users object */
        /* Iterate through each user_id key */
        Object.keys(users).forEach(id => {
          if (player_id === id) {
            jsonResult.push({
              stage: section,
              stars: maps[world][section][id]["stars"]
            });
          }
        });
      });
    });
    res.end(JSON.stringify(jsonResult));
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
  //               stars: maps[world][section][id]["stars"]
  //             });
  //         });
  //       });
  //     });
  //   });
});

/* POST request to update player stars at specified stage */
router.post("/setSectionStars", (req, res) => {
  let database = req.app.get("database");

  /* POST variables */
  const player_id = req.body.playerID;
  const section_id = req.body.sectionID;
  const stars = req.body.stars;
  const world = section_id.split("-");

  /* Create firebase reference */
  let userRef = database.ref("Maps").child("World-" + world[0]);
  let playerRef = database.ref("Players").child(player_id);

  /* Asynchronous function */
  async function setPlayerStar() {
    const snap = await userRef.once("value");
    /* JSON object for users */
    const users = snap.val();

    const newSnap = await playerRef.once("value");
    /* JSON object for players */
    const players = newSnap.val();

    /* No user has attempted this stage */
    if (!(section_id in users)) {
      Object.keys(players).forEach(child => {
        if (child === "stars") {
          let totalStars = parseInt(players[child]);
          let newStars = totalStars + parseInt(stars);
          const newPlayerRecord = userRef.child(section_id).child(player_id);

          /* Insert player stage stars */
          newPlayerRecord.set({
            stars: stars.toString()
          });
          /* Update specified player total stars achieved */

          playerRef.update({
            stars: newStars.toString()
          });
        }
      });
    } else if (section_id in users) {
      /* User has yet to attempt the stage */
      let userRef = database
        .ref("Maps")
        .child("World-" + world[0])
        .child(section_id);

      const snap = await userRef.once("value");
      const users = snap.val();

      if (!(player_id in users)) {
        Object.keys(players).forEach(child => {
          if (child === "stars") {
            let totalStars = parseInt(players[child]);
            let newStars = totalStars + parseInt(stars);

            userRef.child(player_id).update({
              stars: stars.toString()
            });

            /* Update specified player total stars */
            playerRef.update({
              stars: newStars.toString()
            });
          }
        });
      } else {
        /* Improvement in stars achieved in user attempt */
        Object.keys(users).forEach(child => {
          if (child === player_id) {
            let currentStars = parseInt(users[child].stars);
            let diffInStars = parseInt(stars) - currentStars;

            Object.keys(players).forEach(child => {
              if (child === "stars") {
                let totalStars = parseInt(players[child]);
                let newStars = totalStars + diffInStars;

                if (diffInStars > 0) {
                  /* Update specified player star achieved in the stage */
                  userRef.child(player_id).update({
                    stars: stars.toString()
                  });

                  /* Update specified player total stars achieved */
                  playerRef.update({
                    stars: newStars.toString()
                  });
                }
              }
            });
          }
        });
      }
    }
  }
  setPlayerStar();
  res.end("Updates done!");
});

module.exports = router;
