import express from "express";
import cors from "cors"
const app = express()

// ออเดอร์ทั้งหมดที่ rider ถูกมอบหมาย
const orders = [
    { id: "10011", destination: "หอพัก The muse A", price: 185 , phone_number: "081-234-5678"},
    { id: "10012", destination: "หอ นกฮูก 8", price: 151 , phone_number:"086-987-6543"},
    { id: "10013", destination: "D-Condo", price: 310 ,phone_number:"089-555-1234"},
    { id: "10014", destination: "VS", price: 85 , phone_number:"080-456-7890"},
    { id: "10015", destination: "บ้านอยู่สบาย", price: 98 , phone_number:"084-321-0987"},
    { id: "10016", destination: "ม เกษตร", price: 310 , phone_number:"085-123-4567"},
]

app.use(cors())

app.get("/orders", (req, res) => {
    console.log("orders")
    res.status(200).json(orders)
})

app.get("/orders/:id", async (req, res) => {
    const order = await orders.find((order)=> order.id == req.params.id)
    res.status(200).json(order)
})

app.listen(3000, () => {
    console.log("server is running on port : " + 3000)
})