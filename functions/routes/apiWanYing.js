const express = require('express')
const router = express.Router()

router.get("/getWorldPopulation", (req,res)=>{
    let database = req.app.get('database');
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

router.get("/getLeaderboard", (req,res)=>{
    let database = req.app.get('database');
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

module.exports = router
