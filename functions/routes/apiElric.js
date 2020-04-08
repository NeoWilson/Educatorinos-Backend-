const express = require("express");
const router = express.Router();

/* POST request to create student account */
router.post("/createStudentAccount", (req, res) => {
  /* Firebase reference */
  let database = req.app.get("database");
  let studentRef = database.ref("Students");

  /* POST variables */
  const studentMatric = studentRef.child(req.body.matric);
  const studentName = req.body.name;
  const studentClass = req.body.class;

  studentMatric.set({
    class: studentClass,
    name: studentName,
    stars: "0",
    medals: "0",
    current_progress: "1-1",
    avatar_url: "NoAvatar",
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
    name: teacherName,
  });
  res.end("Account created");
});

/* POST request to create records in each world */
router.post("/createWorld", (req, res) => {
  /* Firebase reference */
  let database = req.app.get("database");
  let mapRef = database.ref("Maps");
  let studentRef = database.ref("Students");

  for (let x = 1; x <= 6; x++) {
    setTimeout(function () {
      let world = mapRef.child("World-" + x);
      for (let y = 1; y <= 6; y++) {
        setTimeout(function () {
          let section = world.child(x + "-" + y);

          studentRef.once("value", function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
              let section_id = section.child(childSnapshot.key);
              section_id.set({
                stars: y,
              });
            });
          });
        }, 1000);
      }
    }, 1000);
  }
  res.end("World created");
});

/* GET request to retrieve student current stage progress */
router.get("/getWorldStatus", (req, res) => {
  /* Firebase reference */
  let database = req.app.get("database");
  let mapRef = database.ref("Maps");

  let jsonResult = [];

  // Retrieving student matriculation number under URL query string
  const studentMatric = req.query.matric;

  /* Asynchronous function */
  async function getPlayerStatus() {
    // Do all your await calls inside this function
    const snap = await mapRef.once("value");
    /* JSON object for Maps */
    const maps = snap.val();

    /* Iterate through each world key */
    Object.keys(maps).forEach((world) => {
      const sections = maps[world]; /* sections object */
      /* Iterate through each section key */
      Object.keys(sections).forEach((section) => {
        const users = maps[world][section]; /* users object */
        /* Iterate through each user_id key */
        Object.keys(users).forEach((id) => {
          if (studentMatric === id) {
            jsonResult.push({
              stage: section,
              stars: maps[world][section][id]["stars"],
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
  //           if (studentMatric === id)
  //             jsonResult.push({
  //               stage: section,
  //               stars: maps[world][section][id]["stars"]
  //             });
  //         });
  //       });
  //     });
  //   });
});

/* GET request to retrieve student current stage progress */
router.get("/getCurrentWorldStatus", (req, res) => {
  /* Firebase reference */
  let database = req.app.get("database");
  let worldRef = database.ref("Maps").child(req.query.worldID);

  let jsonResult = [];

  // Retrieving student matriculation number under URL query string
  const studentMatric = req.query.matric;

  /* Asynchronous function */
  async function getCurrentPlayerStatus() {
    // Do all your await calls inside this function
    const snap = await worldRef.once("value");
    /* JSON object for worlds */
    const worlds = snap.val();

    /* Iterate through each section key */
    Object.keys(worlds).forEach((section) => {
      const users = worlds[section]; /* users object */
      /* Iterate through each user_id key */
      Object.keys(users).forEach((id) => {
        if (studentMatric === id) {
          jsonResult.push({
            stage: section,
            stars: worlds[section][id]["stars"],
          });
        }
      });
    });
    res.end(JSON.stringify(jsonResult));
  }
  getCurrentPlayerStatus();
});

/* POST request to update student achieved stars at specified stage */
router.post("/setSectionStars", (req, res) => {
  let database = req.app.get("database");

  /* POST variables */
  const studentMatric = req.body.matric;
  const section_id = req.body.sectionID;
  const stars = req.body.stars;
  const world = section_id.split("-");

  /* Create firebase reference */
  let userRef = database.ref("Maps").child("World-" + world[0]);
  let studentRef = database.ref("Students").child(studentMatric);

  /* Asynchronous function */
  async function setPlayerStar() {
    const snap = await userRef.once("value");
    /* JSON object for users */
    const users = snap.val();

    const newSnap = await studentRef.once("value");
    /* JSON object for students */
    const students = newSnap.val();

    /* No user has attempted this stage */
    if (!(section_id in users)) {
      Object.keys(students).forEach((child) => {
        if (child === "stars") {
          let totalStars = parseInt(students[child]);
          let newStars = totalStars + parseInt(stars);
          const newPlayerRecord = userRef
            .child(section_id)
            .child(studentMatric);

          /* Insert student stage stars */
          newPlayerRecord.set({
            stars: stars.toString(),
          });
          /* Update specified student total stars achieved */

          studentRef.update({
            stars: newStars.toString(),
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

      if (!(studentMatric in users)) {
        Object.keys(students).forEach((child) => {
          if (child === "stars") {
            let totalStars = parseInt(students[child]);
            let newStars = totalStars + parseInt(stars);

            userRef.child(studentMatric).update({
              stars: stars.toString(),
            });

            /* Update specified student total stars */
            studentRef.update({
              stars: newStars.toString(),
            });
          }
        });
      } else {
        /* Improvement in stars achieved in user attempt */
        Object.keys(users).forEach((child) => {
          if (child === studentMatric) {
            let currentStars = parseInt(users[child].stars);
            let diffInStars = parseInt(stars) - currentStars;

            Object.keys(students).forEach((child) => {
              if (child === "stars") {
                let totalStars = parseInt(students[child]);
                let newStars = totalStars + diffInStars;

                if (diffInStars > 0) {
                  /* Update specified student star achieved in the stage */
                  userRef.child(studentMatric).update({
                    stars: stars.toString(),
                  });

                  /* Update specified student total stars achieved */
                  studentRef.update({
                    stars: newStars.toString(),
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

/* GET Request to check for valid student */
router.get("/checkValidStudent", (req, res) => {
  /* Firebase reference */
  let database = req.app.get("database");
  let studentRef = database.ref("Students");

  // Retrieving student matriculation number under URL query string
  const studentMatric = req.query.matric;

  /* Asynchronous function */
  async function checkValidStudent() {
    // Do all your await calls inside this function
    const snap = await studentRef.once("value");

    /* JSON object for users */
    const users = snap.val();

    if (studentMatric in users) {
      res.end(JSON.stringify(users[studentMatric]));
    } else {
      res.end("Invalid");
    }
  }
  checkValidStudent();
});

/* GET Request to check for valid teacher */
router.get("/checkValidTeacher", (req, res) => {
  /* Firebase reference */
  let database = req.app.get("database");
  let teacherRef = database.ref("Teachers");

  // Retrieving teacher id under URL query string
  const teacherId = req.query.teacher_id;
  console.log(teacherId);
  /* Asynchronous function */
  async function checkValidTeacher() {
    // Do all your await calls inside this function
    const snap = await teacherRef.once("value");

    /* JSON object for users */
    const users = snap.val();

    if (teacherId in users) {
      res.end(JSON.stringify(users[teacherId]));
    } else {
      res.end("Invalid");
    }
  }
  checkValidTeacher();
});
module.exports = router;
