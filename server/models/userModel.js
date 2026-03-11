import mongoose from "mongoose";


const UserSchema=new mongoose.Schema({
    avatar:{type:String,default:"https://www.flaticon.com/free-icon/cat_4322991"},
    first_name:{type:String},
    last_name:{type:String},
    username:{type:String,required:true,
        validate:{
            validator:(value)=>{
                return value.length<=10;
            },
            message:"length should be less than 10"
        }
    },
    phone:{type:String,required:[true,'Phone is required']},
    email:{type:String,unique:true,required:true},
    password:{type:String,required:true},
    bio:{type:String,default:"Update BIO"},
    role:{type:String,default:"user",required:true},
    isVerified:{type:Boolean,default:false},
    isFeatured:{type:Boolean,default:false},
    isActive:{type:Boolean,default:false},
    cart:{type:Object,default:{}}

},{minimize:false,timestamps:true})

const userModel=mongoose.models.user || mongoose.model("user",UserSchema);


export default userModel;


