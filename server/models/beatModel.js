import mongoose from "mongoose";

const beatSchema=new mongoose.Schema({
    thumbnail:{type:String,required:true},
    title:{type:String,required:true},
    description:{type:String,required:true},
    tags:{type:Object,default:{}},
    price:{type:Number,required:true},
    audio:{type:String,required:true},
    producer:{type:String,default:"the_don"},
    isFeatured:{type:Boolean,default:false}
},{minimize:false,timestamps:true})

const beatModel=mongoose.models.beat || mongoose.model("beat",beatSchema);

export default beatModel;