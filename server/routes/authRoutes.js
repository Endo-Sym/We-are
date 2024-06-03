const express = require('express');
const router = express.Router();
const cors = require('cors');
const User = require('../Model/user'); // Make sure the path to the User model is correct
const { SigninUser, SignupUser, getprofile, updateprofile, createUserDescription, showprofile, getAllProfiles } = require('../controllers/authController');

// Middleware
router.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}));

router.get('/api/check-new-user', async (req, res) => {
    const userId = req.query.userId;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isNewUser = !user.profileCompleted;
        res.json({ isNewUser });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

router.post("/Sign-up", SignupUser);
router.post("/Sign-in", SigninUser);
router.get("/profile", getprofile);
router.get("/allProfile", getAllProfiles);
router.get("/profile/:id", getprofile);
router.put("/profile", updateprofile);
router.post("/user-description", createUserDescription)
router.get('/profile/:userId', showprofile);
router.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logged out" });
});

module.exports = router;
