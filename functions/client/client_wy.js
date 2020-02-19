const request = require('request')

//========================Get Total Number of Players per world==================================
var queryText = {   
    worldID:"World-1",
};

const optionGetWorldPopulation = {
    method: "GET",
    url: "http://localhost:5001/complement-4254e/us-central1/app/wy/getWorldPopulation",
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
    url: "http://localhost:5001/complement-4254e/us-central1/app/wy/getLeaderboard",
    headers: {
    "Authorization": "Basic ",
    "Content-Type": "application/json;charset=utf-8"
    },
    body : JSON.stringify(queryText)

};


request(optionGetWorldPopulation, function (error, response, body){
    console.log(response.body);
})