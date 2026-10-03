
import express from "express";
import userRouter from "../routes/user.route.js";

const app = express();

// Middleware to parse JSON and URL-encoded payloads
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount user routes
app.use("/api/v1/users", userRouter);
//exam route: http://localhost:4000/api/v1/users/register
export default app;