import { Router, Request, Response } from "express";
import { createUser, loginUser } from "../Controller/userController";
import { isUserExist, isUserRegistered } from "../Middleware/checkUser";
const router = Router();

/* GET users listing. */
router.get("/", function (req: Request, res: Response) {
  res.send("respond with a resource");
});

router.post("/auth/signup", isUserExist, createUser);
router.post("/auth/login", isUserRegistered, loginUser);

export default router;
