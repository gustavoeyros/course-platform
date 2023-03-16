import { Router } from "express";
import CourseController from "../controllers/CourseController";
import checkToken from "../helpers/checkToken";

const router = Router();

router.post("/upload", checkToken, CourseController.upload);
router.get("/all", checkToken, CourseController.allCourses);

export default router;
