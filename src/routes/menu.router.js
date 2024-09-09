import express from "express";
import {
  getAllMenu,
  insertMenu,
  getAllMenuByVendorId,
  getMenuInfoById,
  updateMenuById,
} from "../controller/menu.controller.js";
import requireVendor from "../middleware/require-vendor.js";
import authJWT from "../middleware/auth-jwt.js";
const router = express.Router();

router.route("/").post(authJWT, requireVendor, insertMenu);
router.route("/").get(getAllMenu);
router.route("/:menu_id").get(getMenuInfoById);
router.route("/:menu_id").put(authJWT, requireVendor,updateMenuById);
router.route("/vendor/:vendor_id").get(authJWT, requireVendor,getAllMenuByVendorId);

export default router;
