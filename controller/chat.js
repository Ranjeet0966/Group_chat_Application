const {Sequelize} = require("sequelize");
const ChatHistory = require('../models/ChatHistory')


exports.postMessage = async (req, res)=>{
    try{
        const user = req.user;
        const { message } = req.body;
        console.log(`>>>>>>>>>${user.id}`)
        const responseMssg = await ChatHistory.create({ message: message, userId: user.id })

        if (!message) {
            throw new Error('Something wrong in creating history') 
        }

        res.status(201).json({ success: true, message: responseMssg}); 
    }
    catch (err) {
        res.status(500).json(err || 'Something went wrong')
    } 
}

exports.getMessages = async (req, res) =>{
    try{
        const messages = await ChatHistory.findAll({
            attributes : ['message'],
            include:[{
                model:user,
                attributes:['username']
            }],
            order :[['updatedAt','ASC']]
        });
        res.status(200).json(messages);
    }
    catch (err) {
        res.status(500).json(err.message  || 'something wend wrong');

    }
};
