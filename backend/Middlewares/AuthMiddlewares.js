const User = require("../Models/UserModel")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")

dotenv.config()

const secretJwt = process.env.SECRET_JWT

module.exports.checkUser = (req,res,next) => {
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token,secretJwt,async(err,decodedToken)=>{
            if(err){
                res.json({status:false, err:err})
            }else{
                const user = await User.findById(decodedToken.id);
                if(user) res.json({status: true, user: user})
                // else if(user.status) res.json({status:false})
                else res.json({status: false});
            }
        })
    }else{
        res.json({status:false});
    }
}
module.exports.checkStatus = (req,res,next) =>{
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token,secretJwt,async(err,decodedToken)=>{
            if(err){
                res.json({status:false, err:err})
            }else{
                const user = await User.findById(decodedToken.id);
                if(user) res.json({status: true, user: user})
                else if(user.status) res.json({status:false})
                else res.json({status: false});
            }
        })
    }else{
        res.json({status:false});
    }  
}