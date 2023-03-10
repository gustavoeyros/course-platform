import { Request, Response } from "express";
import User from "../models/User";

export default class UserController {
  static async register(req: Request, res: Response) {
    const { name, email, password, confirmpassword } = req.body;
    if (!name) {
      return res.status(422).json({ message: "O nome é obrigatório!" });
    }
    if (!email) {
      return res.status(422).json({ message: "O Email é obrigatório!" });
    }
    if (!password) {
      return res.status(422).json({ message: "A senha é obrigatória!" });
    }
    if (password !== confirmpassword) {
      return res.status(422).json({ message: "As senhas não batem!" });
    }

    //verificar se já existe uma acc
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ message: "O usuário já existe!" });
    }
  }
}
