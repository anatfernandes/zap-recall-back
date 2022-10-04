import express from "express";
import { SignUp, SignIn } from "../controllers/auth.controller.js";
import { hasUser } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/sign-up", hasUser, SignUp);
router.post("/sign-in", hasUser, SignIn);

export default router;
