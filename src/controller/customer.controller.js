import Customer from "../models/Customer.js";
import jwt from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config()

const register = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ msg: "กรุณากรอกข้อมูลให้ครบถ้วน" });
  }

  const usernameTaken = await Customer.findOne({ where: { username } });
  const emailTaken = await Customer.findOne({ where: { email } });

  if (usernameTaken) {
    return res.status(400).json({ msg: "Username ของคุณถูกนำไปใช้งานแล้ว" });
  }
  if (emailTaken) {
    return res.status(400).json({ msg: "E-mail ของคุณถูกนำไปใช้งานแล้ว" });
  }

  try {
    const newCustomer = await Customer.create({ username, email, password });
    console.log(newCustomer);
    return res.status(200).json({ msg: "สมัครสมาชิกเสร็จสิ้น" });
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

  const user = await Customer.findOne({ where: { username, password } });

  if (!user) {
    return res.status(401).json({ msg: "ชื่อผู้ใช้ หรือ รหัสผ่าน ไม่ถูกต้อง" });
  }

  const token = await jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
      role: "customer",
    },
    process.env.JWT_SECRET_ACCESS,
    {
      expiresIn: "1d",
    }
  );

  res.status(200).json({ user, token });
};

export { register, login };
