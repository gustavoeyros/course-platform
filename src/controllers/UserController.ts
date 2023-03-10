import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";

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
    const passHash = await bcrypt.hash(password, salt);

    //registro do usuário
    const user = new User({
      name,
      email,
      password,
    });
    try {
      await user.save();
      res.status(201).json({ message: "Usuário criado com sucesso!" });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
}
