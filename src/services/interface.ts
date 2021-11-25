export interface obj {
  [name: string]:
    | string
    | number
    | boolean
    | { [name: string]: string | number | boolean };
}
export interface User {
  email: string;
  first_name?: string;
  last_name?: string;
  password: string;
  address?: string;
  is_admin?: boolean;
}
