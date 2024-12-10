import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,

    },
    name:{
        type:String,
        default:"",

    },
    profileUrl:{
        type:String,
        required:true,

    },
    avatarUrl:{
        type:String,   
    },
    likedProfiles:{
        type:[String],
        default:[],
    },
    likedBy:[
        {
            username:{
                type:String,
                required:true,
            },
            avatarUrl:{
                type:String,   
            },
            likedDate:{
                type:Date,
                default:Date.now
            },

        }
    ]

},{timestamps:true});
//createdAt and Updated At time

const User = mongoose.model("User",userSchema);
//model is basically an interface which allows operations on the provided schema

export default User;