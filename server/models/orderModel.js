import mongoose from "mongoose";

const orderSchema=new mongoose.Schema({
    userId:{type:String,required:true},
    user:{type:Object,default:{},required:true},
    items:{type:Array,default:[]},
    reference:{type:String,unique:true},
    amount:{type:Number,required:true},
    address:{type:Object,default:{}},
    paymentStatus:{type:Boolean,default:false},
    status:{type:String,default:'order placed'},
    paymentMethod:{type:String},
    date:{type:Date,default:Date.now()},
},{minimize:false,timestamps:true});

const orderModel=mongoose.models.order || mongoose.model("order",orderSchema);


export default orderModel;