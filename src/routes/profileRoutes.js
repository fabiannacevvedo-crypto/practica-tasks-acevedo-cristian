import express from "express";
import {
  createProfile,
  getProfiles,
  getProfileById,
  updateProfile,
  deleteProfile
} from "../controllers/profileController.js";
import {
  createProfileValidation,
  updateProfileValidation,
  getByIdProfileValidation
} from "../validators/profileValidator.js";
import { validate } from "../middlewares/validate.js";

const router = express.Router();

router.post("/", createProfileValidation, validate, createProfile);
router.get("/", getProfiles);
router.get("/:id", getByIdProfileValidation, validate, getProfileById);
router.put("/:id", updateProfileValidation, validate, updateProfile);
router.delete("/:id", getByIdProfileValidation, validate, deleteProfile);

export default router;
