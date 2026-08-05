require("dotenv").config({ quiet: true });
// console.log("MONGO_URI:", process.env.MONGO_URI);
const app=require("./src/app");
const connectDB=require("./src/db/db")

const cors=require("cors")
connectDB();

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
    
})