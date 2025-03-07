import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import multer from "multer";

import authRoutes from "./routes/authRoutes.js";
import connectCloudinary from "./config/cloudinary.js";
import connectDB from "./config/database.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
connectDB();
connectCloudinary();

const upload = multer({ storage: multer.memoryStorage() });

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

dotenv.config();

app.use(cors());

app.get("/", (req, res) => {
  res.json({
    name: "Restaurant POS",
    port: PORT,
    status: "ok",
    version: "1.0.0",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", upload.single("image"), userRoutes);

export default app;
