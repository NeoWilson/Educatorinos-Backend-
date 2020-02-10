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
        lala:"adsa"
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

//============================Get Total Number of Players for given World===================================

app.get("/getWorldPopulation", (req,res)=>{

    let request = req.body
    let worldID = request.worldID
    let totalplayer = 0
    
    let databaseRef = database.ref("Maps")
    databaseRef = databaseRef.child(worldID)
    databaseRef.once("value", function(snapshot){
        let maps = snapshot.val();
        Object.keys(maps).forEach(section=>{
            if (typeof maps[section] !== 'undefined'){
                totalplayer = totalplayer + Object.keys(maps[section]).length;
            }
        })
        let payload = {worldPopulation: totalplayer}
        res.json(payload);
    })

});

//============================Get all Score for all Player given World===================================

app.get("/getLeaderboard", (req,res)=>{

    let request = req.body
    let worldID = request.worldID
    let payload= []
    let user = ""
    let ppl = ""
    let databaseRef = database.ref("Maps")
    databaseRef = databaseRef.child(worldID)
    databaseRef.once("value", function(snapshot){
        let maps = snapshot.val();
        snapshot.forEach(section=>{
            // if (typeof maps[section] !== 'undefined'){
                // let player = section.val();
                // var user = player.score
                // var score = section.score
                section.forEach(section=>{
                ppl = section
                payload.push(ppl)
                })
                // section.forEach(player=>{
                //     user = player
                    // if (typeof maps[player] !== 'undefined'){
                        // var score = player.score
                        // array.push(section)
                        // var playerId = section[player]
                        // console.log(player)
                        // payload[playerId].push(maps[player].score)
                        // payload = payload.push()
                        // totalscore = totalscore + parseInt(obj[wid][section][pid]['score'])
                    // }
                // let leaderboard = {user: score}
                // payload.push(leaderboard)
                // })
                // var playerId = maps[section]
                // payload = payload.push()
                // totalscore = totalscore + parseInt(obj[wid][section][pid]['score'])
            // }
        })
        res.json(payload);
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