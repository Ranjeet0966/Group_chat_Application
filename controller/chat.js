const Msg = require("../models/chat");
const sequelize= require("../util/database");

exports.postmsg = async(req, res, next)=>{
    const msg = req.body.msg;
    try{
        const newMsg = await Msg.create({
            msg:msg,
            userId:req.user.id,

        });
        res.status(201).json({msg: newMsg, username:req.user.name});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({err:"Some error Occured"});
    }
};