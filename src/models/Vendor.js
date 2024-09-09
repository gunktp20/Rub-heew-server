import { DataTypes } from "sequelize";
import sequelize from "../db/connection.js";
import Menu from "./Menu.js";

const Vendor = sequelize.define("vendors", {
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
  vendor_name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone_number: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  open: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
});

Vendor.hasMany(Menu, {
  foreignKey: "vendor_id",
  sourceKey: "id",
});

Menu.belongsTo(Vendor, {
  foreignKey: "vendor_id",
});

Vendor.sync({ force: false })
  .then(async () => {
    console.log("Vendor table was created !");
  })
  .catch((err) => {
    console.log(err);
  });

export default Vendor;
