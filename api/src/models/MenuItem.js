import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema({
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  description: { type: String },
  imageUrls: { type: [String] },
  isActive: { type: Boolean, default: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stockQuantity: { type: Number, default: 0 },
});

export default mongoose.model("MenuItem", menuItemSchema);
