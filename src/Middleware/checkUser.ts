import { Request, Response, NextFunction } from "express";
import client from "../db";
import { selectUser } from "../services/querries";
import { User } from "../services/interface";
import bcrypt from "bcrypt";

export const isUserExist = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const user: User = req.body;
  const oldUser = selectUser();
  const savedUser = await client.query(oldUser, [user.email]);
  if (savedUser.rows.length > 0) {
    return res.status(409).send("User already exists");
  }
  next();
};

export const isUserRegistered = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const user: User = req.body;
  const oldUser = selectUser();
  const savedUser = await client.query(oldUser, [user.email]);
  if (savedUser.rows.length === 0) {
    return res.status(404).send("invalid username and password");
  }
  const password = await bcrypt.compare(
    user.password,
    savedUser.rows[0].password
  );
  if (!password) {
    return res.status(404).send("invalid username and password");
  }
  req.user = savedUser;
  next();
};
