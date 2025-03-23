// models/UserModel.js
import mongoose from 'mongoose';
const mongoose = require('mongoose');

// Define the User Schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: false,
      unique: false,
      trim: true,
    },
    email: {
      type: String,
      required: false,
      unique: false,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: false,
      unique: false,
    },
    password: {
      type: String,
      required: false,
      minlength: 4, // Set a minimum password length for security
    },
    confirmPassword: {
      type: String,
      required: false,
    },
    
  },
);

// Create the User Model
const User = mongoose.model('User', userSchema);

export default User;

