import { Property } from "../models/property"
import { User } from "../models/user"

export const getAllUsers = async ()=>{
     return await User.findAll()
}

export const getUserById = async (id:number)=>{
    return await User.findByPk(id,{include:Property})
}

export const getUserByEmail = async(email:string):Promise<User|null>=>{
    return await User.findOne({where:{email}})
}

export const createUser = async (user:any)=>{
    return await User.create(user)
}

export const removeuser = async(id:number)=>{
    const user = await getUserById(id)
    user?.destroy()
}

