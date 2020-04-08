const request = require("request");

//========================Upload questions==================================
var queryText = {
  worldID: "World-2",
  section: "2-4",
  difficulty: "easy",
  questions: "Who provided the first information regarding the Black Hole?",
  options: ["Copernicus", "Herman Bondy", "Rutherford", "S. Chandrasekhar"],
  answer: "S. Chandrasekhar"
};

const optionInitializeQuestions = {
  method: "POST",
  url: "http://localhost:5001/complement-4254e/us-central1/app/russ/addQuestion",
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
  url: "https://us-central1-complement-4254e.cloudfunctions.net/app/russ/getStar/?worldID=World-1&playerID=U1720925C",
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

request(optionInitializeQuestions, function(error, response, body) {
  console.log(response.body);
});
