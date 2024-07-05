import mongoose from "mongoose";
require('dotenv').config();

const databaseUrl: string = process.env.MONGODB_URI || '';

const connectDB = async () => {
    try {
        await mongoose.connect(databaseUrl).then
        ((data:any) =>  {
            console.log(`Database connected with ${data.connection.host}`);
        })   
    } catch (error: any) {
        console.error(`Database connection error: ${error}`);
        setTimeout(connectDB, 5000)
        process.exit(1);
    }
}

export default connectDB;
