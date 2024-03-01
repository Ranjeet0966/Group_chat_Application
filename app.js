const path = require("path");
const cors = require("cors");

const User = require("./models/user");


const express=require("express");
const bodyParser = require("body-parser");

const sequelize= require("./util/database");

const app= express();

app.use(cors());

const userRoutes = require("./routes/user");
const msgRoutes = require("./routes/chat");
const Msg = require("./models/chat");

app.use(bodyParser.json({extended:false}));


app.use("/user",userRoutes);

app.use("/msg", msgRoutes);

User.hasMany(Msg);

sequelize
.sync().then((User)=>{
    // console.log(user);
    app.listen(4000);
})
.catch((err)=>{
    console.log(err);
})