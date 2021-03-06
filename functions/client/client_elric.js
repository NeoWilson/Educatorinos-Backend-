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
// const optionGetProgress = {
//   method: "GET",
//   url:
//     "https://us-central1-complement-4254e.cloudfunctions.net/app/elric/getWorldStatus/?matric=U1720925C",
//   headers: {
//     Authorization: "Basic ",
//     "Content-Type": "application/json;charset=utf-8"
//   }
// };

// /* GET request to retrieve student current progress */
// const optionGetStageProgress = {
//   method: "GET",
//   url:
//     "https://us-central1-complement-4254e.cloudfunctions.net/app/elric/getCurrentWorldStatus/?matric=U1720925C&worldID=World-1",
//   headers: {
//     Authorization: "Basic ",
//     "Content-Type": "application/json;charset=utf-8"
//   }
// };

/* POST request to update student stars at specified stage */
var queryText = {
  matric: "U1720925C",
  sectionID: "1-1",
  stars: "2",
};

const optionPostUpdateSectionStars = {
  method: "POST",
  url:
    "http://localhost:5001/complement-4254e/us-central1/app/elric/setSectionStars",
  headers: {
    Authorization: "Basic ",
    "Content-Type": "application/json;charset=utf-8",
  },
  body: JSON.stringify(queryText),
};

// /* POST request to create student account */
// var queryText = {
//   matric: "U1720526F",
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
//   teacher_id: "E1728357D",
//   teacher_name: "Guang Wei",
//   teacher_class: "TSP8"
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

// const optionCheckValidStudent = {
//   method: "GET",
//   url:
//   // "https://us-central1-complement-4254e.cloudfunctions.net/app/elric/checkValidStudent/?matric=U1720925C",
//   headers: {
//     Authorization: "Basic ",
//     "Content-Type": "application/json;charset=utf-8",
//   },
// };

// const optionCheckValidTeacher = {
//   method: "GET",
//   url:
//   // "https://us-central1-complement-4254e.cloudfunctions.net/app/elric/checkValidTeacher/?teacher_id=E1507788C",
//   headers: {
//     Authorization: "Basic ",
//     "Content-Type": "application/json;charset=utf-8",
//   },
// };

request(optionPostUpdateSectionStars, function (error, response, body) {
  console.log(response.body);
});
