import mongoose from "mongoose";

const merchandiseSchema=new mongoose.Schema({
    image:{type:Array,default:[],required:true},
    title:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:Number,required:true},
    quantity:{type:Number,required:true},
    isFeatured:{type:Boolean,default:false}
},{minimize:false,timestamps:true})

const merchandiseModel=mongoose.models.merchandise || mongoose.model('merchandise',merchandiseSchema);

export default merchandiseModel;