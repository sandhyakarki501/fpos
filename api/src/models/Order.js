import mongoose from "mongoose";
import {
  ORDER_STATUS_PENDING,
  ORDER_STATUS_PREPARING,
  ORDER_STATUS_SERVED,
  ORDER_STATUS_COMPLETED,
  ORDER_STATUS_CANCELLED,
} from "../constants/orderStatus";

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
    enum: [
      ORDER_STATUS_PENDING,
      ORDER_STATUS_PREPARING,
      ORDER_STATUS_SERVED,
      ORDER_STATUS_COMPLETED,
      ORDER_STATUS_CANCELLED,
    ],
    default: ORDER_STATUS_PENDING,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: { type: Date, default: Date.now() },
});

export default mongoose.model("Order", orderSchema);
