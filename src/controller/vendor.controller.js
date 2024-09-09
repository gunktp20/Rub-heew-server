import Vendor from "../models/Vendor.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken"
dotenv.config();

const createVendor = async (req, res) => {
  const { vendor_name, phone_number } = req.body;

  if (!vendor_name || !phone_number) {
    return res.status(400).json({ msg: "กรุณากรอกข้อมูลให้ครบถ้วน" });
  }

  const vendor = await Vendor.findOne({ where: { vendor_name } });

  if (vendor) {
    return res.status(400).json({ msg: "ชื่อร้านของคุณถูกนำไปใช้แล้ว" });
  }

  const newVendor = await Vendor.create({ vendor_name, phone_number });

  res.status(200).json({
    msg: `ร้าน ${newVendor.vendor_name} ของคุณถูกเพิ่มลงในระบบ สำเร็จ`,
  });
};

const deleteVendor = async (req, res) => {
  const { vendor_id } = req.params;

  const vendor = await Vendor.findOne({
    where: { id: vendor_id },
  });

  if (!vendor) {
    return res.status(400).json({ msg: "ไม่พบร้านค้าของคุณ" });
  }
  await Vendor.destroy({
    where: { id: vendor_id },
  });
  res
    .status(StatusCodes.OK)
    .json({ msg: "ร้านค้าของคุณถูกลบเป็นที่เรียบร้อย" });
};

const register = async (req, res) => {
  const { username, vendor_name, phone_number, password } = req.body;
  if (!username || !vendor_name || !password || !phone_number) {
    return res.status(400).json({ msg: "กรุณากรอกข้อมูลให้ครบถ้วน" });
  }

  const usernameTaken = await Vendor.findOne({ where: { username } });
  const vendorNameTaken = await Vendor.findOne({ where: { vendor_name } });

  if (usernameTaken) {
    return res
      .status(400)
      .json({ msg: "Username สำหรับร้านค้าของคุณถูกนำไปใช้งานแล้ว" });
  }
  if (vendorNameTaken) {
    return res.status(400).json({ msg: "ชื่อร้านค้า ของคุณถูกนำไปใช้งานแล้ว" });
  }

  try {
    const newVendor = await Vendor.create({
      username,
      vendor_name,
      password,
      phone_number,
    });
    return res.status(200).json({ msg: "สมัครบัญชีสำหรับร้านค้าเสร็จสิ้น" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "บางอย่างผิดพลาด โปรดลองใหม่อีกครั้ง" });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ msg: "กรุณากรอกข้อมูลให้ครบถ้วน" });
  }

  const vendor = await Vendor.findOne({ where: { username, password } });

  if (!vendor) {
    return res.status(401).json({ msg: "ชื่อผู้ใช้ หรือ รหัสผ่าน ไม่ถูกต้อง" });
  }

  const token = await jwt.sign(
    {
      id: vendor.id,
      username:vendor.username,
      role: "vendor",
    },
    process.env.JWT_SECRET_ACCESS,
    {
      expiresIn: "1d",
    }
  );

  res.status(200).json({ vendor, token });
};

export { createVendor, deleteVendor, register, login };
