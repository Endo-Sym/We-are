const mongoose= require("mongoose")
const {Schema} = mongoose

const postSchema = new mongoose.Schema({
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    tags: {
        type: String,
        default: ''
    },
    heading: {
        type: String,
        maxLength: 100
    },
    description: {
        type: String,
        maxLength: 600
    },
    imgUrl: {
        type: String,
        default: ''
    },
    likes: {
        type: Number,
        default: 0
    },
    comments: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true
            },
            text: {
                type: String,
                required: true
            },
            ProfilePicture: {
                type: String
            },
            username: {
                type: String
            }
        }
    ],
    shares: {
        type: Number,
        default: 0
    }
    // ,
    // userId: {  
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User",
    //     required: true
    // }
}, { timestamps: true });

const Post = mongoose.model("Post", postSchema);

module.exports = Post