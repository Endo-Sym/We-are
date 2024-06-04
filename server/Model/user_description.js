const mongoose = require('mongoose');

const userDescriptionSchema = new mongoose.Schema({
    contact: {
        type: String,
        default: ""
    },
    country: {
        type: String,
        default: ""
    },
    status: {
        type: String,
        default: ""
    },
    gender: {
        type: String,
        default: ""
    },
    birthdate: {
        type: Date,
        default: new Date('1970-01-01')
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
