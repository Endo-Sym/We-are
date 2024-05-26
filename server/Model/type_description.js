import mongoose from "mongoose";

const type_descriptionSchema = new mongoose.Schema({
    type_description: {
        type: mongoose.Schema.Types.ObjectId,
        default: mongoose.Types.ObjectId,
        required: true,
    },
    type_id: {
        type: mongoose.Schema.Types.ObjectId,
        default: mongoose.Types.ObjectId,
        required: true,
    },
    type: {
        type: varchar(4),
        required: true,
    },
    description: {
        type: Object,
    }
});

const type_descriptionscription = mongoose.model("Type_description",type_descriptionSchema);

export default userdescription;
