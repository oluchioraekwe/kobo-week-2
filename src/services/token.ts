import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { obj } from "./interface";

dotenv.config();

const secreteKey = process.env.SECRET_KEY as string;

// export const generateToken = (value: obj): string => {
//   const token = jwt.sign(value, secreteKey, { expiresIn: "100m" });
//   return token;
// };
export const generateToken = (email: string, id: number): string => {
  const token = jwt.sign({ email, id }, secreteKey, { expiresIn: "100m" });
  return token;
};
