const mongoose = require("mongoose");

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL)

        console.log("✅ MongoDB connected successfully.")
    }catch(e){
        console.log("❌ mongoDB connection failed");
        console.log(e.message)
        process.exit(1)
    }
}

module.exports = connectDB;