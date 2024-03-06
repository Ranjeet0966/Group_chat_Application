const path = require("path");
const cors = require("cors");
const http= require('http');
const {createServer}= require('node:http');
const {Server}=  require('socket.io');
const multer = require('multer');


const User = require("./models/user");


const express=require("express");
const bodyParser = require("body-parser");

const sequelize= require("./util/database");
const Msg = require("./models/ChatHistory");
// const User = require("./models/user");
const ForgotPasswordRequests= require("./models/forgotpassword");
const Group= require('./models/Group');
const Groupmember = require('./models/Groupmember');



const app= express();
const server = createServer(app);

const io= new Server(server);
app.use(cors());

const userRoutes = require("./routes/user");
const msgRoutes = require("./routes/chat");
const forgotPasswordRouter = require("./routes/password");
const ChatHistory = require("./models/ChatHistory");


app.use(bodyParser.json({extended:false}));

io.on('connection', (socket) =>{
    socket.on('message', (mssgDetails, groupId)=>{
        io.emit('message',mssgDetails, groupId);
    })

    socket.on('groupUpdates', (updatedGroupDetails)=>{
        io.emit('groupUpdates', updatedGroupDetails);
       })

})


app.use("/user",userRoutes);

app.use("/msg", msgRoutes);

app.use("/password", forgotPasswordRouter);

User.hasMany(Msg);

Msg.belongsTo(User);

User.hasMany(ForgotPasswordRequests);
ForgotPasswordRequests.belongsTo(User);

Group.belongsToMany(User,{through:Groupmember});
User.belongsToMany(Group,{through: Groupmember});
Group.hasMany(ChatHistory,{onDelete: 'CASCADE'});
ChatHistory.belongsTo(Group);

sequelize
.sync().then((User)=>{
    // console.log(user);
    // app.listen(4000);
    server.listen(4000);
})
.catch((err)=>{
    console.log(err);
})