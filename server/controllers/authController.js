const User = require('../Model/user');
const UserDescription = require('../Model/user_description');
const { hashPassword, comparePassword } = require('../password/password_manager');
const jwt = require('jsonwebtoken');
const { createSecretToken } = require('../tokenGeneration/generateToken');
const mongoose = require('mongoose');

const test = (req, res) => {
    res.json("test is working");
};

const SignupUser = async (req, res) => {
    try {
        const { name, username, email, password } = req.body;

        if (!name) {
            return res.status(400).json({
                error: "Name is required"
            });
        }
        if (!username) {
            return res.status(400).json({
                error: "Username is required"
            });
        }
        if (!password || password.length < 8) {
            return res.status(400).json({
                error: "Password is required and should be at least 8 characters long"
            });
        }

        const exist = await User.findOne({ email });
        if (exist) {
            return res.status(400).json({
                error: "Email is already used"
            });
        }
        const hashedPassword = await hashPassword(password);

        const user = await User.create({
            name,
            username,
            email,
            password: hashedPassword,
            profileCompleted: false 
        });
     
        return res.status(201).json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Internal Server Error"
        });
    }
};

const SigninUser = async (req, res) => {
    try {
        const { identifier, password } = req.body;

        const user = await User.findOne({
            $or: [
                { email: identifier },
                { username: identifier }
            ]
        });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(401).json({ error: "Password does not match" });
        }

        const token = createSecretToken(user._id);
        res.cookie("token", token, {
            path: "/", // Cookie is accessible from all paths
            expires: new Date(Date.now() + 86400000), // Cookie expires in 1 day
            secure: false, // Cookie will only be sent over HTTPS
            httpOnly: false, // Cookie cannot be accessed via client-side scripts
            sameSite: "None",
        });

        res.json(user);

        // const token = jwt.sign(
        //     { email: user.email, id: user._id, username: user.username },
        //     process.env.JWT_SECRET,
        //     {},
        //     (err, token) => {
        //         if (err) throw err;
        //         res.cookie("token", token).json(user);
        //     }
        // );

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};




// const getprofile = async (req, res) => {
//     const { id } = req.params;
//     const { token } = req.cookies;

//     try {
//         let user;

//         if (mongoose.isValidObjectId(id)) {
//             user = await User.findOne({ _id: id }).select("-password -updatedAt");
//         } else if (token) {
//             jwt.verify(token, process.env.JWT_SECRET, {}, (err, decoded) => {
//                 if (err) throw err;
//                 user = User.findOne({ _id: decoded.id }).select("-password -updatedAt");
//                 res.json(user);
//             });
//         };

//         return res.status(404).json({ error: "User not found" });

//     } catch (err) {
//         res.status(500).json({ error: err.message });
//         console.log("Error in getUserProfile: ", err.message);
//     }
// };

const getprofile = async (req, res) => {
    const { id } = req.params;
    const { token } = req.cookies;

    try {
        let user;

        if (id) {
            if (mongoose.Types.ObjectId.isValid(id)) {
                user = await User.findOne({ _id: id }).select("-password -updatedAt");
                
            } else {
                user = await User.findOne({ username: id }).select("-password -updatedAt");
            }
        } else if (token) {
            // Verify the token
            jwt.verify(token, process.env.JWT_SECRET, {}, async (err, decoded) => {
                if (err) {
                    return res.status(401).json({ error: "Invalid token" });
                }
                user = await User.findById(decoded.id).select("-password -updatedAt");
                return await fetchUserDescription(user, res);
                // res.json(user);
            });
            // Return here to avoid sending response multiple times
            return;
        } else if (!token) {
            return res.status(401).json({ error: "Token not provided" });
        }

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        return await fetchUserDescription(user, res);
        // res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log("Error in getUserProfile: ", err.message);
    }
};

const getAllProfiles = async (req, res) => {
    try {
        // Fetch all users excluding sensitive information
        const users = await User.find().select("-password -updatedAt");

        // Fetch descriptions for all users
        const userDescriptions = await UserDescription.find({
            userId: { $in: users.map(user => user._id) }
        });

        // Create a map for quick lookup of user descriptions
        const descriptionsMap = userDescriptions.reduce((map, desc) => {
            map[desc.userId] = desc;
            return map;
        }, {});

        // Combine user data with their descriptions
        const combinedUsers = users.map(user => {
            const userObject = user.toObject();
            const description = descriptionsMap[user._id.toString()];
            return {
                ...userObject,
                ...(description ? description.toObject() : {})
            };
        });

        res.json(combinedUsers);
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log("Error in getAllProfiles: ", err.message);
    }
};

const fetchUserDescription = async (user, res) => {
    try {
        const userDescription = await UserDescription.findOne({ userId: user._id });

        const combinedUser = {
            ...user.toObject(),
            ...(userDescription ? userDescription.toObject() : {})
        };

        res.json(combinedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log("Error in fetchAndRespond: ", err.message);
    }
};

const updateprofile = async (req, res) => {
    const profile = req.body;
    const userId = profile.userId;

    const userFields = {
        name: profile.name,
        imgUrl: profile.imgUrl
    };

    const userDescriptionFields = {
        status: profile.status,
        gender: profile.gender,
        lookingFor: profile.lookingFor,
        friendGender: profile.friendGender,
        dateGender: profile.dateGender,
        type: profile.type,
        interests: profile.interests,
        contact: profile.contact,
        country: profile.country
    };
    
    try {
        const updatedUser = await User.findByIdAndUpdate(userId, userFields, { new: true }).select("-password -updatedAt");

        if (!updatedUser) {
            return res.status(400).json({ error: "User not found" });
        }

        const updatedUserDescription = await UserDescription.findOneAndUpdate(
            { userId: userId },
            userDescriptionFields,
            { new: true }
        );

        const combinedUserProfile = {
            ...updatedUser.toObject(),
            ...updatedUserDescription.toObject()
        };

        return res.json(combinedUserProfile);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

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

        const updatedUser = await User.findByIdAndUpdate(userId, { profileCompleted: true }, { new: true }).select("-password -updatedAt");

        await newUserDescription.save();
        res.status(201).json({ message: 'User description saved successfully!', userDescription: newUserDescription, user: updatedUser});
    } catch (error) {
        console.error('Error saving user description:', error);
        res.status(500).json({ error: error.message });
    }
};

const showprofile = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // ป้องกันไม่ให้ส่งข้อมูลที่สำคัญหรือเป็นความลับ
        const { password, ...profileData } = user.toObject();

        res.json(profileData);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


module.exports = {
    test,
    SignupUser,
    SigninUser,
    getprofile,
    updateprofile,
    createUserDescription,
    showprofile,
    getAllProfiles
};
