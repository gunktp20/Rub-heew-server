import Category from "../models/Category.js";
import Menu from "../models/Menu.js";
import Vendor from "../models/Vendor.js";
import dotenv from "dotenv";
dotenv.config();

const insertMenu = async (req, res) => {
  const { menu_name, category_id, price } = req.body;

  if (!menu_name || !category_id || !req.user.id || !price) {
    return res.status(400).json({ msg: "กรุณากรอกข้อมูลให้ครบถ้วน" });
  }

  const category = await Category.findOne({ where: { id: category_id } });

  if (!category) {
    return res.status(404).json({ msg: "ไม่พบประเภทอาหารที่คุณเลือก" });
  }

  const vendor = await Vendor.findOne({ where: { id: req.user.id } });

  if (!vendor) {
    return res.status(404).json({ msg: "ไม่พบร้านค้าของคุณ" });
  }

  const isMenuTaken = await Menu.findOne({ where: { menu_name } });
  if (isMenuTaken) {
    return res
      .status(400)
      .json({ msg: "ชื่อเมนูของคุณ มีอยู่ในร้านของคุณแล้ว" });
  }
  await Menu.create({ menu_name, category_id, vendor_id: req.user.id, price });

  res.status(200).json({ msg: "เพิ่มเมนูของคุณเสร็จสิ้น" });
};

const getAllMenu = async (req, res) => {
  const menus = await Menu.findAll({
    include: [
      {
        model: Vendor,
        attributes: ["vendor_name","phone_number","open"],
      },
      {
        model: Category,
        attributes: ["category_name"],
      },
    ],
  });

  res.status(200).json({ menus });
};

const getMenuInfoById = async (req, res) => {
  const menu = await Menu.findOne({
    where:{ id: req.params.menu_id},
    include: [
      {
        model: Vendor,
        attributes: ["vendor_name","phone_number","open"],
      },
      {
        model: Category,
        attributes: ["category_name"],
      },
    ],
  });

  res.status(200).json(menu);
};

const getAllMenuByVendorId = async (req, res) => {
  const menus = await Menu.findAll({
    where:{
      vendor_id: req.user.id
    },
    include: [
      {
        model: Vendor,
        attributes: ["vendor_name","phone_number","open"],
      },
      {
        model: Category,
        attributes: ["category_name"],
      },
    ],
  });

  res.status(200).json({ menus });
};

const updateMenuById = async (req, res) => {

  const { menu_name, category_id, price } = req.body;

  if (!menu_name || !category_id || !req.user.id || !price) {
    return res.status(400).json({ msg: "กรุณากรอกข้อมูลให้ครบถ้วน" });
  }

  const category = await Category.findOne({ where: { id: category_id } });

  if (!category) {
    return res.status(404).json({ msg: "ไม่พบประเภทอาหารที่คุณเลือก" });
  }

  const isYourVendor = await Menu.findOne({
    where: { id: req.params.menu_id, vendor_id: req.user?.id },
  });

  if (!isYourVendor) {
    return res.status(400).json({msg:"ไม่ใช่ เมนู ในร้านของคุณ"})
  }

  await Menu.update(
    {
      menu_name,
      category_id,
      price,
    },
    { where: { id: req.params.menu_id } }
  );
  res.status(200).json({ msg: "แก้ไขรายละเอียดเมนูของคุณ เรียบร้อยแล้ว" });
};

export { insertMenu, getAllMenu , getAllMenuByVendorId , getMenuInfoById , updateMenuById};
