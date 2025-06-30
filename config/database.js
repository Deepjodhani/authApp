const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = ()=>{
    mongoose.connect(process.env.DATABASE_URL,
        // {
        //     useNewUrlParser : true,
        //     useUnifiedTopology : true
        // }
    )
    .then(()=>{
        console.log("Connection Succesfull");
    })
    .catch((err)=>{
        console.log("Connection FAiled");
        console.error(err);
        process.exit(1);
    })
}

module.exports = dbConnect;