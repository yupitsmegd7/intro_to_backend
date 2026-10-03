import mongoose from "mongoose";

const connectDB = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI is missing from environment variables");
        }

        const connectionInstance = await mongoose.connect(
            process.env.MONGODB_URI
        );

        console.log(
            `\nMONGODB connected!!! Host: ${connectionInstance.connection.host}`
        );
    } catch (error) {
        console.error("Connection Failed", error);
        process.exit(1);
    }
};

export default connectDB;

