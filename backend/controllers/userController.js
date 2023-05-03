const User = require('../models/UserProfile');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require("dotenv").config();



const authMiddleware = (allowedUserTypes) => {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Authentication failed: Missing token' });
    }
    
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.userId;
      req.userType = decoded.userType;

      if (!allowedUserTypes.includes(req.userType)) {
        return res.status(403).json({ message: 'Access denied: User not authorized to access this resource' });
        
      }

      next();
    } catch (error) {
      return res.status(401).json({ message: 'Authentication failed: Invalid token' });
      
    }
  };
};

const viewUsers=async(req,res)=>{
 
  const users = await User.find();
  res.send(users);
    
}

const registerUser = async (req, res) => {
  try {
    const { name, email, password, userType, contactDetails } = req.body;

    if (!name || !email || !password || !userType || !contactDetails) {
      return res.status(401).json({ message: 'Please fill all the fields' });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(402).json({ message: 'User already exists' });
    }                                                         

    const user = new User({
      name,
      email,
      password,
      userType,
      contactDetails,
    });
    console.log(user);                                                                            
    await user.save();
   
    

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user' });
    console.log(error);
  }
};


const updateUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, email, contactDetails,password } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { name, email, contactDetails,password },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User profile updated successfully' });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error updating user profile' });
  }
};


const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    

    if(user.email==email && user.password==password){
      const token = jwt.sign({ userId: user._id, userType: user.userType,email:user.email }, process.env.JWT_SECRET);


      res.status(200).json({ token, message: 'User logged in successfully',user });

    }
    else{
      return res.status(401).json({ message: 'Incorrect email or password' });
    }

   
  } catch (error) {
    res.status(500).json({ message: 'Error logging in user' });
    console.log(error);
  }
};





module.exports = { registerUser, loginUser, updateUserProfile,viewUsers,authMiddleware };
