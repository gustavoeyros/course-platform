import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const checkToken = (req: Request, res: Response, next: NextFunction) => {
  const authorizationHeader = req.headers["authorization"];
  const token = authorizationHeader && authorizationHeader.split(" ")[1];

  if (!token)
    return res.status(401).json({ message: "Você não possui autorização!" });

  try {
    const secret = process.env.SECRET;
    jwt.verify(token, secret ? secret : "");
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Token inválido!" });
  }
};

export default checkToken;
