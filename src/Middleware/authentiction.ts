import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const secreteKey = process.env.SECRET_KEY as string;

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, secreteKey, (err: any, user: any) => {
      if (err) {
        return res.sendStatus(401);
      }
      req.user = user;
      next();
    });
  } else {
   return res.status(401).send("Not Authenticated");
  }
};

export const authorizedUser = (req: Request, res: Response,next: NextFunction
) =>{
  if(req.user.isAdmin){
    next()
  }else{
    return res.status(403).send("Not Authorized")
  }
}
