import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import cloudinary from "../lib/cloudinary.js";


export const signup = async (req, res) => {
  const { fullName, email, password, bio } = req.body;

  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ success: false, message: "Missing required details" });
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Account already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
      bio: bio || "", 
    });

    const token = generateToken(newUser._id);

    const userResponse = {
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      bio: newUser.bio,
      picturePro: newUser.picturePro,
    };

    res.status(201).json({
      success: true,
      userData: userResponse,
      token,
      message: "Account created successfully",
    });
  } catch (error) {
    console.log("Signup error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    const userData = await User.findOne({ email });
    if (!userData) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, userData.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const token = generateToken(userData._id);

    const userResponse = {
      _id: userData._id,
      fullName: userData.fullName,
      email: userData.email,
      bio: userData.bio,
      picturePro: userData.picturePro,
    };

    res.json({ 
      success: true, 
      userData: userResponse, 
      token, 
      message: "Login successful" 
    });
  } catch (error) {
    console.log("Login error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const checkAuth = (req, res) => {
  try {
    res.json({ success: true, user: req.user });
  } catch (error) {
    console.log("CheckAuth error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePic, bio, fullName } = req.body;
    const userId = req.user._id;
    let updatedUser;

    if (!profilePic) {
      updatedUser = await User.findByIdAndUpdate(
        userId, 
        { bio, fullName }, 
        { new: true }
      ).select("-password");
    } else {
      const upload = await cloudinary.uploader.upload(profilePic);
      
      updatedUser = await User.findByIdAndUpdate(
        userId, 
        { 
          picturePro: upload.secure_url, 
          bio, 
          fullName 
        }, 
        { new: true }
      ).select("-password"); 
    }

    res.json({ success: true, user: updatedUser });
  } catch (error) {
    console.log("UpdateProfile error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};