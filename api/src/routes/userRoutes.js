import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateProfileImage,
  updateUser,
} from "../controllers/userController.js";
import auth from "../middlewares/auth.js";
import roleBasedAuth, {
  allowAdminOrSelf,
} from "../middlewares/roleBasedAuth.js";

const router = express.Router();

router.get("/", [auth, roleBasedAuth("ADMIN")], getAllUsers);

router.get("/:id", [auth, allowAdminOrSelf], getUserById);

router.post("/", [auth, roleBasedAuth("ADMIN")], createUser);

router.put("/:id", [auth, allowAdminOrSelf], updateUser);

router.delete("/:id", [auth, roleBasedAuth("ADMIN")], deleteUser);

router.put("/:id/profile-image", [auth, allowAdminOrSelf], updateProfileImage);

export default router;
