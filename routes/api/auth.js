import User from "../../models/User.js";
import express from "express";
import bodyParser from "body-parser";
import auth from "../../middleware/auth.js";
import {check, validationResult} from "express-validator";
import jwt from "jsonwebtoken";
import config from "config";
import bcrypt from "bcryptjs"


const router = express.Router();
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json({extended:true}));

router.get("/", auth, async (req, res)=>{
    try{
        const user = await User.findOne({_id: req.user.id}).select('-password');
        res.json(user);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

// @route  POST /api/auth
// @desc Authenticate user and send token
router.post("/", [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
],async (req, res)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()}); 
    }
    else{
        const {email, password} = req.body;
        try{
            //See if user exists
            let user = await User.findOne({ email:email})
            if(!user){
                return res.status(400).json({errors: [{msg: "Invalid credentials"}]});
            }
            
            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch){
                return res.status(400).json({errors: [{msg: "Invalid Credentials"}]});
            }

            //Return jsonwebtoken
            const payload = {
                user: {
                    id:user.id
                }
            }

            jwt.sign(payload, config.get('jwtSecret'), {expiresIn: 3600000}, (err, token)=>{
                if(err)throw err;
                return res.json({token});
            });

        }
        catch(err){
            return res.status(500).send("Server Error");
        }

        

    }
})

export default router;