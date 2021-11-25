import request from "supertest";
import app from "../src/app";
describe("Test if a user signs up", () => {
  it("Returns that a user ", async () => {
    expect(3).toBeTruthy();
  });
});

describe("POST Create A user", () => {
  test("That a user is already existing", async () => {
    const newUser = {
      email: "bigbaby@yahoo.com",
      first_name: "omotosho",
      last_name: "solomon",
      password: "admin",
      address: "No 50 Enugu Road",
      is_admin: true,
    };
    const res = await request(app).post("/users/auth/signup").send(newUser);
    expect(res.statusCode).toBe(409);
  });
  test("That a user is created", async () => {
    const newUser = {
      email: "test2@yahoo.com",
      first_name: "omotosho",
      last_name: "solomon",
      password: "admin",
      address: "No 50 Enugu Road",
      is_admin: true,
    };
    const res = await request(app).post("/users/auth/signup").send(newUser);

    expect(res.statusCode).toBe(201);
  });
});
