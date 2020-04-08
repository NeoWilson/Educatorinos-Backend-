// const request = require("request");

// //========================Upload questions==================================
// var queryText = {
//   worldID: "World-2",
//   section: "1-1",
//   difficulty: "hard",
//   questions: "What is log(base 2) 40",
//   options: [3, 4, 7, 1],
//   answer: 0
// };

// const optionInitializeQuestions = {
//   method: "POST",
//   url:
//     "http://localhost:5001/complement-4254e/us-central1/app/russ/addQuestion",
//   headers: {
//     Authorization: "Basic ",
//     "Content-Type": "application/json;charset=utf-8"
//   },
//   body: JSON.stringify(queryText)
// };

// //========================Get Stars /player/world==================================
// //https://us-central1-complement-4254e.cloudfunctions.net/app/russ/getStar

// const optionGetStars = {
//   method: "GET",
//   url:
//     "https://us-central1-complement-4254e.cloudfunctions.net/app/russ/getStar/?worldID=World-1&playerID=U1720925C",
//   headers: {
//     Authorization: "Basic ",
//     "Content-Type": "application/json;charset=utf-8"
//   }
// };

//========================Get question set per section==================================
// const optionGetQuestionSet = {
//   method: "GET",
//   url:
//     "http://localhost:5001/complement-4254e/us-central1/app/russ/getques/?worldID=World-1&sectionID=1-1",
//   headers: {
//     Authorization: "Basic ",
//     "Content-Type": "application/json;charset=utf-8"
//   }
// };


//========================Upload Arena Questions==================================
// var queryText = {
//   questions: "What is log(base 2) 8",
//   options: [3, 4, 10, 12],
//   answer: 0,
//   creator: "U1720526F",
//   attempts: 0,
// };

// const createArenaQues = {
//   method: "POST",
//   url:
//     "http://localhost:5001/complement-4254e/us-central1/app/russ/addArenaQuestion",
//   headers: {
//     Authorization: "Basic ",
//     "Content-Type": "application/json;charset=utf-8"
//   },
//   body: JSON.stringify(queryText)
// };

//========================Attempt Questions==================================
// var queryText = {
//   questionID: "-M3qYQn6mB-89EIpWSMS",
//   matric: "U2524567C",
//   medal: 1
// };

// const setArenaQuesScore = {
//   method: "POST",
//   url:
//     "http://localhost:5001/complement-4254e/us-central1/app/russ/setArenaQuestionScore",
//   headers: {
//     Authorization: "Basic ",
//     "Content-Type": "application/json;charset=utf-8"
//   },
//   body: JSON.stringify(queryText)
// };

//========================Fetch Arena Questions==================================
  
//   const getArenaQues = {
//     method: "GET",
//     url:
//       "http://localhost:5001/complement-4254e/us-central1/app/russ/GetArenaQuestions",
//     headers: {
//       Authorization: "Basic ",
//       "Content-Type": "application/json;charset=utf-8"
//     }
//   };

//========================Fetch Selected Arena Questions==================================

// const getSelectArenaQues = {
//     method: "GET",
//     url:
//       "http://localhost:5001/complement-4254e/us-central1/app/russ/GetSelectArenaQuestions/?questionID=-M3qYQn6mB-89EIpWSMS",
//     headers: {
//       Authorization: "Basic ",
//       "Content-Type": "application/json;charset=utf-8"
//     }
//   };

//========================Fetch all worlds and respective population==================================

// const getAllWorldPopulation = {
//     method: "GET",
//     url:
//       "http://localhost:5001/complement-4254e/us-central1/app/russ/getAllWorldPopulation",
//     headers: {
//       Authorization: "Basic ",
//       "Content-Type": "application/json;charset=utf-8"
//     }
//   };

// request(setArenaQuesScore, function(error, response, body) {
//   console.log(response.body);
// });