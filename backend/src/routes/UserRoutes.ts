import { Router } from "express";

import UserController from "../controllers/UserController";

const router = Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/enroll/:userId/:courseId", UserController.enroll);

export default router;
