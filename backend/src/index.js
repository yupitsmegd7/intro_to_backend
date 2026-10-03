import dotenv from "dotenv";
import connectDB from "./config/database.js";
import app from "./app.js";

dotenv.config({
    path: "./.env"
});

const startServer = async () => {
    try {
        console.log(
            "Mongo URI loaded:",
            !!process.env.MONGODB_URI
        );

        console.log("Attempting MongoDB connection...");

        await connectDB();

        console.log("MongoDB connection finished");

        const PORT = process.env.PORT || 8000;

        const server = app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

        server.on("error", (error) => {
            console.error("SERVER ERROR:", error);
        });

    } catch (error) {
        console.error("Server startup failed!!", error);
        process.exit(1);
    }
};

startServer();