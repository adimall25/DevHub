import Profile from "../../models/Profile.js";
import User from "../../models/User.js";
import bodyParser from "body-parser";
import express from "express";
import auth from "../../middleware/auth.js";
import {check, validationResult} from "express-validator";
import request from "request";
import config from "config";


const router = express.Router();
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json({extended:true}));

//@route  GET /api/profile/me
//@desc   GET current user's profile
router.get("/me", auth, async (req, res)=>{
    try{
        const profile = await Profile.findOne({user: req.user.id}).populate({path: 'user', select: 'name avatar email _id'});
        console.log(profile);
        // console.log(req.user);
        if(!profile){
            return res.status(400).json({msg: 'There is no profile for this user'});
        }
        
        res.json(profile);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

//@route  GET /api/profile/user/:id
//@desc   GET profile by ID
router.get("/user/:id", auth, async (req, res)=>{
    try{
        const profile = await Profile.findOne({user: req.params.id}).populate({path: 'user', select: 'name avatar email _id'});
        console.log(profile);
        // console.log(req.user);
        if(!profile){
            return res.status(400).json({msg: 'There is no profile for this user'});
        }
        
        res.json(profile);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

//@route  POST /api/profile/
//@desc   create user's profile
router.post(
    '/', 
    [
        auth, 
        [
            check('status', 'Status is required').not().isEmpty(), 
            check('skills', 'Skills is required').not().isEmpty()
        ]
    ],
    async (req, res)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }

        const {
            company,
            website,
            location,
            bio,
            status,
            githubUsername,
            skills,
            youtube,
            facebook,
            twitter,
            instagram,
            linkedin
        } = req.body;

        //Get user
        const user = await User.findOne({_id: req.user.id});

        //Build Profile object
        const profileFields = {};
        profileFields.user = req.user.id;
        if(company) profileFields.company = company;
        if(website) profileFields.website = website;
        if(location) profileFields.location = location;
        if(bio) profileFields.bio = bio;
        if(status) profileFields.status = status;
        if(githubUsername) profileFields.githubUsername = githubUsername;
        if(skills){
            profileFields.skills = skills.split(",").map(skill => skill.trim());
        }
        //Build social object
        profileFields.social = {};
        if(youtube)profileFields.social.youtube = youtube;
        if(facebook)profileFields.social.facebook = facebook;
        if(linkedin)profileFields.social.linkedin = linkedin;
        if(twitter)profileFields.social.twitter = twitter;
        if(instagram)profileFields.social.instagram = instagram;
        // console.log("profileFields", profileFields);

        try{
            //Create
            let profile = new Profile(profileFields);
            await profile.save();
            res.json(profile.populate({path: 'user', select: 'name avatar email _id'}));
        }
        catch(err){
            console.error(err.message);
            res.status(500).json({msg: 'Server Error'});
        }
    }
)


//@route  PUT /api/profile/
//@desc   update user's profile
router.put(
    '/', 
    [
        auth, 
        [
            check('status', 'Status is required').not().isEmpty(), 
            check('skills', 'Skills is required').not().isEmpty()
        ]
    ],
    async (req, res)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }

        const {
            company,
            website,
            location,
            bio,
            status,
            githubUsername,
            skills,
            youtube,
            facebook,
            twitter,
            instagram,
            linkedin
        } = req.body;

        //Get user
        const user = await User.findOne({_id: req.user.id});

        //Build Profile object
        const profileFields = {};
        profileFields.user = req.user.id;
        if(company) profileFields.company = company;
        if(website) profileFields.website = website;
        if(location) profileFields.location = location;
        if(bio) profileFields.bio = bio;
        if(status) profileFields.status = status;
        if(githubUsername) profileFields.githubUsername = githubUsername;
        if(skills){
            profileFields.skills = skills.split(",").map(skill => skill.trim());
        }
        //Build social object
        profileFields.social = {};
        if(youtube)profileFields.social.youtube = youtube;
        if(facebook)profileFields.social.facebook = facebook;
        if(linkedin)profileFields.social.linkedin = linkedin;
        if(twitter)profileFields.social.twitter = twitter;
        if(instagram)profileFields.social.instagram = instagram;

        try{
            //Update
            let updatedProfile = await Profile.findOneAndUpdate({user:req.user.id}, {$set: profileFields}, {new: true}).populate({path: 'user', select: 'name avatar email _id'});
            return res.json(updatedProfile);
            
        }
        catch(err){
            console.error(err.message);
            res.status(500).json({msg: 'Server Error'});
        }
    }
)



//@route  GET /api/profile/
//@desc   Get all profiles
//@access Public
router.get("/", async (req, res)=>{
    try{
        let profiles = await Profile.find().populate({path: 'user', select: 'name avatar email _id'});
        res.json(profiles);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})


//@route  DELETE /api/profile/
//@desc   Delete profile, user and associated posts
//@access Private
router.delete("/", auth,  async (req, res) => {
    try{
        //Remove profile
        await Profile.findOneAndRemove({user: req.user.id});
        await User.findOneAndRemove({_id: req.user.id});
        res.json({msg: 'User deleted successfully'});
    }
    catch(err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})

//@route  GET /api/profile/github/:username
//@desc   Get user repositeries
//@access Public
router.get("/github/:username", async (req, res) => {
    try{
        const options = {
            uri:`https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get('githubClientId')}&client_secret=${config.get('githubSecret')}`,
            method:'GET',
            headers:{
                'user-agent':'node.js'
            }
        }
        request(options, (error, response, body) => {
            if(error)console.error(error.message);
            else{
                if(response.statusCode !== 200){
                    return res.status(400).json({msg: "Github profile not found"}); 
                }
                res.json(JSON.parse(body));
            }
        })
    }
    catch{
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})


//@route  PUT /api/profile/education
//@desc   Add profile education
//@access Private
router.put("/education", [
    auth,
        [
            check('school', 'School is required').not().isEmpty(),
            check('degree', 'Degree is required').not().isEmpty(),
            check('fieldOfStudy', 'Field of Study is required').not().isEmpty(),
            check('from', 'From date is required').not().isEmpty()
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors : errors.array()});
        }

        const {school, degree, fieldOfStudy, from, to, current, description} = req.body;

        const newEducation = {
            school, degree, fieldOfStudy, from, to, current, description
        }

        try{
            const profile = await Profile.findOne({user: req.user.id});
            profile.education.unshift(newEducation);
            await profile.save();
            res.json({profile});

        }
        catch(err){
            console.error(err.message);
            res.status(500).send("Server Error");
        }
})

//@route  DELETE /api/profile/education/:edu_id
//@desc   Delete profile education
//@access Private
router.delete("/education/:edu_id", auth, async (req, res) => {
    const profile = await Profile.findOne({user: req.user.id});
    let index = profile.education.findIndex(edu => edu._id === req.params.edu_id);
    profile.education.splice(index, 1);
    await profile.save();
    res.json(profile);
})


//@route  PUT /api/profile/experience
//@desc   Add profile experience
//@access Private
router.put("/experience", [
    auth,
        [
            check('title', 'Title is required').not().isEmpty(),
            check('company', 'Company is required').not().isEmpty(),
            check('from', 'From date is required').not().isEmpty()
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors : errors.array()});
        }

        const {title, company, location, from, to, current, description} = req.body;

        const newExperience = {
            title, company, location, from, to, current, description
        }

        try{
            const profile = await Profile.findOne({user: req.user.id});
            profile.experience.unshift(newExperience);
            await profile.save();
            res.json({profile});

        }
        catch(err){
            console.error(err.message);
            res.status(500).send("Server Error");
        }
})

//@route  DELETE /api/profile/experience/:experience_id
//@desc   Delete profile experience
//@access Private
router.delete("/experience/:exp_id", auth, async (req, res) => {
    const profile = await Profile.findOne({user: req.user.id});
    let index = profile.experience.findIndex(exp => exp._id === req.params.exp_id);
    profile.experience.splice(index, 1);
    await profile.save();
    res.json(profile);
})

export default router;