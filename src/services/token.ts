import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secreteKey = process.env.SECRET_KEY as string;
export const generateToken = (email: string, id: number): string => {
  const token = jwt.sign({ email, id }, secreteKey, { expiresIn: "100m" });
  return token;
};
