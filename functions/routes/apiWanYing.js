const express = require('express')
const router = express.Router()

router.get("/getWorldPopulation", (req,res)=>{
    let database = req.app.get('database');
    let request = req.body
    let worldID = request.worldID
   

    let worldRef = database.ref("Maps").child(worldID)
    worldRef.once("value", function(snapshot){
        let world = snapshot.val();
        let userArr = []
        // let totalplayer = 0

        // console.log(maps)
        Object.keys(world).forEach(section=>{
            if (typeof world[section] !== 'undefined'){
                // if (section.nam)
                let sections = world[section]
                // let dict = {}
                // console.log(sections)
                Object.keys(sections).forEach(user=>{
                    // score = user["score"]
                    if(userArr.indexOf(user) === -1){
                        // dict[user] = parseInt(world[section][user]["score"]);
                        userArr.push(user)
                        // totalplayer += 1
                        console.log(userArr.length)
                    }
                
                    // console.log(world[section][user]["score"])
                    // console.log(user)
                })
                // console.log(section.value)
                // totalplayer = totalplayer + Object.keys(world[section]).length;    
            }
        });
        // console.log(dict);
        // console.log(totalplayer)
        let payload = {worldPopulation: userArr.length}
        res.json(payload);
    })


});

router.get("/getLeaderboard", (req,res)=>{
    let database = req.app.get('database');
    let request = req.body
    let worldID = request.worldID
    let payload = []
    let worldRef = database.ref("Maps").child(worldID)
    worldRef.once("value", function(snapshot){
        let world = snapshot.val();
        let dict = {}

        // console.log(maps)
        Object.keys(world).forEach(section=>{
            if (typeof world[section] !== 'undefined'){
                // if (section.nam)
                let sections = world[section]
                // let dict = {}
                // console.log(sections)
                Object.keys(sections).forEach(user=>{
                    // score = user["score"]
                    if(!(user in dict)){
                        dict[user] = parseInt(world[section][user]["score"]);
                    }
                    else{
                        dict[user] += parseInt(world[section][user]["score"]);
                    }
                    // console.log(world[section][user]["score"])
                    // console.log(user)
                })
                // console.log(section.value)
                // totalplayer = totalplayer + Object.keys(world[section]).length;    
            }
        });
        console.log(dict);
        res.json(dict);
    })
});

module.exports = router
