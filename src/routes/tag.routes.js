import { Router } from "express";
import { createTag, getTags } from "../controllers/tagController.js";

const router = Router();

router.post("/tags", createTag);
router.get("/tags", getTags);

export default router;
