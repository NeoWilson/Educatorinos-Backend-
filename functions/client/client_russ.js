const request = require("request");

//========================Upload questions==================================
var queryText = {
  worldID: "World-1",
  section: "1-1",
  difficulty: "hard",
  questions: "What is log(base 2) 16",
  options: [3, 4, 7, 1],
  answer: 0
};

const optionInitializeQuestions = {
  method: "POST",
  url: "http://localhost:5001/complement-4254e/us-central1/app/addQuestion",
  headers: {
    Authorization: "Basic ",
    "Content-Type": "application/json;charset=utf-8"
  },
  body: JSON.stringify(queryText)
};

//========================Get Stars /player/world==================================
//https://us-central1-complement-4254e.cloudfunctions.net/app/russ/getStar

const optionGetStars = {
  method: "GET",
  url: "http://localhost:5001/complement-4254e/us-central1/app/russ/getStar/?worldID=World-1&playerID=U1720925C",
  headers: {
    Authorization: "Basic ",
    "Content-Type": "application/json;charset=utf-8"
  },
};

//========================Get question set per section==================================
const optionGetQuestionSet = {
  method: "GET",
  url: "http://localhost:5001/complement-4254e/us-central1/app/russ/getques/?worldID=World-1&sectionID=1-1",
  headers: {
    Authorization: "Basic ",
    "Content-Type": "application/json;charset=utf-8"
  },
};

request(optionGetStars, function(error, response, body) {
  console.log(response.body);
});
