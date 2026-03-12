import mongoose from "mongoose";

const blogSchema=new mongoose.Schema({
    image:{type:String, required:true},
    title:{type:String, required:true},
    description:{type:String,required:true},
    tags:{type:String,default:"All about kenyan music producers"},
    isFeatured:{type:Boolean,default:false}
},{minimize:false,timestamps:true});

const blogModel=mongoose.models.blog || mongoose.model("blog",blogSchema);

export default blogModel;