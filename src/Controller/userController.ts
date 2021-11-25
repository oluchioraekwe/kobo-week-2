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
): Promise<unknown> => {
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
): Promise<Response | void | string> => {
  const savedUser = req.user.rows[0];
  try {
    const token = generateToken({
      email: savedUser.email,
      id: savedUser.id,
    });
    const data = { token: token, ...savedUser };
    const result = { status: "success", data: data };
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send(error);
  }
};
