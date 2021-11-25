export const userQuery = `
  CREATE TABLE IF NOT EXISTS users (
      id serial primary key,
      email varchar,
      first_name varchar,
      last_name varchar,
      password varchar,
      address varchar,
      is_admin boolean default true
  );
  `;

export const propertyQuery = `
  CREATE TABLE IF NOT EXISTS properties(
      id serial primary key,
      owner numeric,
      status ENUM ('sold', 'available') DEFAULT 'available',
      price float,
      state varchar,
      city varchar,
      address varchar,
      type varchar,
      created_on timestamp default current_timestamp,
      image_url varchar(255),
      cloudinary_id varchar,
      foreign key (owner) references users(id));
  `;
export const flagQuery = `
  CREATE TABLE IF NOT EXISTS flags (
    id serial primary key,
    property_id foreign key refrences properties(id),
    created_on Date.now(),
    reason varchar,
    description varchar  
  );
  `;
