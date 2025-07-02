const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next)=>{
    try {
         const token = req.body.token;

         if(!token){
            return res.status(401).json({
                success:false,
                message:"Token  missing"
            });
            
            try {
                
                const decode = jwt.verify(token, process.env.JWT_SECRET);
                console.log(decode);    
                req.user = decode;
            } catch (err) {
                return res.status(401).json({
                    success:false,
                    message:"token"
                });
            }

            next();

         }
    } catch (err) {
        return res.status(401).json({
            success:false,
            message:"Something went wrong"
        })
    }
}



exports.isStudent = (req, res, next)=>{
    try {
        if(req.user.role!= "Student"){
            return res.status(401).json({
                success:false,
                message:"Only students are allowed"
            })
        }
        next();

    } catch (err) {
        return res.status(401).json({
            success:false,
            message:"User role is not satisfied"
        })
    }
}

exports.isAdmin = (req, res, next)=>{
    try {
        if(req.user.role!= "Admin"){
            return res.status(401).json({
                success:false,
                message:"Only admins are allowed"
            })
        }
        next();

    } catch (err) {
        return res.status(401).json({
            success:false,
            message:"User role is not satisfied"
        })
    }
}



