import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import client from "../db";
import { userQuery } from "../schema/tables";
dotenv.config();

export interface User {
  email: string;
  first_name?: string;
  last_name?: string;
  password: string;
  address?: string;
  is_admin?: boolean;
}
const secreteKey = process.env.SECRET_KEY as string;
/**
 * POST to create new user
 */
export const createUser = async (req: Request, res: Response) => {
  const user: User = req.body;
  await client.query(userQuery);
  const savedUser = await client.query(`SELECT * FROM users WHERE email = $1`, [
    user.email,
  ]);
  if (savedUser.rows.length > 0) {
    return res.status(409).send("User already exists");
  }
  const hashedPasedword = await bcrypt.hash(user.password, 10);
  try {
    await client.query(
      "INSERT INTO users(email, first_name, last_name, password, address, is_admin) VALUES($1, $2, $3, $4, $5, $6)",
      [
        `${user.email}`,
        `${user.first_name}`,
        `${user.last_name}`,
        `${hashedPasedword}`,
        `${user.address}`,
        `${user.is_admin}`,
      ]
    );
    res.status(201).send("User Created");
  } catch (error) {
    res.status(500).send(error);
  }
};

/**
 * POST to login a user
 */
export const loginUser = async (req: Request, res: Response) => {
  const user: User = req.body;
  try {
    const savedUser = await client.query(
      `SELECT * FROM users WHERE email = $1`,
      [user.email]
    );
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
    const token = jwt.sign(
      { email: savedUser.rows[0].email, id: savedUser.rows[0].id },
      secreteKey,
      { expiresIn: "100m" }
    );
    const data = { token: token, ...savedUser.rows[0] };
    const result = { status: "success", data: data };
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};
