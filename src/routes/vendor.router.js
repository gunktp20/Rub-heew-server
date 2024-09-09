import express from "express";
import { deleteVendor, login, register } from "../controller/vendor.controller.js";
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/:vendor_id").delete(deleteVendor);

export default router;
