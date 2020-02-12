const express = require('express')
const router = express.Router()

router.get("/getWorldIds", (req,res)=>{
    let database = req.app.get('database');
	let databaseRef = database.ref("Maps");

	databaseRef.once("value", function(snapshot) {
		var array = [];
		snapshot.forEach(function(Snapshot) {
			array.push(Snapshot.key);
		});
		res.setHeader("Content-Type", "application/json");
		res.end(JSON.stringify(array));
		return;
    });
});

module.exports = router
