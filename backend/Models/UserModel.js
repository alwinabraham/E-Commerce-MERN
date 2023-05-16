const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "First Name is Required"]
    },
    lastName:{
        type:String,
        required:[true, "Last Name is Required"]
    },
    email:{
        type:String,
        required:[true, "Email is Required"],
        unique:true,
    },
    password:{
        type:String,
        required:[true,"Password is Required"]
    },
    phoneno:{
        type:Number,
        required:[true,"Phone Number is Required"],
        unique:true,
    },
    address:{
        type:[String]
    },
    status:{
        type:String
    }
},{
    timestamps:true
});

userSchema.statics.login = async function(email,password){
    const user = await this.findOne({email});
    if(user){
        const auth = await bcrypt.compare(password, user.password)
        if(auth){
            return user;
        }
        throw Error("Incorrect password")
    }
    throw Error("Incorrect Email")
}

userSchema.statics.otp_login = async function(phoneno){
    const user = await this.findOne(phoneno);
    if(user){
        return user;        
    }
    throw Error("Incorrect Phoneno")
}

module.exports = mongoose.model("Users", userSchema)