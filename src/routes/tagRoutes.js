import express from "express";
import {
  createTag,
  getTags,
  getTagById,
  updateTag,
  deleteTag
} from "../controllers/tagController.js";
import {
  createTagValidation,
  updateTagValidation,
  getByIdTagValidation
} from "../validators/tagValidator.js";
import { validate } from "../middlewares/validate.js";

const router = express.Router();

router.post("/", createTagValidation, validate, createTag);
router.get("/", getTags);
router.get("/:id", getByIdTagValidation, validate, getTagById);
router.put("/:id", updateTagValidation, validate, updateTag);
router.delete("/:id", getByIdTagValidation, validate, deleteTag);

export default router;
