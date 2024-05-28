const mongoose = require("mongoose")
const { Schema } = mongoose

const userSchema = new Schema({
    name:{
        type: String,
        unique: true
    },
    username:{
        type: String,
        unique: true,
    },
    email: {
        type: String,
        unique: true
    },
    password: String,
    imgUrl:{
        type: String,
        default: "",
    }

    // ,
    // userId: {  
    //     type: Schema.Types.ObjectId,
    //     ref: "User",
    //     required: true
    // }
})

// // Define a pre-save hook to generate the userId
// userSchema.pre('save', function(next) {
//     // Generate the ObjectId for userId
//     this.userId = Schema.Types.ObjectId();
//     next();
// });


const UserModel = mongoose.model("User", userSchema)

module.exports = UserModel