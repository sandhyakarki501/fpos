import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  orderNumber: { type: String, unique: true, required: true },
  tableNumber: { type: Number },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  items: [
    {
      menuItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MenuItem",
        required: true,
      },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "preparing", "served", "completed", "cancelled"],
    default: "pending",
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: { type: Date, default: Date.now() },
});

export default mongoose.model("Order", orderSchema);
