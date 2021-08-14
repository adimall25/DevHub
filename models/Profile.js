import mongoose from "mongoose";


const profileSchema = new mongoose.Schema({
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    company:String,
    location:String,
    status:String,
    skills:{
        type:[String],
        required:true
    },
    bio:String,
    githubUsername:String,
    experience:[
        {
            title:{
                type:String,
                required:true
            },
            company:{
                type:String,
                required:true
            },
            location:{
                type:String,
                required:true
            },
            from:{
                type:Date,
                required:true
            },
            to:{
                type:Date,
            },
            current:{
                type:Boolean,
                default:false
            },
            description:String
        }
    ],
    education:[
        {
            school:{
                type:String,
                required:true
            },
            degree:{
                type:String,
                required:true
            },
            fieldOfStudy:{
                type:String,
                required:true
            },
            from:{
                type:String,
                required:true
            },
            to:{
                type:Date,
            },
            current:{
                type:Boolean,
                default:false
            },
            description:String

        }
    ],
    social:{
        youtube:String,
        twitter:String,
        facebook:String,
        twitter:String,
        linkedin:String,
        instagram:String
    },
    date:{
        type:Date,
        default:Date.now
    }
});

const Profile = new mongoose.model('profile', profileSchema);

export default Profile;