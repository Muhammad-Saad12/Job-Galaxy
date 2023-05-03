const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');



// User registration
router.post('/register', userController.registerUser);

// User login
router.post('/login', userController.loginUser);

// User profile update
router.put('/profile/:userId', userController.updateUserProfile);

// get all users
router.get('/getAllusers',userController.viewUsers);

module.exports = router;
