import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { createUser, getAllUsers, getUserByEmail, getUserById } from "../Service/userservice";
import { comparePasswords, hashPassword } from "../utils/password";
dotenv.config();

const secreteKey = process.env.SECRET_KEY as string

/**
 * POST Register User
 */
export const registerUser = async(req: Request, res: Response)=>{
    try {
        const payload = req.body
        payload.password = await hashPassword(payload.password)
        const user = await createUser(payload)
        return res.status(201).send(user)
    } catch (error:any) {
        return res.status(500).send({error: error.message})
    }
}

export const findUsers = async(req: Request, res: Response)=>{
    try {
        const users = await getAllUsers()
        if(users.length<1){
            return res.status(404).send({message:"Users not found"})
        }
        return res.status(200).send(users)
    } catch (error:any) {
        return res.status(500).send({error: error.message})
        
    }
}

export const findOneUser = async(req: Request, res: Response)=>{
    try {
        const id = req.params.id
        const users = await getUserById(+id)
        if(!users){
            return res.status(404).send({message:"User not found"})
        }
        return res.status(200).send(users)
    } catch (error:any) {
        return res.status(500).send({error: error.message})
        
    }
}

/**
 * POST Login  user
 */
export const loginUser = async (req: Request, res: Response) => {
    const {password, email} = req.body
    if(!password || !email){
        return res.status(401).send('Incomplete Login Credentials')
    }
  try {
    const savedUser = await getUserByEmail(email)
    if(!savedUser){
        return res.status(401).send('Invalid Login Credentials')
    }

    const checkPassword = await comparePasswords(password,savedUser.password)
    if(!checkPassword){
        return res.status(401).send('Invalid Login Credentials')
    }
     const token = jwt.sign(
      { email: savedUser.email, id: savedUser.id, isAdmin: savedUser.isAdmin },
      secreteKey,
      { expiresIn: "100m" ,algorithm:'HS512'}
    );
    const result = { status: "success", data: {id: savedUser.id, token: token, } };
    return res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};
