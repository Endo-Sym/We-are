const mongoose = require('mongoose');

const userDescriptionSchema = new mongoose.Schema({
    gender: String,
    birthdate: Date,
    friendGender: String,
    dateGender: String,
    interests: [String],
});

const UserDescription = mongoose.model('UserDescription', userDescriptionSchema);

module.exports = UserDescription;
