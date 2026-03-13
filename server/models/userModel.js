import mongoose from "mongoose";


const UserSchema=new mongoose.Schema({
    avatar:{type:String,default:"https://www.flaticon.com/free-icon/cat_4322991"},
    first_name:{type:String},
    last_name:{type:String},
    username:{type:String,unique:true,required:true,
        validate:{
            validator:(value)=>{
                return value.length<=15;
            },
            message:"length should be less than 15"
        }
    },
    phone:{type:String,unique:true,required:[true,'Phone is required']},
    email:{type:String,unique:true,required:true},
    password:{type:String,required:true},
    bio:{type:String,default:"Update BIO"},
    role:{type:String,default:"user",required:true},
    latest_project:{type:String,default:"https://www.youtube.com/embed/h2WkSepEtFs?si=Pm5UYwDnuY5I-LUH"},
    instagram:{type:String,default:"https://www.instagram.com"},
    spotify:{type:String,default:"https://www.spotify.com"},
    itunes:{type:String,default:"https://www.itunes.com"},
    youtube:{type:String,default:"https://www.youtube.com"},
    whatsapp:{type:String,default:"https://www.whatsapp.com"},
    isVerified:{type:Boolean,default:false},
    isFeatured:{type:Boolean,default:false},
    isActive:{type:Boolean,default:false},
    cart:{type:Object,default:{}},
    followers:{type:Object,default:{}},
    following:{type:Object,default:{}}

},{minimize:false,timestamps:true})

const userModel=mongoose.models.user || mongoose.model("user",UserSchema);


export default userModel;


