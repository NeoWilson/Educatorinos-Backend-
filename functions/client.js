const request = require("request");

//========================GET Request==================================
const optionGET = {
  method: "GET",
  url: "http://localhost:5001/complement-4254e/us-central1/app/test",
  headers: {
    Authorization: "Basic ",
    "Content-Type": "multipart/form-data"
  }
};

//========================POST Request for upload==================================
var queryText = "hello";

const optionPOSTupload = {
  method: "POST",
  url: "http://localhost:5001/complement-4254e/us-central1/app/sendToFirebase",
  headers: {
    Authorization: "Basic ",
    "Content-Type": "multipart/form-data"
  },
  formData: {
    input: queryText
  }
};

//========================POST Request for fetch==================================
var input = {
  name: "John",
  surname: "Smith"
};

const optionPOSTretrieve = {
  method: "POST",
  url: "http://localhost:5001/complement-4254e/us-central1/app/getFromFirebase",
  headers: {
    Authorization: "Basic ",
    "Content-Type": "application/json;charset=utf-8"
  },
  body: JSON.stringify(input)
};

/* Method to create Account */
const createAccount = {
  method: "POST",
  url: "http://localhost:5001/complement-4254e/us-central1/app/createAccount",
  headers: {
    Authorization: "Basic ",
    "Content-Type": "multipart/form-data"
  },
  formData: {
    input: queryText
  }
};

/* Method to create records for each world */
const createWorld = {
  method: "POST",
  url: "http://localhost:5001/complement-4254e/us-central1/app/createWorld",
  headers: {
    Authorization: "Basic ",
    "Content-Type": "multipart/form-data"
  },
  formData: {
    input: queryText
  }
};

const data = { player_id: "U1722845D" };
/* Method to retrieve player current stage progress */
const getCurrentWorldStatus = {
  method: "GET",
  url:
    "http://localhost:5001/complement-4254e/us-central1/app/getCurrentWorldStatus",
  headers: {
    Authorization: "Basic ",
    "Content-Type": "application/json;charset=utf-8"
  },
  body: JSON.stringify(data)
};

const data1 = { player_id: "U1720925C", section_id: "1-1", score: "2" };
/* Method to retrieve player current stage progress */
const setSectionStars = {
  method: "POST",
  url: "http://localhost:5001/complement-4254e/us-central1/app/setSectionStars",
  headers: {
    Authorization: "Basic ",
    "Content-Type": "application/json;charset=utf-8"
  },
  body: JSON.stringify(data1)
};

request(setSectionStars, function(error, response, body) {
  console.log(response.body);
});
