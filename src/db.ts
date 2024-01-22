import { Sequelize } from 'sequelize-typescript';
import dotenv from "dotenv"
import { User } from './models/user';
import { Property } from './models/property';
import { Flag } from './models/flag';
dotenv.config()

const database = process.env.DATABASE as string
const username = process.env.DATABASE_USERNAME as string
const password = process.env.DB_PASSWORD as string
const host = process.env.HOST as string
//const dialect = process.env.DIALECT as Dialect
const port = process.env.DB_PORT as unknown as number



const sequelize = new Sequelize({
  database: database,
  dialect: 'mysql',
  username: username,
  password: password,
  port: +port,
  logging:false,
  host:host,
  models: [User,Property,Flag], // or [Player, Team],
});

async function dbConnect(){

  try {
    await sequelize.sync({alter:true})
    console.log('Connection has been established successfully.');
  } catch (error:any) {
    console.error('Unable to connect to the database:', error.message);
  }
}

export default dbConnect