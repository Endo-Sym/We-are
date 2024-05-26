import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
    result_id: {
        type: mongoose.Schema.Types.ObjectId,
        default: mongoose.Types.ObjectId,
        required: true,
        unique: true
    },
    text: {
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

const result = mongoose.model("Result", resultSchema);

export default History;
