import express from "express";
import { SignUp, SignIn } from "../controllers/auth.controller.js";
import { hasUser } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(hasUser);

router.post('/sign-up', SignUp);
router.post('/sign-in', SignIn);

export default router;