import mongoose from "mongoose";
import config from "config";
const db = config.get("mongoURI");

const connectDB = async()=>{
    try{
        await mongoose.connect(db, {useNewUrlParser:true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false});
        console.log("Database connected");
    }
    catch(err){
        console.log(err.message);

        process.exit(1);
    }
    mongoose.connect(db);
}


export default connectDB;