/* Initialization */
const functions = require('firebase-functions');
const admin = require("firebase-admin");
const express = require('express');
const russRouter = require('./routes/apiRuss');
const testRouter = require('./routes/apiTest');
const elricRouter = require('./routes/apiElric');
const wilsonRouter = require('./routes/apiWilson');
const wanyingRouter = require('./routes/apiWanYing');
const app = express();
// const port = 3005;

var serviceAccount = require("../functions/private/complement-4254e-firebase-adminsdk-i34zx-589c173735.json")
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://complement-4254e.firebaseio.com"
});
const database = admin.database();

app.set('database', database);

<<<<<<< HEAD
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
    let payload = []
    let databaseRef = database.ref("Maps")
    databaseRef = databaseRef.child(worldID)
    databaseRef.once("value", function(snapshot){
        let maps = snapshot.val();
        snapshot.forEach(section=>{
                        payload.push(section)
        })
        res.json(payload);
    })
});

=======
app.use('/russ', russRouter);
app.use('/test', testRouter);
app.use('/elric', elricRouter);
app.use('/wilson', wilsonRouter);
app.use('/wy', wanyingRouter);
>>>>>>> 7801acc188347568cad5426cd7d155fdac34a857

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