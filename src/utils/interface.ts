export interface IUser  {
    id: number
    email: string
    firstName: string
    lastName: string
    password: string
    address: string
    isAdmin: boolean
}


`
  CREATE TABLE IF NOT EXISTS users (
      id serial primary key,
      email varchar,
      first_name varchar,
      last_name varchar,
      password varchar,
      address varchar,
      is_admin boolean default true
  );
  `