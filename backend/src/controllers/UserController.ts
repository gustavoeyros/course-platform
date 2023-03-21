import { Request, Response } from "express";
import User from "../models/User";
import Course from "../models/Course";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import mongoose, { isValidObjectId } from "mongoose";
config();

export default class UserController {
  static async register(req: Request, res: Response) {
    const { name, email, password, confirmpassword } = req.body;
    const requiredFields = ["name", "email", "password"];
    //verificar se os campos foram preenchidos
    requiredFields.some((field) => {
      if (!req.body[field]) {
        return res
          .status(422)
          .json({ message: `O campo ${field} é obrigatório` });
      }
    });

    if (password !== confirmpassword) {
      return res.status(422).json({ message: "As senhas não conferem!" });
    }

    //verificar se já existe uma acc
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ message: "O usuário já existe!" });
    }

    //criação da senha criptografada
    const salt = await bcrypt.genSalt(12);
    const passHash = password ? await bcrypt.hash(password, salt) : "";

    //registro do usuário
    const user = new User({
      name,
      email,
      password: passHash,
    });
    try {
      await user.save();
      res.status(201).json({ message: "Usuário criado com sucesso!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ messag: "Erro no servidor!" });
    }
  }
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!email) {
      return res.status(422).json({ message: `O campo email é obrigatório` });
    }
    if (!password) {
      return res.status(422).json({ message: `O campo senha é obrigatório` });
    }

    //verificar se o usuário existe
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    //verificar se a senha bate com a do bd
    const checkPass = await bcrypt.compare(password, user.password);
    if (!checkPass) {
      return res.status(422).json({ message: "Usuário ou senha incorretos" });
    }

    try {
      const secret = process.env.SECRET;
      const token = jwt.sign(
        {
          id: user._id,
        },
        secret ? secret : ""
      );
      const data = {
        token,
        id: user.id,
      };
      res.status(200).json({ message: "Logado com sucesso!", data });
    } catch (error) {
      console.log(error);
      res.status(500).json({ messag: "Erro no servidor!" });
    }
  }

  static async enroll(req: Request, res: Response) {
    const { userId, courseId } = req.params;
    const user = await User.findById(userId);
    const course = await Course.findById(courseId);
    if (!course) {
      res.status(422).json({ message: "Curso não encontrado" });
    }
    if (!user) {
      res.status(422).json({ message: "Usuário não encontrado" });
    }
    try {
      await User.findOneAndUpdate(
        { _id: user?.id },
        { $push: { enrolledCourses: course } }
      );
      await Course.findOneAndUpdate(
        {
          _id: course?.id,
        },
        { $push: { students: user?.id } }
      );
      res.status(200).json({ message: "Matriculado com sucesso!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro no servidor!" });
    }
  }
  static async courses(req: Request, res: Response) {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      res.status(422).json({ message: "Usuário não encontrado" });
    }
    try {
      res.status(200).json({ user });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro no servidor!" });
    }
  }
  static async unenroll(req: Request, res: Response) {
    const { userId, courseId } = req.params;
    const user = await User.findById(userId);
    const course = await Course.findById(courseId);
    if (!course) {
      res.status(422).json({ message: "Curso não encontrado" });
    }
    if (!user) {
      res.status(422).json({ message: "Usuário não encontrado" });
    }

    const formatedID = new mongoose.Types.ObjectId(courseId);

    try {
      await User.findOneAndUpdate(
        { _id: user?.id },
        { $pull: { enrolledCourses: { _id: formatedID } } }
      );

      await Course.findOneAndUpdate(
        {
          _id: course?.id,
        },
        { $pull: { students: user?.id } }
      );

      res.status(200).json({ message: "Desmatriculado com sucesso!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro no servidor!" });
    }
  }

  static async finishCourse(req: Request, res: Response) {
    const { userId, courseId } = req.params;
    const user = await User.findById(userId);
    const course = await Course.findById(courseId);
    if (!course) {
      res.status(422).json({ message: "Curso não encontrado" });
    }
    if (!user) {
      res.status(422).json({ message: "Usuário não encontrado" });
    }

    const formatedID = new mongoose.Types.ObjectId(courseId);

    try {
      await User.findOneAndUpdate(
        { _id: user?.id },
        { $push: { finishedCourses: { _id: formatedID } } }
      );

      res.status(200).json({ message: "Curso finalizado com sucesso!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro no servidor!" });
    }
  }
}
