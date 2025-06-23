import mongoose from "mongoose";

export async function connect(){
    try{
        await mongoose.connect(process.env.MONGO_DB_URI!)
        const connection = mongoose.connection
        connection.on('connected',()=>{
            console.log("MongoDB connected successfully")
        })
        connection.on('error', (err) => {
            console.error("MongoDB connection error:", err);
            process.exit()
        })
    } catch(err){
        console.error("Failed to connect to MongoDB:", err);
    }
}