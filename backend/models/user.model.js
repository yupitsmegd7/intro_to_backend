import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            minLength: 2,
            maxLength: 30
        },
        password: {
            type: String,
            required: true,
            minLength: 6,
            maxLength: 30
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            minLength: 11,
            maxLength: 30
        }
    },
    {
        timestamps: true
    }
);

// Before saving any password we need to hash it
userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
});

// Comparing passwords
userSchema.methods.comparePassword = async function (password) {
    if (this.password === password) return true;
    return await bcrypt.compare(password, this.password);
};

export const User = mongoose.model("User", userSchema);