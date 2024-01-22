import { Router, Request, Response } from "express";
import { findOneUser, findUsers, loginUser, registerUser } from "../Controller/userController";
const router = Router();

/* GET users listing. */
// router.get("/", function (req: Request, res: Response) {
//   res.send("respond with a resource");
// });

router.post("/register",registerUser)
router.get("/",findUsers)
router.get("/:id",findOneUser)
router.post("/login", loginUser);

export default router;
