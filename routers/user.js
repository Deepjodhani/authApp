const express = require("express");
const router = express.Router();

const {login, signup} = require("../controllers/Auth");
const  {auth, isStudent, isAdmin} = require("../middleware/auth");


router.post("/login", login);
router.post("/signup/", signup);
router.get("/student",auth, isStudent, (req,res)=>{
    return res.json({
        success:true, 
        message:"Welcome Students"
    });
});

router.get("/admin",auth, isAdmin, (req,res)=>{
    return res.json({
        success:true, 
        message:"Welcome Sir!!!"
    });
    

})
module.exports = router;
