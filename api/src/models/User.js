import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  address: {
    city: { type: String },
    country: { type: String },
    province: { type: String },
    street: { type: String },
  },
  createdAt: { type: Date, default: Date.now() },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  phone: { type: String, unique: true },
  password: { type: String, required: true },
  profileImageUrl: String,
  roles: {
    type: [String],
    default: ["USER"],
  },
});

export default mongoose.model("User", UserSchema);
