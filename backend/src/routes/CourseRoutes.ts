import { Router } from "express";
import CourseController from "../controllers/CourseController";
import checkToken from "../helpers/checkToken";

const router = Router();

router.post("/upload", checkToken, CourseController.upload);

export default router;
