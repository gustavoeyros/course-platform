import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
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
      res.status(200).json({ message: "Logado com sucesso!", token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ messag: "Erro no servidor!" });
    }
  }
}
