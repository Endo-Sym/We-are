import mongoose from "mongoose";

const user_descriptionSchema = new mongoose.Schema({
    user_description: {
        type: mongoose.Schema.Types.ObjectId,
        default: mongoose.Types.ObjectId,
        required: true,
        unique: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        default: mongoose.Types.ObjectId,
        ref: "User",
    },
    caption: {
        type: String,
    },
    school: {
        type: String,
    },
    work: {
        type: String,
    },
    address: {
        type: String,
    },
    gender: {
        type: String,
    },
    lookingfor:  {
        type: String,
    },
    interest:  {
        type: String,
    },
    language:  {
        type: String,
    },
    type_id: {
        type: mongoose.Schema.Types.ObjectId,
        default: mongoose.Types.ObjectId,
        required: true,
        unique: true,
        ref: "Type_description"
    }
});

const userdescription = mongoose.model("Description", user_descriptionSchema);

export default userdescription;
