const requireVendor = (req, res, next) => {
    console.log(req.user)
//   if (req.user !== "vendor") {
//     return res.status(401).json({ msg: "คุณไม่ใช่บัญชีร้านค้า" });
//   }
  next();
};

export default requireVendor