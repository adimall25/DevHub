import express from "express";
import bodyParser from "body-parser";
import Post from "../../models/Post.js";
import User from "../../models/User.js";
import auth from "../../middleware/auth.js";
import {check, validationResult} from "express-validator";



const router = express.Router();
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json({extended:true}));

//@route  POST /api/posts/
//@desc   Create a new post
//@access private
router.post("/", [
    auth,
    [
        check('text', 'Text is requried').not().isEmpty(),
        check('title', 'Title is requried').not().isEmpty()
    ]
],
async (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()});
    }
    
    try{
        const user = await User.findOne({_id: req.user.id}).select('-password' );
        const newPost = new Post({
            title:req.body.title,
            text: req.body.text,
            name: user.name,
            avatar:user.avatar,
            user: req.user.id
        });

        const post = await newPost.save();
        return res.json(post);
    }
    catch(err){
        console.error(err.message);
        return res.status(500).send("Server Error");
    }
    
});


//@route  GET /api/posts/
//@desc   Get all posts
//@access private
router.get("/", auth, async (req, res) => {
    try{
        const posts = await Post.find({user: req.user.id}).sort([['date', -1]]);
        res.json(posts);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})


//@route  GET /api/posts/:post_id
//@desc   Get a post by its ID
//@access private
router.get("/:post_id", auth, async (req, res) => {
    try{
        const post = await Post.findOne({_id: req.params.post_id});
        if(!post){
            return res.status(400).json({msg: "Post not found"});
        }
        return res.json(post);
    }
    catch(err){
        if(err.kind === "ObjectId"){
            return res.status(400).json({msg: "Post not found"});
        }
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})


//@route  DELETE /api/posts/:post_id
//@desc   Delete a post by its ID
//@access private
router.delete("/:post_id", auth, async (req, res) => {
    
    try{
        const post = await Post.findById(req.params.post_id);
        if(post.user.toString() === req.user.id){
            await post.remove();
            return res.json({msg: "Post was deleted successfully"});
        }
        else{
            return res.status(401).json({msg: "User is not authorized to delete this post"});
        }
    }
    catch(err){
        if(err.kind === "ObjectId"){
            return res.status(400).json({msg: "Post not found"});
        }
        console.error(err.mesage);
        res.status(500).send("Server Error");
    }
})


//@route  PUT /api/posts/like/:post_id
//@desc   Like a post by its ID
//@access private
router.put("/like/:post_id", auth, async(req, res) => {
    try{
        const post = await Post.findById(req.params.post_id);

        //Check if already liked
        const index = post.likes.findIndex(obj => obj.user.toString() === req.user.id);
        if(index !== -1){
            console.log(index);
            return res.status(400).json({msg: "Post has already been liked"});
        }

        const newLike = {
            user:req.user.id
        }
        post.likes.unshift(newLike);
        await post.save();
        return res.json(post);
    }
    catch(err){
        return res.status(500).send("Server Error");
    }
})


//@route  PUT /api/posts/unlike/:post_id
//@desc   Unlike a post by its ID
//@access private
router.put("/unlike/:post_id", auth, async(req, res) => {
    try{
        const post = await Post.findById(req.params.post_id);

        //Check if not liked
        const index = post.likes.findIndex(obj => obj.user.toString() === req.user.id);
        if(index !== -1){
            post.likes.splice(index, 1);
            const updatedPost = await post.save();
            return res.json(updatedPost);
        }
        else{
            return res.status(400).json({msg: "Post was never liked"});
        }
    }
    catch(err){
        return res.status(500).send("Server Error");
    }
})



//@route  POST /api/posts/comment/:post_id
//@desc   Post a new comment on post
//@access private
router.post("/comments/:post_id", [
    auth,
    [
        check('text', 'Text is requried').not().isEmpty(),
    ]
],
async (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()});
    }
    
    try{
        const post = await Post.findById(req.params.post_id);
        const user = await User.findOne({_id: req.user.id}).select('-password' );
        const newComment = {
            user: user._id,
            text: req.body.text,
            name:user.name,
            avatar:user.avatar
        };
        post.comments.unshift(newComment);
        let updatedPost = await post.save();
        return res.json(updatedPost);
    }
    catch(err){
        if(err.kind === "ObjectId"){
            return res.status(400).json({msg: "Post not found"});
        }
        console.error(err.message);
        return res.status(500).send("Server Error");
    }
    
});


//@route  DELETE /api/posts/comments/:post_id/:comment_id
//@desc   Delete a comment from a post
//@access private
router.delete("/comments/:post_id/:comment_id", auth, async (req, res) => {
    try{
        const post = await Post.findById(req.params.post_id);
        const user = await User.findById(req.user.id);
        if(!post){
            return res.status(400).json({msg: "Post not found"});
        }

        const index = post.comments.findIndex(comment => comment._id.toString() === req.params.comment_id);
        if(index === -1){
            return res.status(400).json({msg: "Comment not found"});
        }

        if(post.comments[index].user.toString() !== req.user.id){
            return res.status(401).json({msg: "User is not authorised to delete this comment"});
        }
        post.comments.splice(index, 1);
        const updatedPost = await post.save();
        return res.json({msg: "Comment deleted successfully"});
    }
    catch(err){
        if(err.kind === "ObjectId"){
            return res.status(400).json({msg: "Comment or post not found"});
        }
        if(err){
            console.error(err.message);
            return res.status(500).send("Server Error");
        }
    }
    
})

export default router;