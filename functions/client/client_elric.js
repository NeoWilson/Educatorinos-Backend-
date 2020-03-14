// const request = require("request");

// /* POST request to generate records for each world */
// const optionPostCreateWorld = {
//   method: "POST",
//   url:
//     "http://localhost:5001/complement-4254e/us-central1/app/elric/createWorld",
//   headers: {
//     Authorization: "Basic ",
//     "Content-Type": "application/json;charset=utf-8"
//   }
// };

// /* GET request to retrieve student current progress */
// const optionGetStageProgress = {
//   method: "GET",
//   url:
//     "https://us-central1-complement-4254e.cloudfunctions.net/app/elric/getCurrentWorldStatus/?matric=U1720925C",
//   headers: {
//     Authorization: "Basic ",
//     "Content-Type": "application/json;charset=utf-8"
//   }
// };

// /* POST request to update student stars at specified stage */
// var queryText = {
//   matric: "U1720925C",
//   sectionID: "1-1",
//   stars: "1"
// };

// const optionPostUpdateSectionStars = {
//   method: "POST",
//   url:
//     "http://localhost:5001/complement-4254e/us-central1/app/elric/setSectionStars",
//   headers: {
//     Authorization: "Basic ",
//     "Content-Type": "application/json;charset=utf-8"
//   },
//   body: JSON.stringify(queryText)
// };

// /* POST request to create student account */
// var queryText = {
//   matric: "U1720526FC",
//   name: "Russell",
//   class: "TSP8"
// };

// const optionPostCreateStudentAccount = {
//   method: "POST",
//   url:
//     "http://localhost:5001/complement-4254e/us-central1/app/elric/createStudentAccount",
//   headers: {
//     Authorization: "Basic ",
//     "Content-Type": "application/json;charset=utf-8"
//   },
//   body: JSON.stringify(queryText)
// };

// /* POST request to create teacher account */
// var queryText = {
//   teacherID: "E1728357D",
//   teacherName: "Guang Wei",
//   teacherClass: "TSP8"
// };

// const optionPostCreateTeacherAccount = {
//   method: "POST",
//   url:
//     "http://localhost:5001/complement-4254e/us-central1/app/elric/createTeacherAccount",
//   headers: {
//     Authorization: "Basic ",
//     "Content-Type": "application/json;charset=utf-8"
//   },
//   body: JSON.stringify(queryText)
// };

// request(optionPostUpdateSectionStars, function(error, response, body) {
//   console.log(response.body);
// });
