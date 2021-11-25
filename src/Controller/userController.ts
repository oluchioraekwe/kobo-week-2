import { Request, Response } from "express";
import bcrypt from "bcrypt";
import client from "../db";
import { insertValue } from "../services/querries";
import { generateToken } from "../services/token";

/**
 * POST to create new user
 */
export const createUser = async (
  req: Request,
  res: Response
): Promise<Response | JSON> => {
  const user = req.body;
  const hashedPasedword = await bcrypt.hash(user.password, 10);
  try {
    const insertStatement = insertValue(user, "users");
    const newUser = await client.query(insertStatement, [
      `${user.email}`,
      `${user.first_name}`,
      `${user.last_name}`,
      `${hashedPasedword}`,
      `${user.address}`,
      `${user.is_admin}`,
    ]);
    return res.status(201).send(newUser.rows[0]);
  } catch (error) {
    return res.status(500).send(error);
  }
};

/**
 * POST to login a user
 */
export const loginUser = async (
  req: Request,
  res: Response
): Promise<Response | JSON> => {
  const savedUser = req.user.rows[0];
  const { email, id } = savedUser;
  try {
    const token = generateToken(email, id);
    const result = { status: "success", data: { token: token, ...savedUser } };
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send(error);
  }
};
