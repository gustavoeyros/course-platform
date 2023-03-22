import { Router } from "express";
import UserController from "../controllers/UserController";
import checkToken from "../helpers/checkToken";

const router = Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.patch("/enroll/:userId/:courseId", UserController.enroll);
router.patch("/unenroll/:userId/:courseId", UserController.unenroll);
router.get("/mycourses/:id", checkToken, UserController.courses);
router.patch(
  "/mycourses/finishCourse/:userId/:courseId",
  checkToken,
  UserController.finishCourse
);
router.get(
  "/finishedcourses/:userId",
  checkToken,
  UserController.getFinishedCourses
);

export default router;
