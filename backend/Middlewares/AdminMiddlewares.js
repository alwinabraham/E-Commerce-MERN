const AdminModal = require("../Models/AdminModel")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")

dotenv.config()

const secretJwt = process.env.SECRET_JWT

module.exports.checkAdmin = (req,res,next) => {
    const token = req.cookies.adminjwt;
    if(token){
        jwt.verify(token, secretJwt,async(err,decodedToken)=>{
            if(err){
                res.json({status:false, err:err})
            }else{
                const user = await AdminModal.findById(decodedToken.id);
                if(user) res.json({status: true, user: user})
                else res.json({status: false});
            }
        })
    }else{
        res.json({status:false});
    }
}