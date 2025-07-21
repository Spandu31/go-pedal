//(dbms-backend/routes/userRoutes.js)

import { Router } from "express";
const router = Router();
import { registerUser, loginUser, getAllUsers } from "../controllers/userController.js";

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", getAllUsers);

export default router;