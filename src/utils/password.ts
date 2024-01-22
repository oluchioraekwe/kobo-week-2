import * as bcrypt from "bcrypt";

const saltRounds = 10
export const hashPassword = async (password:string):Promise<string>=>{
    return await bcrypt.hash(password,saltRounds)
}

export const comparePasswords = async (plain:string, hashed:string):Promise<Boolean>=>{
    return await bcrypt.compare(plain,hashed)
}