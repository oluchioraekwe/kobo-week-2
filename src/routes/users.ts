import { Router, Request, Response } from "express";
import { createUser, loginUser } from "../Controller/userController";
const router = Router();

/* GET users listing. */
router.get("/", function (req: Request, res: Response) {
  res.send("respond with a resource");
});

router.post("/auth/signup", createUser);
router.post("/auth/login", loginUser);

export default router;
