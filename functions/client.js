const request = require('request')

//========================GET Request================================== 
const optionGET = {
    method: "GET",
    url: "http://localhost:5001/complement-4254e/us-central1/app/test",
    headers: {
        "Authorization": "Basic ",
        "Content-Type": "multipart/form-data"
    }
};

//========================POST Request for upload==================================
var queryText = "hello"

const optionPOSTupload = {
    method: "POST",
    url: "http://localhost:5001/complement-4254e/us-central1/app/sendToFirebase",
    headers: {
        "Authorization": "Basic ",
        "Content-Type": "multipart/form-data"
    },
    formData : {
        "input" : queryText
    }
};

//========================POST Request for fetch==================================
var queryText = "hello"

const optionPOSTretrieve = {
    method: "POST",
    url: "http://localhost:5001/complement-4254e/us-central1/app/test/getFromFirebase",
    headers: {
        "Authorization": "Basic ",
        "Content-Type": "multipart/form-data"
    },
    formData : {
        "input" : queryText
    }
};

//========================Upload questions==================================
var queryText = {   
                    worldID:"World-1",
                    section: "1-1",
                    difficulty: "hard",
                    questions: "What is log(base 2) 16",
                    options: [3,4,7,1],
                    answer: 0
                }

const optionInitializeQuestions = {
    method: "POST",
    url: "http://localhost:5001/complement-4254e/us-central1/app/addQuestion",
    headers: {
        "Authorization": "Basic ",
        "Content-Type": "application/json;charset=utf-8"
    },
    body : JSON.stringify(queryText)
    
};


//========================Get Stars /player/world==================================
var queryText = {   
    worldID:"World-1",
    playerID: "U1720925C",
};

const optionGetStars = {
    method: "GET",
    url: "http://localhost:5001/complement-4254e/us-central1/app/getStar",
    headers: {
    "Authorization": "Basic ",
    "Content-Type": "application/json;charset=utf-8"
    },
    body : JSON.stringify(queryText)

};


//========================Get question set per section==================================
var queryText = {   
    worldID:"World-1",
    sectionID: "1-1",
};

const optionGetQuestionSet = {
    method: "GET",
    url: "http://localhost:5001/complement-4254e/us-central1/app/russ/getques",
    headers: {
    "Authorization": "Basic ",
    "Content-Type": "application/json;charset=utf-8"
    },
    body : JSON.stringify(queryText)

};

request(optionGetQuestionSet, function (error, response, body){
    console.log(response.body);
})