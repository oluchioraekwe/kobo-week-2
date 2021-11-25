import { obj } from "./interface";

export const insertValue = (obj: obj, tableName: string): string => {
  const keys: string[] = Object.keys(obj);
  let value: string = "";
  let value2: string = "";
  for (let i = 0; i < keys.length; i++) {
    if (i !== keys.length - 1) {
      value += keys[i] + ", ";
      value2 += "$" + [i + 1] + ", ";
    } else {
      value += keys[i];
      value2 += "$" + [i + 1];
    }
  }
  return `INSERT INTO ${tableName} (${value}) VALUES (${value2}) RETURNING *`;
};

export const selectUser = (): string => {
  return `SELECT * FROM users WHERE email = $1`;
};
