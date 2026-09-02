import { Router } from "express";
import { createTask, deleteTask, getTask, getTasks, patchTask, updateTask } from "../controllers/taskController.js";

const router = Router();

router.get("/", getTasks);
router.get("/:id", getTask);
router.post("/", createTask);
router.put("/:id", updateTask);
router.patch("/:id", patchTask);
router.delete("/:id", deleteTask);

export default router;