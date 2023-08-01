const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const postRegister = async (req, res, next) => {
    try{
        const data=await userModel.create({...req.body,avatar:"https://cdn-icons-png.flaticon.com/512/1077/1077114.png"});
        console.log(data);
        res.status(201).json({message:"User Created"});
        }
        catch(err){
            console.log(err);
            res.status(400).json({message:err.message});
        }
};

const postLogin = async (req, res) => {
    // console.log(req.body);
    try {   
        const currentUser = await userModel.findOne({ email: req.body.email });
        if (currentUser) {
            const isPasswordCorrect = bcrypt.compareSync(
                req.body.password,
                currentUser.password
            );
            if (isPasswordCorrect) {
                const token = jwt.sign(
                    { id: currentUser._id },
                    process.env.jwt_secret
                );
                res.cookie('jwt', token, {
                    httpOnly: false,
                    maxAge: 24 * 60 * 60 * 1000
                  });
                res.status(200).json({ message: "User Logged In", token });
            } else {
                res.status(400).json({ message: "Password is Incorrect" });
            }
        }
        else {
            res.status(400).json({ message: "User not found" });
        }
    }
    catch (err) {
        res.status(400).json({ message:"server error" });
    }

};

const postAvatar=(req,res)=>{
    const data=req.body;
    const user=userModel.find({email:data.email});
    if(user){
        userModel.updateOne({email:data.email},{$set:{avatar:data.avatar}}).then(()=>{
            res.status(201).json({message:"Avatar Updated"});
        }).catch(err=>{
            res.status(400).json({message:err.message});
        })
    }
}
const getAllUsers=async(req,res)=>{
    try{
        const users=await userModel.find({},{password:0});
        // console.log(users)
        res.status(200).json({users});
    }
    catch(err){
        res.status(400).json({message:err.message});
    }
}
module.exports = { postRegister, postLogin,postAvatar,getAllUsers};
