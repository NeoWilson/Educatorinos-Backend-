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

//========================POST Request==================================

var queryText = "hello"

const optionPOST = {
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

request(optionPOST, function (error, response, body){
    console.log(response.body);
})