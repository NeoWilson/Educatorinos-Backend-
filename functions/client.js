const request = require('request')

//========================GET Request================================== 
const optionGET = {
    method: "GET",
    url: "http://localhost:5001/complement-4254e/us-central1/app//test",
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
    url: "http://localhost:5001/complement-4254e/us-central1/app/getFromFirebase",
    headers: {
        "Authorization": "Basic ",
        "Content-Type": "multipart/form-data"
    },
    formData : {
        "input" : queryText
    }
};



//========================Get Total Number of Players per world==================================
var queryText = {   
    worldID:"World-1",
};

const optionGetWorldPopulation = {
    method: "GET",
    url: "http://localhost:5001/complement-4254e/us-central1/app/getWorldPopulation",
    headers: {
    "Authorization": "Basic ",
    "Content-Type": "application/json;charset=utf-8"
    },
    body : JSON.stringify(queryText)

};

//========================Get All User and Score Earned per world==================================
var queryText = {   
    worldID:"World-1",
};

const optionGetLeaderboard = {
    method: "GET",
    url: "http://localhost:5001/complement-4254e/us-central1/app/getLeaderboard",
    headers: {
    "Authorization": "Basic ",
    "Content-Type": "application/json;charset=utf-8"
    },
    body : JSON.stringify(queryText)

};


request(optionGetLeaderboard, function (error, response, body){
    console.log(response.body);
})