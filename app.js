const path = require("path");
const cors = require("cors");

const User = require("./models/user");


const express=require("express");
const bodyParser = require("body-parser");

const sequelize= require("./util/database");
const Msg = require("./models/ChatHistory");
// const User = require("./models/user");
const ForgotPasswordRequests= require("./models/forgotpassword");



const app= express();

app.use(cors());

const userRoutes = require("./routes/user");
const msgRoutes = require("./routes/chat");
const forgotPasswordRouter = require("./routes/password");


app.use(bodyParser.json({extended:false}));


app.use("/user",userRoutes);

app.use("/msg", msgRoutes);

app.use("/password", forgotPasswordRouter);

User.hasMany(Msg);

Msg.belongsTo(User);

User.hasMany(ForgotPasswordRequests);
ForgotPasswordRequests.belongsTo(User);

sequelize
.sync().then((User)=>{
    // console.log(user);
    app.listen(4000);
})
.catch((err)=>{
    console.log(err);
})