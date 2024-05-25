const mongoose= require("mongoose")
const {Schema} = mongoose

const userSchema = new Schema({
    name:{
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    username:{
        type: String,
        unique: true,
    },
    password: String,
    ProfilePicture:{
        type: String,
        default: "",
    },
    

})

const UserModel = mongoose.model("User", userSchema)

module.exports = UserModel