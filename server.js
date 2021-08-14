import connectDB from "./config/db.js";
import express from "express";
import usersRouter from "./routes/api/users.js";
import postsRouter from "./routes/api/posts.js";
import profileRouter from "./routes/api/profile.js";
import authRouter from "./routes/api/auth.js";
import bodyParser from "body-parser";

connectDB();
const app = express();


//Define routes
app.use('/api/users', usersRouter);
app.use('/api/posts', postsRouter);
app.use('/api/profile', profileRouter);
app.use('/api/auth', authRouter);
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json({extended:true}));

app.get("/", (req, res)=>{
    res.send("API Running");
})
const PORT = process.env.PORT || 8000;

app.listen(PORT, ()=>{console.log(`Server started on port : ${PORT}`)});