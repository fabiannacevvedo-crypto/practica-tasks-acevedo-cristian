import express from "express";
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  assignTagsToTask
} from "../controllers/taskController.js";
import {
  createTaskValidation,
  updateTaskValidation,
  getByIdTaskValidation,
  assignTagsValidation
} from "../validators/taskValidator.js";
import { validate } from "../middlewares/validate.js";

const router = express.Router();

router.post("/", createTaskValidation, validate, createTask);
router.get("/", getTasks);
router.get("/:id", getByIdTaskValidation, validate, getTaskById);
router.put("/:id", updateTaskValidation, validate, updateTask);
router.delete("/:id", getByIdTaskValidation, validate, deleteTask);
router.post("/:id/tags", assignTagsValidation, validate, assignTagsToTask);

export default router;
