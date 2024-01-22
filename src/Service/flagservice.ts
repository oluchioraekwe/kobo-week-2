import { Flag } from "../models/flag"

export const createFlag = async(body:any)=>{
    return await Flag.create(body)
}