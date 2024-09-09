import { DataTypes } from "sequelize";
import sequelize from "../db/connection.js";

const Customer = sequelize.define("customers", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone_number:{
    type: DataTypes.STRING,
    allowNull: true,
  },
});

Customer.sync({ force: false })
  .then(async () => {
    console.log("Customer table was created !");
  })
  .catch((err) => {
    console.log(err);
  });


export default Customer;
