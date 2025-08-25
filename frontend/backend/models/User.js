import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, trim: true, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: function() { return !this.googleId; } },
  role: { type: String, enum: ["student", "researcher", "professor"], default: "student" },
  googleId: { type: String }, // store Google sub ID
});

export default mongoose.model("User", userSchema);
