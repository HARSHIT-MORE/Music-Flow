const mongoose=require("mongoose")

async function connectDB(){

    try {
        // console.log(process.env.MONGO_URI)
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected successfully");
        
    } catch (error) {
        console.error("Database connection error:",error);
        
    }
}

module.exports=connectDB;