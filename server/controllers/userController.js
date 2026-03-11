import userModel from "../models/userModel.js";
import { v2 as cloudinary } from "cloudinary";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import merchandiseModel from "../models/merchandiseModel.js";
import beatModel from "../models/beatModel.js";
import blogModel from "../models/blogModel.js";
import subscriberModel from "../models/subscriberModel.js";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

const registerUser = async (req, res) => {
  try {
    const { fname, lname, username, email, phone, role, password } = req.body;

    const exists = await userModel.findOne({ email });
    if (exists) {
      res.json({
        success: false,
        message: "User Already Exists",
      });
    }

    if (!req.files) {
      return res
        .status(400)
        .json({ success: false, message: "No files uploaded" });
    }

    const image = req.files.avatar && req.files.avatar[0];

    const result = await cloudinary.uploader.upload(image.path, {
      folder: "uploads/the_don/avatars",
      resource_type: "image",
    });

    const imageUrl = result.secure_url;

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = new userModel({
      avatar: imageUrl,
      first_name: fname,
      last_name: lname,
      username,
      email,
      phone,
      role,
      password: hash,
    });
    await user.save();

    const token = await createToken(user._id);

    res.json({
      success: true,
      message: "User created Successfully",
      user,
      token,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const exists = await userModel.findOne({ email });
    if (!exists) {
      res.json({
        success: false,
        message: "User does not exist",
      });
    }

    const isMatch = await bcrypt.compare(password, exists.password);

    if (!isMatch) {
      res.json({
        success: false,
        message: "Check your password and try again.",
      });
    }
    exists.isActive=true;
    await exists.save();
    //Or await userModel.findByIdAndUpdate(exists._id,{isActive:true})
    const token = await createToken(exists._id);
    const user=await userModel.findById(exists._id,{})
    res.json({
      success: true,
      message: "Login Successfull",
      token,
      user
     
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const fetchMerchandise=async(req,res)=>{
  try {
    const merchandise=await merchandiseModel.find({});
    res.json({
      success:true,
      message:"Merchandise Fetched Successfully.",
      merchandise
    })
    
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
}

const fetchBeats=async(req,res)=>{
  try {
    const beats=await beatModel.find({});
    res.json({
      success:true,
      message:"Beats Fetched Successfully.",
      beats
    })
    
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
}

const fetchBlogs=async(req,res)=>{
  try {
    const blogs=await blogModel.find({});
    res.json({
      success:true,
      message:"Blogs Fetched Successfully.",
      blogs
    })
    
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
}

const fetchArtists=async(req,res)=>{
  try {
    const artists=await userModel.find({role:"artist"});

    res.json({
      success:true,
      message:"Artists fetched successfully",
      artists
    })
    
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
}

const fetchProducers=async(req,res)=>{
  try {
    const producers=await userModel.find({role:"producer"});

    res.json({
      success:true,
      message:"Producers fetched successfully",
      producers
    })
    
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
}

const fetchUsers=async(req,res)=>{
  try {
    const users=await userModel.find({});
    res.json({
      success:true,
      message:"Users fetched successfully",
      users
    })
    
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
}

const subscribe=async(req,res)=>{
  try {
    const {email}=req.body;
    const exists=await subscriberModel.findOne({email});
    if(exists){
      res.json({
        success:false,
        message:"You are already a subscriber."
      })
    }
    const new_subscriber=await subscriberModel({
      email
    });
    const subscriber=await new_subscriber.save();

    res.json({
        success:true,
        message:"Thank you for subscribing.",
        subscriber
    })

  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
}

export { registerUser, loginUser,fetchMerchandise,fetchBeats,fetchBlogs,fetchArtists,fetchProducers,fetchUsers,subscribe };
