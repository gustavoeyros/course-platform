import { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import { config } from "dotenv";
import Course from "../models/Course";
config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export default class CourseController {
  static async upload(req: Request, res: Response) {
    const { image_url, video_url, description } = req.body;
    if (!image_url) {
      res.status(422).json({ message: "O campo de imagem é obrigatório" });
    }
    if (!video_url) {
      res.status(422).json({ message: "O campo de vídeo é obrigatório" });
    }
    if (!description) {
      res.status(422).json({ message: "O campo de descrição é obrigatório" });
    }

    const course = new Course({
      image_url,
      video_url,
      description,
    });
    try {
      await course.save();
      res.status(201).json({ message: "Vídeo cadastrado com sucesso!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ messag: "Erro no servidor!" });
    }
  }

  static async allCourses(req: Request, res: Response) {
    const courses = await Course.find();
    res.status(200).json({ message: courses });
  }

  static async getCourseById(req: Request, res: Response) {
    const { id } = req.params;
    const course = await Course.findById(id);
    if (!course) {
      res.status(422).json({ message: "Curso não encontrado" });
    }
    try {
      res.status(200).json({ course });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro no servidor!" });
    }
  }
}
