import { Router } from "express";
import { createProfile, getProfiles } from "../controllers/profileController.js";

const router = Router();

router.post("/profiles", createProfile);
router.get("/profiles", getProfiles);

export default router;
