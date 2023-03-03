const app = require("express");
const router = app.Router();

router.get("/join",(req,res)=>{
    console.log("join path");
    res.send("join")
})

router.get("/chat",(req,res)=>{

    console.log("chat path");

});


module.exports = router;