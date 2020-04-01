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
	let databaseRef = database.ref("Players");
	databaseRef.once("value", function(snapshot) {
		var dict = {};
		snapshot.forEach(function(Snapshot) {
			dict[Snapshot.key] = Snapshot.val();
		})
		res.end(JSON.stringify(dict));
    });
});

module.exports = router;
