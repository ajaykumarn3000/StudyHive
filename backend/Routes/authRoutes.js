import { Router } from "express";

// controllers
import {
  loginController,
  registerController,
} from "../Controllers/authControllers.js";

const router = Router();

router.post("/register", registerController);

router.post("/login", loginController);

export default router;
