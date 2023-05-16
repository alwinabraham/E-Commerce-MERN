const UserModel = require("../Models/UserModel");
const dotenv = require("dotenv")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")

dotenv.config()

const maxAge = 1*24*60*60

const secretJwt = process.env.SECRET_JWT

const createToken = (id) =>{
    return jwt.sign({id}, secretJwt,{
        expiresIn:maxAge
    })
};


const handleErrors = (err) =>{
    let errors = {name:"",email:"",password:"",phoneno:""}; 

    if(err.message === "Incorrect Name") 
        errors.email = "That name is not registered"
    if(err.message === "Incorrect Email") 
        errors.email = "That email is not registered"
    if(err.message === "Incorrect password")
        errors.email = "That password is incorrect"
    if(err.code===11000){
        errors.email = "Email Or Phone Number is already registered";
        return errors;
    }
    if(err.message.includes("Users validation failed")){
        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path] = properties.message
        })
    }
    return errors;
}
 
module.exports.login = async (req,res,next)=>{

    try{
        const {email,password} = req.body;
        const user = await UserModel.login(email, password)
        const token = createToken(user._id);

        res.cookie("jwt",token,{
            withCredentials:true,
            httpOnly: false,
            maxAge:maxAge*1000
        })        
        res.status(200).json({user:user._id, created:true})
    }catch(err){
        const error = handleErrors(err)
        res.json({error,created: false})
    }
}

module.exports.otp_login = async(req,res,next)=>{
    try{
        const {phoneno} = req.body;
        const user = await UserModel.otp_login(phoneno)
        const token = createToken(user._id);

        res.cookie("jwt",token,{
            withCredentials:true,
            httpOnly: false,
            maxAge:maxAge*1000
        })
        res.status(200).json({user:user._id, created:true})
    }catch(err){
        const errors = handleErrors(err)
        res.json({errors,created: false})
    }
}

module.exports.register = async (req,res,next)=>{
    
    const name = req.body.name
    const lastName = req.body.lastName
    const email = req.body.email
    let password = req.body.password
    const phoneno = req.body.phoneno
    const status = "Block"

    try{
        const salt = await bcrypt.genSalt();
        password = await bcrypt.hash(password,salt)
        const post = await UserModel.create({
            name,
            lastName,
            email,
            password,
            phoneno,
            status,
        })

        const token = createToken(post._id);
            res.cookie("jwt",token,{
            withCredentials:true,
            httpOnly: false,
            maxAge:maxAge*1000
        })
        res.status(201).json({user:post._id, created:true}) 
    }catch(err){
        console.log(err);
        const errors = handleErrors(err)
        res.json({errors,created: false})
    }
}