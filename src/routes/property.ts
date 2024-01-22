import { Router } from "express";
import {
  createProperty,
  getProperty,
  updateProperty,
  removeProperty,
  getAllProperty,
  flagProperty,
} from "../Controller/propertyController";
import { authenticateJWT, authorizedUser } from "../Middleware/authentiction";
const upload = require("../utils/multerUpload");
const router = Router();


router.get("/",[authenticateJWT,authorizedUser] ,getAllProperty);
router.get("/:id",authenticateJWT ,getProperty);
router.post("/", authenticateJWT, upload.single("image_url"), createProperty);
router.post("/flag/:id",[authenticateJWT,authorizedUser],flagProperty)
router.patch("/update/:id", authenticateJWT, updateProperty);
router.delete("/delete/:id", authenticateJWT, removeProperty);

export default router;
