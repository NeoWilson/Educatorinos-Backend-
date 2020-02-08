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

//============================Test upload to Firebase===================================

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
        lala:"adsa"
    }
    });
    res.end("upload complete");
});

//============================Test fetch from Firebase===================================

app.post("/getFromFirebase", (req,res)=>{
    console.log(req.body);

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

/* POST request to create user account */
app.post("/createAccount", (req, res) => {
    let userRef = database.ref("Players");

    const playerId = userRef.child(req.body.user_id);
    const playerName = req.body.name;
    const playerClass = req.body.class;

    playerId.set({
        class: playerClass,
        name: playerName,
        score: "0",
        current_progress: "1-1"
    });
    res.end("Account created");
});

/* POST request to create records in each world */
app.post("/createWorld", (req, res) => {
    let mapRef = database.ref("Maps");
    let playerRef = database.ref("Players");

    for(let x = 1; x <= 8; x++) {
        setTimeout(function() { 
            var world = mapRef.child("World " + x);
            for(let y = 1; y <= 8; y++) {
                setTimeout(function() { 
                    var section = world.child(x + "-" + y);
                    if(x == 1 && y == 1) {
                        playerRef.once("value", function(snapshot) {
                            snapshot.forEach(function(childSnapshot) {
                                var section_id = section.child(childSnapshot.key);
                                section_id.set({
                                    score: "0"
                                }); 
                            });
                        });
                    }
                    else{
                        var section_id = section.child("No data");        
                        section_id.set({
                            score: "-"
                        });
                    }
                }, 1000);
            }
        }, 1000);
    }
    res.end("World created");
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