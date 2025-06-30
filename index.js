const express = require("express");
const app = express();
require("dotenv").config();
const dbConnect = require("./config/database");
const user = require("./routers/user");



const PORT = process.env.PORT || 4000;
app.use(express.json());  
dbConnect();  

app.use("/api/v1", user);

app.listen(PORT,()=>{
    console.log(`I am listening at ${PORT}`);
}); 

