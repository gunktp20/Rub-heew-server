import { DataTypes } from "sequelize";
import sequelize from "../db/connection.js";
import Vendor from "./Vendor.js";
import Category from "./Category.js";

const Menu = sequelize.define("menus", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  menu_name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  category_id: {
    type: DataTypes.STRING,
    references: {
      model: Category,
      key: "id",
    },
  },
  vendor_id: {
    type: DataTypes.UUID,
    references: {
      model: 'vendors',
      key: "id",
    },
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
});

Category.hasOne(Menu, {
  foreignKey: "category_id",
  sourceKey: "id",
});

Menu.belongsTo(Category, {
  foreignKey: "category_id",
});


Menu.sync({ force: false })
  .then(async () => {
    console.log("Menu table was created !");
  })
  .catch((err) => {
    console.log(err);
  });

export default Menu;
