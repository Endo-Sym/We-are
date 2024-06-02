const UserDescription = require('../Model/user_description');

const createUserDescription = async (req, res) => {
    try {
        const { gender, birthdate, friendGender, dateGender, interests, userId } = req.body;

        const newUserDescription = new UserDescription({
            gender,
            birthdate,
            friendGender,
            dateGender,
            interests,
            userId
        });

        await newUserDescription.save();
        res.status(201).json({ message: 'User description saved successfully!', userDescription: newUserDescription});
    } catch (error) {
        console.error('Error saving user description:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getUserDescription = async (req, res) => {
    try {
        const userDescriptions = await UserDescription.find();
        res.status(200).json(userDescriptions);
    } catch (error) {
        console.error('Error fetching user descriptions:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    createUserDescription,
    getUserDescription,
};
