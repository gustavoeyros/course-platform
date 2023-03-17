import { Router } from "express";
import UserController from "../controllers/UserController";
import checkToken from "../helpers/checkToken";

const router = Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.patch("/enroll/:userId/:courseId", UserController.enroll);
router.get("/mycourses/:id", checkToken, UserController.courses);

export default router;
