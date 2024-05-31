const express = require('express');
const { createUserDescription, getUserDescription } = require('../controllers/userDescriptionController');

const router = express.Router();

router.post('/user-description', createUserDescription);
router.get('/user-description', getUserDescription);

module.exports = router;
