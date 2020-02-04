const functions = require('firebase-functions');
const express = require('express');
const app = express();
const port = 3005;
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// app.listen(port, function(){
//     console.log("Listening to Port "+ port);
// });

app.get("/test", (req, res)=>{
    // res.send("hi");
    res.end("bye");
})

exports.app = functions.https.onRequest(app);