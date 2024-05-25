import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    text: {
        type: String,
        maxLength: 600
    },
    img: {
        type: String
    },
    likes: {
        type: Number,
        default: 0
    },
    replies: [
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
    userId: {  
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true });

const Post = mongoose.model("Post", postSchema);

export default Post;