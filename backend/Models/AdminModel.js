const mongoose = require("mongoose")

const adminSchema = mongoose.Schema({
    email:{
        type:String,
        required:[true, "Email is Required"],
    },
    password:{
        type:String,
        required:[true, "Password is Required"],
    }
})

adminSchema.statics.login = async function(email,password){
    console.log(email);
    const user = await this.findOne({email});
    if(user){
        const auth = password == user.password
        console.log(auth);
        if(auth){
            return user;
        }
        throw Error("Incorrect password")
    }
    throw Error("Incorrect Email")
}

const AdminModal = mongoose.model("Admin", adminSchema)

module.exports = AdminModal