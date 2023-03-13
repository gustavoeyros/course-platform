import { Request, Response } from "express";

export default class CourseController {
  static async upload(req: Request, res: Response) {
    res.json({ message: "Upload!" });
  }
}
