import { Router } from "express";
import {
  createProperty,
  updateProperty,
  soldProperty,
  removeProperty,
  getAllProperty,
  getParticularProperty,
  getSpecificProperty,
} from "../Controller/propertyController";
import { authenticateJWT } from "../Middleware/authentiction";
const upload = require("../utils/multerUpload");
const router = Router();

/* GET home page. */
// router.get("/", function (req: Request, res: Response) {
//   res.render("index", { title: "Express" });
// });
router.get("/", getAllProperty);
router.get("/specific", getParticularProperty);
router.get("/:id", getSpecificProperty);
router.post("/", authenticateJWT, upload.single("image_url"), createProperty);
router.patch("/update/:id", authenticateJWT, updateProperty);
router.patch("/sold/:id", authenticateJWT, soldProperty);
router.delete("/delete/:id", authenticateJWT, removeProperty);

export default router;
