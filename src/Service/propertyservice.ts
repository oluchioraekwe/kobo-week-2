import { Flag } from "../models/flag"
import { Property } from "../models/property"

export const saveProperty = async (body:any)=>{
    return await Property.create(body)
}

export const getProperties = async()=>{
    return await Property.findAll()
}

export const getPropertyById = async(id:number,ownerid:number)=>{
    return await Property.findOne({where:{id,ownerid}, include:Flag})
}

export const deleteProperty = async(id:number,ownerid:number)=>{
    const property = await getPropertyById(id,ownerid)
    await property?.destroy()
}

export const update = async(id:number,ownerid:number, body:any)=>{
    return await Property.update(body,{
        where:{id,ownerid},
        returning: true,
    })
}

