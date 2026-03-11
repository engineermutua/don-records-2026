import {v2 as cloudinary} from 'cloudinary'
import merchandiseModel from '../models/merchandiseModel.js';
import beatModel from '../models/beatModel.js';
import blogModel from '../models/blogModel.js';
import { response } from 'express';
import adminRouter from '../routes/adminRoute.js';
import jwt from 'jsonwebtoken';


const admin_email=process.env.ADMIN_EMAIL;
const admin_password=process.env.ADMIN_PASSWORD;
const jwt_secret=process.env.JWT_SECRET;

const createToken=(email)=>{
    return jwt.sign({email},jwt_secret,{expiresIn:"1h"})
}

const addMerchandise=async(req,res)=>{
    try {
        const {title,description,price,quantity}=req.body;

        if(!req.files){
            res.json({
                success:false,
                message:"No files uploaded"
            })
        }

        const image1=req.files.image1 && req.files.image1[0];
        const image2=req.files.image2 && req.files.image2[0];
       
        const images=[image1,image2].filter((item)=>item !==undefined);

        let imagesUrl=await Promise.all(
            images.map(async(item)=>{
                let result=await cloudinary.uploader.upload(
                    item.path,{
                        folder:"uploads/the_don/merchandise",
                        resource_type:"image"
                    }
                )
                return result.secure_url
            })
        )

        const new_merchandise=new merchandiseModel({
            image:imagesUrl,
            title,
            description,
            quantity,
            price
        });

        const merchandise=await new_merchandise.save();

        if(!merchandise){
            res.json({
                success:false,
                message:"Failed to add merchandise."
            });
        }

        res.json({
            success:true,
            message:"Mechandise added successfully",
            merchandise
        })
        
    } catch (error) {
        res.json({
            success:false,
            message:error.message
        })
    }
}


const addBeat=async(req,res)=>{
    try {

        const {title,description,price,tags}=req.body;

        if(!req.files){
            res.json({
                success:false,
                message:"No files uploaded"
            })
        }

        const thumbnail=req.files.thumbnail && req.files.thumbnail[0];
        const audio=req.files.audio && req.files.audio[0];

        const result = await cloudinary.uploader.upload(thumbnail.path, {
              folder: "uploads/the_don/beats/thumbnails",
              resource_type: "image",
        });
        
        const imageUrl = result.secure_url;

        const response = await cloudinary.uploader.upload(audio.path, {
              folder: "uploads/the_don/beats/audio",
              resource_type: "video",
        });
        
        const audioUrl = response.secure_url;

        const new_beat=await beatModel({
            thumbnail:imageUrl,
            title,
            description,
            price,
            tags,
            audio:audioUrl
        });

        const beat=await new_beat.save();

        if(!beat){
            res.json({
                success:false,
                message:"Could not upload the beat!"
            })
        }
        res.json({
            success:true,
            message:"Beat uploaded successfully.",
            beat
        });

    } catch (error) {
        res.json({
            success:false,
            message:error.message
        })
    }
}


const addBlog=async(req,res)=>{
    try {
        const {title,description}=req.body;
        if(!req.files){
            res.json({
                success:false,
                message:"No files uploaded"
            })
        }
        const image=req.files.image && req.files.image[0];
        
        let result=await cloudinary.uploader.upload(image.path,
            {
                folder:"uploads/the_don/blogs",
                resource_type:"image"
        });

        const imageUrl=result.secure_url;

        const new_blog=new blogModel({
            image:imageUrl,
            title,
            description
        })

        const blog=await new_blog.save();

        if(!blog){
            res.json({
                success:false,
                message:"Could not save blog."
            })
        }
        res.json({
            success:true,
            message:"Blog created successfully.",
            blog
        })
    } catch (error) {
        res.json({
            success:false,
            message:error.message
        })
    }
}

const adminLogin=async(req,res)=>{
    try {
        const {email,password}=req.body;
        const admin_email=process.env.ADMIN_EMAIL;
        const admin_password=process.env.ADMIN_PASSWORD;

        if(email==admin_email){
            if(password==admin_password){
                const token=await createToken(email);
                res.json({
                    success:true,
                    message:"login successful",
                    token
                })
            }
            res.json({
                success:false,
                message:"Invalid password"
            })
        }
        res.json({
            success:false,
            message:"Check email"
        })
        
    } catch (error) {
        res.json({
            success:false,
            message:error.message
        })
    }
}

const updateMerchandise=async(req,res)=>{
    try {
        const {merchandiseId}=req.params;

        const merchandise=await merchandiseModel.findByIdAndUpdate(merchandiseId,{isFeatured:true},{new:true});


        if(!merchandise){
            res.json({
                success:false,
                message:"Merchandise not found"
            })
        }

        res.json({
            success:true,
            message:"Status Updated Successfully",
            merchandise
        })
        
    } catch (error) {
        res.json({
            success:false,
            message:error.message
        })
    }
}

const deleteMerchandise=async(req,res)=>{
    try {
        const {merchandiseId}=req.params;
        const merchandise=await merchandiseModel.findByIdAndDelete(merchandiseId);
        if(!merchandise){
            res.json({
                success:false,
                message:"Could not delete product."
            })
        }
        
        res.json({
            success:true,
            message:"Product deleted successfully.",
            merchandise
        })
    } catch (error) {
        res.json({
            success:false,
            message:error.message
        })
    }
}


export {addMerchandise,addBeat,addBlog,adminLogin,deleteMerchandise,updateMerchandise}