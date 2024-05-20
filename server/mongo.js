import mongoose from "mongoose";
mongoose.connnect('mongodb://localhost:27017/react-login-tet')
.then(()=>{
    console.log("mongodb connencted")
})
.catch(()=>{
    console.log('failend');
})

const newSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required:true
    }
})

const collection = mongoose.model("collection",newSchema)

module.exports = collection