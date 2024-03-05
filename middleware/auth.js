const jwt = require('jsonwebtoken');
const User = require('../models/user'); 

const authenticate = (req, res, next)=> {
    try{
        const token = req.header('Authorization');

        const user = jwt.verify(token, "9162255655");

        User.findByPk(user.userId)
        .then((user)=> {
            if(user){
                req.user = user;
                next();
            }
        })
        .catch((err)=> {
            throw new Error(err);
        })
    }
    catch(err){
        res.status(401).json({error: err})
    }
   
}

module.exports = {
    authenticate
}