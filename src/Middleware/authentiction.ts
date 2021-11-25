import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const secreteKey = process.env.SECRET_KEY as string;

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, secreteKey, (err: any, user: any): Response | void => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    return res.status(404).send("Not Authenticated");
  }
};
