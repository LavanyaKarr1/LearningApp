require('dotenv').config();
const express = require('express');
const connectToDB = require('./Database/db');
const publicRoutes =require('./routes/public-routes');
const userRoutes=require('./routes/user-routes');
const commonRoutes=require('./routes/common-routes');
const reportsRoutes=require("./routes/reports-routes")
const cors = require('cors');

//for reading cookies
const cookieParser = require('cookie-parser');

const app=express();
const Port = process.env.Port || 3000;

const allowedOrigin=["http://172.16.118.46:3000","http://localhost:3000","http://localhost:3001"];
app.use(cors({
    origin: allowedOrigin,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))

//cookies middleware
app.use(cookieParser());

//database
connectToDB();

//middleware
app.use(express.json());

//routes
app.use('/learningApp',publicRoutes)
app.use('/learningApp',userRoutes)
app.use('/learningApp',commonRoutes)
app.use("/learningApp",reportsRoutes)

app.listen(Port,()=>{
    console.log(`server is now running on port ${Port}`);
    
});