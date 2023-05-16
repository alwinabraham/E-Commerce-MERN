const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const app = express()
const mongoose = require("mongoose")
const authRoutes = require("./Routes/AuthRoutes")
const adminRoutes = require("./Routes/AdminRoutes")

app.listen(4000,()=>{
    console.log("Server Started at 4000")
})

mongoose
    .connect("mongodb://localhost:27017/SneakerData",{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(()=>{
        console.log("DB connection Successful");
    }).catch(err=>{
        console.log(err.message);
})


app.use(
    cors({
        origin:["http://localhost:5173"],
        methods:["GET","POST"],
        credentials:true
    })
)

app.use(express.json());
app.use(cookieParser())

app.use("/",authRoutes)
app.use("/admin",adminRoutes)
