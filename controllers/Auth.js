const bcrypt = require("bcrypt");
const user = require("../models/Users");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signup = async (req,res)=>{
    try {
        const {name, email, password, role} = req.body;
        const details = await user.findOne({email});
        if(details){
           return res.status(400).json({
            success:false,
            message:"Try to login because you have already signup"
           });
        }

        let hashPassword;
        try {
            hashPassword = await bcrypt.hash(password, 10);
        } catch (err) {
            res.status(500).json({
                success:false,
                message:"The hash not generated"
            });
        }

        const users = user.create({
            name,email,password:hashPassword,role
        });

        res.status(200).json({
            message:"signup successfull",
            success:true
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message:"Failed to signup",
            success:false
        })
    }
}


exports.login = async (req,res)=>{

    try {
        const{name,email,password,role} = req.body;
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Fill the details"
            })
        }
        
        const detail = await user.findOne({email});
        if(!detail){
            return res.status(401).json({
                success:true,
                message:"You need to signup first"
            })
        }

        const payload = {
            email:detail.email,
            id:detail._id,
            role:detail.role
        }

        if(await bcrypt.compare(password,detail.password)){
            let token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"2h"});


             const options = {
                expiresIn : new Date(Date.now + 3 * 24 * 60 * 60 * 1000),
                httpOnly:true,
            }
                         
                 let userDetails = detail.toObject();
                 userDetails.token = token;
                  userDetails.password = undefined;


           
            res.cookie("token",token,options).status(200).json({
                success:true,
                detail:userDetails,
                token,
                message:"Logged in "
            });
        }
        else{
            return res.status(403).json({
                success:true,
                message:"Incorrect password or email"
            })
        }
    } catch (err) {
        console.error(err);
        return res.status(400).json({
        success:false,
        message:"Failed to login"
    });
    }
}