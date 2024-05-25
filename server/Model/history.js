import mongoose from "mongoose";

const historySchema = new mongoose.Schema({
    history_id: {
        type: mongoose.Schema.Types.ObjectId,
        default: mongoose.Types.ObjectId,
        required: true,
        unique: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    result_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Result",
        required: true,
        unique: true
    }
});

const History = mongoose.model("History", historySchema);

export default History;
