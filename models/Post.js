import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true
    },
    title:{
        type:String,
        required:true
    },
    text:{
        type:String,
        required:true
    },
    name:String,
    avatar:String,
    likes:[
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'users',
                required:true
            }
        }
    ],
    comments:[
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'users',
                required:true
            },
            text:{
                type:String,
                required:true
            },
            name:String,
            avatar:String,
            date:{
                type:Date,
                default:Date.now
            }
        }
    ],

    date:{
        type:Date,
        default:Date.now
    }
})

const Post = new mongoose.model('Post', postSchema);
export default Post;