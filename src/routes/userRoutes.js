import express from "express";
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
} from "../controllers/userController.js";
import {
  createUserValidation,
  updateUserValidation,
  getByIdUserValidation
} from "../validators/userValidator.js";
import { validate } from "../middlewares/validate.js";

const router = express.Router();

router.post("/", createUserValidation, validate, createUser);
router.get("/", getUsers);
router.get("/:id", getByIdUserValidation, validate, getUserById);
router.put("/:id", updateUserValidation, validate, updateUser);
router.delete("/:id", getByIdUserValidation, validate, deleteUser);

export default router;
