const express = require("express");
const router = express.Router();


router.get("/getWorldIds", (req,res)=>{
	let database = req.app.get('database');

	let databaseRef = database.ref("Maps");

	databaseRef.once("value", function(snapshot) {
		var array = [];
		snapshot.forEach(function(Snapshot) {
			array.push(Snapshot.key);
		})
		res.end(JSON.stringify(array));
    });
});

router.get("/getGlobalLeaderboard", (req,res)=>{
	let database = req.app.get('database');
	let databaseRef = database.ref("Students");

	databaseRef.once("value", function(snapshot) {
		var dict = {};
		snapshot.forEach(function(Snapshot) {
			dict[Snapshot.key] = Snapshot.val();
			let filename = dict[Snapshot.key].avatar_url + ".jpg"
			dict[Snapshot.key].avatar_url = `https://storage.googleapis.com/complement-4254e.appspot.com/${filename}`
		})
		
		res.end(JSON.stringify(dict));
    });
    // res.setHeader("Content-Type", "application/json");
    // res.end(JSON.stringify(array));
    // return;
});

module.exports = router;
