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
var input = {
    name: 'John',
    surname: 'Smith'
};

const optionPOSTretrieve = {
    method: "POST",
    url: "http://localhost:5001/complement-4254e/us-central1/app/getFromFirebase",
    headers: {
        "Authorization": "Basic ",
        "Content-Type": 'application/json;charset=utf-8'
    },
    body: JSON.stringify(input)
};


/* Method to create Account */
const createAccount = {
    method: "POST",
    url: "http://localhost:5001/complement-4254e/us-central1/app/createAccount",
    headers: {
        "Authorization": "Basic ",
        "Content-Type": "multipart/form-data"
    },
    formData : {
        "input" : queryText
    }
};

/* Method to create records for each world */
const createWorld = {
    method: "POST",
    url: "http://localhost:5001/complement-4254e/us-central1/app/createWorld",
    headers: {
        "Authorization": "Basic ",
        "Content-Type": "multipart/form-data"
    },
    formData : {
        "input" : queryText
    }
};

request(createWorld, function (error, response, body){
    console.log(response.body);
})