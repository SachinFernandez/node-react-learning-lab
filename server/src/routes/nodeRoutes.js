import { Router } from "express";
import { getNodeInfo } from "../controllers/nodeController.js";

const router = Router();

router.get("/info", getNodeInfo);

export default router;