/* Initialization */
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const russRouter = require("./routes/apiRuss");
const testRouter = require("./routes/apiTest");
const elricRouter = require("./routes/apiElric");
const wilsonRouter = require("./routes/apiWilson");
const wanyingRouter = require("./routes/apiWanYing");
const app = express();
// const port = 3005;
app.use(require("cors")({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var serviceAccount = require("../functions/private/complement-4254e-firebase-adminsdk-i34zx-589c173735.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // credential: admin.credential.applicationDefault(),
  databaseURL: "https://complement-4254e.firebaseio.com",
  storageBucket: "complement-4254e.appspot.com",
});

const database = admin.database();
const storage = admin.storage();
const bucket = storage.bucket();

app.set("database", database);
app.set("bucket", bucket);

app.use("/russ", russRouter);
app.use("/test", testRouter);
app.use("/elric", elricRouter);
app.use("/wilson", wilsonRouter);
app.use("/wy", wanyingRouter);

// async function genAvatarUrl(avatarid){

// 	let filename = avatarid + ".jpg"
// 	let file = bucket.file(filename);

// 	await file.makePublic();

// 	return `https://storage.googleapis.com/complement-4254e.appspot.com/${filename}`

// }

// for (let i = 1; i< 7;i++){
//     genAvatarUrl("Avatar"+i).then((val)=>{
//         console.log(val);
//     })
// }

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
