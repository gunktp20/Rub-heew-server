import express from "express";
import cors from "cors";
import sequelize from "./db/connection.js";
import dotenv from "dotenv";
import http from "http";
import customerRouter from "./routes/customer.router.js";
import vendorRouter from "./routes/vendor.router.js";
import menuRouter from "./routes/menu.router.js";
dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

const orders = [
  {
    id: "10011",
    destination: "หอพัก The muse A",
    price: 185,
    phone_number: "081-234-5678",
  },
  {
    id: "10012",
    destination: "หอ นกฮูก 8",
    price: 151,
    phone_number: "086-987-6543",
  },
  {
    id: "10013",
    destination: "D-Condo",
    price: 310,
    phone_number: "089-555-1234",
  },
  { id: "10014", destination: "VS", price: 85, phone_number: "080-456-7890" },
  {
    id: "10015",
    destination: "บ้านอยู่สบาย",
    price: 98,
    phone_number: "084-321-0987",
  },
  {
    id: "10016",
    destination: "ม เกษตร",
    price: 310,
    phone_number: "085-123-4567",
  },
];

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/customer", customerRouter);
app.use("/vendor", vendorRouter);
app.use("/menu", menuRouter);

app.get("/orders", (req, res) => {
  res.status(200).json(orders);
});

app.get("/orders/:id", async (req, res) => {
  const order = await orders.find((order) => order.id == req.params.id);
  res.status(200).json(order);
});

const start = async () => {
  try {
    await sequelize.sync({
      // alter: true,
    });
    server.listen(PORT, () => {
      console.log(`server is running on port : ${PORT}`);
    });
  } catch (err) {
    console.log("err", err);
  }
};

start();
