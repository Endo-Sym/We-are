const mongoose = require('mongoose');

const userDescriptionSchema = new mongoose.Schema({
    role: {
        type: String,
        default: ""
    },
    status: {
        type: String,
        default: ""
    },
    address: {
        type: String,
        default: ""
    },
    gender: {
        type: String,
        default: ""
    },
    birthdate: {
        type: Date,
        default: "0000-00-00"
    },
    lookingFor: {
        type: String,
        default: ""
    },
    friendGender: {
        type: String,
        default: ""
    },
    dateGender: {
        type: String,
        default: ""
    },
    type: {
        type: String,
        default: ""
    },
    interests: [{
        type: String,
        default: ""
    }],
    followers: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    love: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true,
        ref: "User"
    }

});

const UserDescription = mongoose.model('UserDescription', userDescriptionSchema);

module.exports = UserDescription;
