import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "User name is required"],
        trim: true,
        minlength: 2,
        maxlength: 50
    },
    email: {
        type: String,
        required: [true, "User email is required"],
        trim: true,
        lowercase: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: 6
    }
}, {
    timestamps: true // This is correct
});

const User=mongoose.model("User",userSchema);
export default User;