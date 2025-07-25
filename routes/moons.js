// routes/moons.js
import express from "express";
import {
  getAllMoons,
  getMoonById,
  createMoon,
  updateMoon,
  deleteMoon,
} from "../controllers/moonsController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getAllMoons);
router.get("/:id", getMoonById);
router.post("/", isAuthenticated, createMoon);
router.put("/:id", isAuthenticated, updateMoon);
router.delete("/:id", isAuthenticated, deleteMoon);

export default router;
