const express = require('express')
const router = express.Router()

//========Test upload to Firebasåe=============
/* POST request */
router.post("/sendToFirebase", (req, res) => { 
    let database = req.app.get('database');
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
        lala:"adsa",
        bye:"ll",
        try:"sda"
    }
    });
    res.end("upload complete");
});

//========Test fetch from Firebase==========
router.post("/getFromFirebase", (req,res)=>{

    let database = req.app.get('database');
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


module.exports = router

