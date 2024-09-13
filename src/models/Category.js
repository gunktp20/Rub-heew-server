import { DataTypes } from "sequelize";
import sequelize from "../db/connection.js";

const Category = sequelize.define("categories", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  category_name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
},{
  timestamps:false
});

Category.sync({ force: false })
  .then(async () => {
    console.log("Category table was created !");
  })
  .catch((err) => {
    console.log(err);
  });

export default Category;
