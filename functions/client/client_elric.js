const request = require("request");

/* GET request to get player current stage progress */
var queryText = {
  user_id: "U1720925C"
};

const optionGetStageProgress = {
  method: "GET",
  url:
    "http://localhost:5001/complement-4254e/us-central1/app/elric/getCurrentWorldStatus",
  headers: {
    Authorization: "Basic ",
    "Content-Type": "application/json;charset=utf-8"
  },
  body: JSON.stringify(queryText)
};

/* POST request to update player score at specified stage */
var queryText = {
  player_id: "U1720925C",
  section_id: "1-9",
  score: "2"
};

const optionPostUpdateSectionScore = {
  method: "POST",
  url:
    "http://localhost:5001/complement-4254e/us-central1/app/elric/setSectionStars",
  headers: {
    Authorization: "Basic ",
    "Content-Type": "application/json;charset=utf-8"
  },
  body: JSON.stringify(queryText)
};

/* POST request to create user account */
var queryText = {
  user_id: "U1720526FC",
  name: "Russell",
  class: "TSP8"
};

const optionPostCreateAccount = {
  method: "POST",
  url:
    "http://localhost:5001/complement-4254e/us-central1/app/elric/createAccount",
  headers: {
    Authorization: "Basic ",
    "Content-Type": "application/json;charset=utf-8"
  },
  body: JSON.stringify(queryText)
};

/* POST request to create teacher account */
var queryText = {
  teacher_id: "E1728357D",
  name: "Guang Wei",
  class: "TSP8"
};

const optionPostCreateTeacherAccount = {
  method: "POST",
  url:
    "http://localhost:5001/complement-4254e/us-central1/app/elric/createTeacherAccount",
  headers: {
    Authorization: "Basic ",
    "Content-Type": "application/json;charset=utf-8"
  },
  body: JSON.stringify(queryText)
};

request(optionPostCreateTeacherAccount, function(error, response, body) {
  console.log(response.body);
});
