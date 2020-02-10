const request = require('request')

//========================GET Request Template================================== 
const optionGET = {
    method: "GET",
    url: "http://localhost:5001/complement-4254e/us-central1/app/test",
    headers: {
        "Authorization": "Basic ",
        "Content-Type": "multipart/form-data"
    }
};

//========================getWorldIds Request================================== 
const optionGETWorldIds = {
    method: "GET",
    url: "http://localhost:5001/complement-4254e/us-central1/app/getWorldIds",
    headers: {
        "Authorization": "Basic ",
        "Content-Type": "multipart/form-data"
    }
};

//========================getQuestions Request================================== 
const optionGETQuestions = {
    method: "GET",
    url: "http://localhost:5001/complement-4254e/us-central1/app/getQuestions",
    headers: {
        "Authorization": "Basic ",
        "Content-Type": "multipart/form-data"
    }
};

//========================getStars Request================================== 
var queryText = "U1720925C"
const optionGETStars = {
    method: "GET",
    url: "http://localhost:5001/complement-4254e/us-central1/app/getStars",
    headers: {
        "Authorization": "Basic ",
        "Content-Type": "multipart/form-data"
    },
    formData : {
        "input" : queryText
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
    url: "http://localhost:5001/complement-4254e/us-central1/app/getFromFirebase",
    headers: {
        "Authorization": "Basic ",
        "Content-Type": "multipart/form-data"
    },
    formData : {
        "input" : queryText
    }
};

//======================== Initiating request ===========================
request(optionGETWorldIds, function (error, response, body){
    console.log(response.body);
})