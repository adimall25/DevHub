import User from "../../models/User.js";
import bodyParser from "body-parser";
import express from "express";
import {check, validationResult} from "express-validator";
import gravatar from "gravatar";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "config";

const router = express.Router();
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json({extended:true}));

//Register user
//Route : /api/users
router.post("/", [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Please enter a password with 6 or more characters').isLength({min: 6})
    ],
    async (req, res)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()}); 
        }
        else{
            const {name, email, password} = req.body;
            try{
                //See if user exists
                let user = await User.findOne({ email:email})
                if(user){
                    return res.status(400).json({errors: [{msg: "User already exists"}]});
                }

                //Get user's gravatar
                const avatar = gravatar.url(email, {
                    s: '200',
                    r: 'pg',
                    d: 'mm'
                })
                
                user = new User({name, email, password, avatar});

                //Create a salt for password
                const salt = await bcrypt.genSalt(10);

                //Encrypt the password
                user.password = await bcrypt.hash(password, salt);

                await user.save();

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