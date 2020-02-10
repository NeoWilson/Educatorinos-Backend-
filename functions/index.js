/* Initialization */
const functions = require('firebase-functions');
const admin = require("firebase-admin");
const express = require('express');
const app = express();
const port = 3005;

/* Admin account initialization */
var serviceAccount = require("../functions/private/complement-4254e-firebase-adminsdk-i34zx-589c173735.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://complement-4254e.firebaseio.com"
});
const database = admin.database();

//===================================Test GET Request=========================================

/* GET request */
app.get("/test", (req, res)=>{
    // res.send("hi");
    res.end("bye");
});

//============================Test upload to Firebasåe===================================

/* POST request */
app.post("/sendToFirebase", (req, res) => { 
    let databaseRef = database.ref("structure");
    var usersRef = databaseRef.child("users");
    usersRef.set({
    alanisawesome: {
        date_of_birth: "June 23, 1912",
        full_name: "Alan Turing"
    },
    gracehop: {
        date_of_birth: "December 9, 1906",
        full_name: "Grace Hopper",
        address: "",
        lala:"adsa",
        bye:"ll",
        try:"sda"
    }
    });
    res.end("upload complete");
});

//============================Test fetch from Firebase===================================

app.post("/getFromFirebase", (req,res)=>{

	let databaseRef = database.ref("structure");
	databaseRef = databaseRef.child("users");

	databaseRef.once("value", function(snapshot) {
		var array = [];
		snapshot.forEach(function(childSnapshot) {
			array.push(childSnapshot);
		});
		res.setHeader("Content-Type", "application/json");
		res.end(JSON.stringify(array));
		return;
	});
    
});


//============================Upload questions to Firebase===================================

app.post("/addQuestion", (req, res) => {

    let request = req.body
    let worldID = request.worldID
    let sectionID = request.section
    let difficulty = request.difficulty

    let question = request.questions
    let options = request.options
    let answer = request.answer

    let databaseRef = database.ref("QuestionBank");
    databaseRef = databaseRef.child(worldID);
    databaseRef = databaseRef.child(sectionID);
    databaseRef = databaseRef.child(difficulty);

    databaseRef.push({  
        question: question,
        options: options,
        answer: answer 
    });
    res.end("upload complete");
});

//============================Get Player score for world===================================


function constructpayload(pid, wid, obj){
    let totalscore = 0
    Object.keys(obj[wid]).forEach(section=>{
        if (typeof obj[wid][section][pid] !== 'undefined'){
            totalscore = totalscore + parseInt(obj[wid][section][pid]['score'])
        }
    })

    let payload = {user: pid, score: totalscore}

    return payload
}

app.get("/getStar", (req,res)=>{

    let request = req.body
    let playerID = request.playerID
    let worldID = request.worldID
    let payload = ""

	let databaseRef = database.ref("Maps");

	databaseRef.once("value", function(snapshot) {
        let worldObj = snapshot.val();
        payload = constructpayload(playerID, worldID, worldObj)
		res.json(payload);
	})
    
});

//============================Get Player score for world===================================

app.get("/getques", (req,res)=>{

    let request = req.body
    let worldID = request.worldID
    let sectionID = request.sectionID
    
    let databaseRef = database.ref("QuestionBank")
    databaseRef = databaseRef.child(worldID)
    databaseRef = databaseRef.child(sectionID)
    databaseRef.once("value", function(snapshot){
        let queslist = snapshot.val();
        res.json(queslist);
    })

});

exports.app = functions.https.onRequest(app);

//======================================================================================
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// app.listen(port, function(){
//     console.log("Listening to Port "+ port);
// });
//======================================================================================