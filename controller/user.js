
const User = require("../models/user")

const bcrypt = require('bcrypt');
 const jwt = require("jsonwebtoken");

 const isStringValid = (string)=> {
    if(string == undefined || string.length ===0)
    {
        return true;
    }
    else{
        return false;
    }
 }
 function generateAccessToken(id) {
    return jwt.sign({ userId: id }, "ranjeet");
  }
 
 exports.signup = async(req, res)=>{
    try{
        const {username, email, phone, password}= req.body;
        if(isStringValid(username)|| isStringValid(email)|| isStringValid(phone) || isStringValid(password)){
            return res.json({message:"please fill the fields"})
        }
        const existingUser = await User.count({where:{email}});
        if(existingUser){
            return res.json({message: "Email already exists"});
        }

        const saltrounds = 10;
        bcrypt.hash(password, saltrounds, async(err, hash)=>{
            await User.create({fullname, email, phoneno, password:hash})
            res.status(201).json({message: "User created successfully"})
        })
    }
    catch(error){
        console.log(error);
        res.status(409).json({message: error.message});
    }
};
 exports.login = async(req, res)=>{
    try {
        const { email, password } = req.body;
        if (isStringValid(email) || isStringValid(password)) {
            return res.json({ message: "Please fill the fields" });
        }

        const existingEmail = await User.findAll({ where: { email } });

        if (existingEmail.length > 0) {
            bcrypt.compare(password, existingEmail[0].password, (err, compareResult) => {
                if (err) {
                    throw new Error("Something went wrong")
                }
                if (compareResult === true) {
                    res.status(200).json({ message: "User logged in Successfully", token: generateAccessToken(existingEmail[0].id) });
                } else if (password !== compareResult) {
                    return res.json({ message: "Password is incorrect" });
                }
            });
        } else {
            return res.json({ message: "User not registered" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" }); // Handle unexpected errors
    }
 }


 exports.getUser = (req, res)=>{
    try{
        const user = req.user;
        const userDetails={
            username: user.username,
            userId:user.id,
        }
        res.status(200).json(userDetails);
    }
    catch (err) {
        res.status(500).jason('Something is fishy');

    }
 }