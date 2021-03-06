import { Request, Response } from "express";
import dotenv from "dotenv";
import client from "../db";
import { propertyQuery } from "../schema/tables";
import cloudinary from "../utils/cloudinaryFile";

interface Property {
  owner: number;
  status: string;
  type: string;
  state: string;
  city: string;
  address: string;
  price: number;
  created_on: Date;
  image_url: string;
}

/**
 * POST Create a new Property
 */

export const createProperty = async (req: Request, res: Response) => {
  const property: Property = req.body;
  const user = req.user;
  await client.query(propertyQuery);
  if (!property.image_url) {
    property.image_url =
      "https://img.favpng.com/3/25/18/avatar-free-of-house-png-favpng-ktNPu2Ui49qDCvv1pVnBpQnmb.jpg";
  }
  try {
    const result = await cloudinary.uploader.upload(req.file?.path);
    const savedProperty = await client.query(
      "INSERT INTO properties (owner, type, state, city, address, price, image_url) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [
        `${user.id}`,
        `${property.type}`,
        `${property.state}`,
        `${property.city}`,
        `${property.address}`,
        `${property.price}`,
        `${result.secure_url}`,
      ]
    );

    const output = {
      status: "successful",
      data: savedProperty.rows[0],
    };
    res.status(201).send(output);
  } catch (error) {
    res.status(500).send(error);
  }
};

/**
 * PATCH Update a property
 */
export const updateProperty = async (req: Request, res: Response) => {
  const property: any = req.body;
  const ID = req.params.id;
  const user = req.user;
  const keys = Object.keys(property);
  const owner = user.id;
  let id = ID;
  let values = "";
  let array = [];
  //const result = await cloudinary.uploader.upload(req.file?.path);
  for (let i = 0; i < keys.length; i++) {
    if (i !== keys.length - 1) {
      values += keys[i] + " = " + "$" + [i + 1] + ", ";
      array.push(property[keys[i]]);
    } else {
      values += keys[i] + " = " + "$" + [i + 1];
      array.push(property[keys[i]]);
    }
  }
  //console.log("epty array", array);
  const statement = `UPDATE properties SET  ${values} WHERE id = $${
    keys.length + 1
  } AND owner = $${keys.length + 2} RETURNING *;`;
  //console.log("sql statement", statement);
  const array2 = [...array, id, owner];
  //console.log("new array", array2);
  try {
    const newProperty = await client.query(`${statement}`, array2);
    const result = {
      status: "successful",
      data: newProperty.rows[0],
    };
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};
export const soldProperty = async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = req.user;
  const owner = user.id;
  const statement = `UPDATE properties SET status = $1 WHERE id = $2 AND owner = $3 RETURNING *`;
  try {
    const updatedProperty = await client.query(`${statement}`, [
      "sold",
      id,
      owner,
    ]);

    const output = {
      status: "successful",
      data: updatedProperty.rows[0],
    };
    res.status(201).send(output);
    console.log("sold property");
  } catch (error) {
    res.status(500).send(error);
  }
};

export const removeProperty = async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = req.user;
  const owner = user.id;
  const statement = `DELETE FROM properties WHERE id = $1 AND owner = $2`;
  try {
    await client.query(`${statement}`, [id, owner]);
    const message = {
      status: "successful",
      data: {
        message: `Property with id ${id} deleted`,
      },
    };
    res.status(200).send(message);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getAllProperty = async (req: Request, res: Response) => {
  const statement = `SELECT * FROM properties`;
  try {
    const properies = await client.query(`${statement}`);
    const result = {
      status: "succesful",
      data: properies.rows,
    };
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};
export const getParticularProperty = async (req: Request, res: Response) => {
  const type = req.query.type;
  const statement = `SELECT * FROM properties WHERE type = $1`;
  try {
    const particularProperty = await client.query(statement, [type]);
    const result = {
      status: "succesful",
      data: particularProperty.rows,
    };
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getSpecificProperty = async (req: Request, res: Response) => {
  const id = req.params.id;
  const statement = `SELECT * FROM properties WHERE id =$1`;
  try {
    const specificProperty = await client.query(statement, [id]);
    const result = {
      status: "succesfull",
      data: specificProperty.rows,
    };
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};
// `UPDATE properties SET city = $1, price = $2 WHERE id = $3;`
