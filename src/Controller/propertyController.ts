import { Request, Response } from "express";
import cloudinary from "../utils/cloudinaryFile";
import { deleteProperty, getProperties, getPropertyById, saveProperty, update } from "../Service/propertyservice";
import { createFlag } from "../Service/flagservice";

/**
 * POST Create a new Property
 */

export const createProperty = async (req: Request, res: Response) => {
  const ownerid = req.user.id;
  const payload = req.body
  try {
    const result = await cloudinary.uploader.upload(req.file?.path);
    const imageurl = result.url
    const propertyData = {ownerid,imageurl,...payload}
   const property = await saveProperty(propertyData)
   
    const output = {
      status: "successful",
      data: property,
    };
    return res.status(201).send(output);
  } catch (error) {
    return res.status(500).send(error);
  }
};

/**
 * PATCH Update a property
 */
export const updateProperty = async (req: Request, res: Response) => {
//   const property: any = req.body;
  const id = req.params.id;
  const ownerid = req.user.id;
  try {
    const newProperty = await update(+id,+ownerid,req.body);
    const result = {
      status: "successful",
      data: newProperty,
    };
    return res.status(201).send(result);
  } catch (error:any) {
    return res.status(500).send(error.message);
  }
};

export const removeProperty = async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = req.user;
  const ownerid = user.id;
  try {
    await deleteProperty(+id,+ownerid)
    const message = {
      status: "successful",
      data: {
        message: `Property with id ${id} deleted`,
      },
    };
    return res.status(200).send(message);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const getAllProperty = async (req: Request, res: Response) => {
  
  try {
    const properies = await getProperties()
    const result = {
      status: "succesful",
      data: properies,
    };
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const getProperty = async (req: Request, res: Response) => {
  const id = req.params.id;
 const ownerid = req.user.id
  try {
    const property = await getPropertyById(+id,+ownerid)
    const result = {
      status: "succesfull",
      data: property,
    };
    return res.status(200).send(result);
  } catch (error:any) {
    return res.status(500).send(error.message);
  }
};

export const flagProperty = async (req: Request, res: Response) =>{
    const payload = req.body
    const propertyid = req.params.id
    try {
        const flag = await createFlag({propertyid, ...payload})
        const result = {
            status: "succesfull",
            data: flag,
          };
          return res.status(200).send(result);
    } catch (error:any) {
        return res.status(500).send(error.message);
      }
}
// // `UPDATE properties SET city = $1, price = $2 WHERE id = $3;`
